import React, { useState } from 'react';
import ButtonComp from 'components/buttonComp';
import lang from 'common/lang';
import FormToast from 'components/FormToast';
import InputComp from 'components/inputComp';
import { InputType } from 'components/inputComp/types';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ICreateCompanyFormsValues } from 'pages/company/types';
import { LabelText } from 'components/inputComp/styles';
import { v4 as uuidv4 } from 'uuid';
import CancelIcon from 'components/Icons/CrossIcon';
import { ImageTitleWrapper, File, ImageDetails } from 'components/ImageUpload/styles';
import ImageTitle from 'pages/pro/onboarding/common/imageTitle';
import { getImageName } from 'common/utils/image';
import ImageUpload from 'components/ImageUpload/ImageUpload';
import { FILE_SIZE_ONE_MB } from 'common/constants';
import { headcountOptions, initialCompanyValues } from 'pages/jobs/create/const';
import { MyOptionType } from 'components/Select/types';
import SelectInput from 'components/Select/Select';
import MultipleInputTextArea from 'components/MultipleInputTextArea';
import { IOption } from 'components/MultipleInputTextArea/types';
import { showNotification } from 'pages/pro/components/Projects/util';
import { NotificationType } from 'pages/pro/components/Projects/ViewProject/types';
import Loader from 'components/Loader/Loader';
import TextComp from 'components/textComp';
import Description from 'components/Description/Description';
import { useAddCompanyMutation } from 'pages/company/companyService';
import { useNavigate } from 'common/utils/router-fill';
import { useTags } from 'common/hooks/useTags';
import { UploadedImage, UploadedImageContainer } from 'pages/pro/components/Projects/styles';
import { formatCompanyProfile } from 'common/utils/helpers';
import { useAppDispatch } from 'common/hooks/state';
import { addCompanyProfile } from 'pages/account/authSlice';
import { uploadMediaFile } from 'utils/uploadMediaFile';
import { TagsLoaderContainer } from 'components/Atoms/TagsLoaderComponent';
import { orgProfileUrl } from 'common/utils/network/appRouts';
import {
  CardsContainer, Container, FormContainer, InputField,
} from './styles';
import { Buttons } from '../styles';
import { createCompanySchema } from '../schema';

const {
  buttonText: { submit, back },
  company,
  onBoarding: { image },
} = lang;
const {
  basicInformation: { header, body },
} = company;

type CompleteProfileProps = {
  onGoBack: () => void;
  url: string;
};

const CompleteProfile = ({ onGoBack, url }: CompleteProfileProps) => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setError,
    setValue,
    formState: { errors },
  } = useForm<ICreateCompanyFormsValues>({
    resolver: yupResolver(createCompanySchema),
    defaultValues: initialCompanyValues,
  });

  const [addCompany, addCompanyResult] = useAddCompanyMutation();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { setInputValue, options, tagListResult } = useTags();
  const imageValue = watch('logoImage');
  const imageSrc = (imageValue && imageValue.file) ? URL.createObjectURL(imageValue.file) : '';

  const removeBackgroundImage = (imageName: string) => {
    setValue('backgroundImage', null, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue('deleteJobPicture', imageName, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const onDrop = (files: File[]) => {
    if (files[0].size <= FILE_SIZE_ONE_MB) {
      const img = new Image();
      img.src = URL.createObjectURL(files[0]);
      img.onload = () => {
        const width = img.naturalWidth;
        const height = img.naturalHeight;

        URL.revokeObjectURL(img.src);

        if (width === height && width >= 300) {
          setValue(
            'logoImage',
            { file: files[0], id: uuidv4() },
            { shouldValidate: true },
          );
        } else {
          setError('logoImage', {
            message: company.logoError,
          });
        }
      };
    } else {
      setError('logoImage', { message: 'Error' });
    }
  };

  const onSubmit: SubmitHandler<ICreateCompanyFormsValues> = async (data) => {
    try {
      setLoading(true);
      const file = data.logoImage?.file;
      if (file) {
        const profileImagePath = await uploadMediaFile(
          file,
          data.companyName,
        );
        if (profileImagePath) {
          const { data: companyData } = await addCompany({
            name: data.companyName,
            logo: profileImagePath,
            url,
            headcount: data.headcount.value,
            tag_ids: data.industries.map((industry) => industry.value),
            summary: data?.summary,
          }).unwrap();
          dispatch(addCompanyProfile({ company: formatCompanyProfile(companyData) }));
          navigate(orgProfileUrl(companyData?.username));
        }
      }
    } catch (error: any) {
      showNotification(error?.data?.message, NotificationType.ERROR);
    } finally {
      setLoading(false);
    }
  };
  const isDisabled = !!Object.keys(errors).length || !(
    imageValue
    && watch('headcount').value
    && watch('companyName')
    && watch('industries').length
  );
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {(addCompanyResult.isLoading || loading) && <Loader fullScreen /> }
      <Container>
        <FormContainer>
          <FormToast header={header} body={body} />
          <InputComp
            id="companyUrl"
            type={InputType.TEXT}
            value={url}
            disabled
            labelText={company.companyUrl}
            placeholder={company.companyUrlPlaceholder}
            register={() => undefined}
          />
          <InputComp
            id="companyName"
            type={InputType.TEXT}
            labelText={company.name}
            placeholder={company.namePlaceholder}
            value={watch('companyName')}
            register={register}
            error={getValues('companyName') ? errors?.companyName : undefined}
          />
          <InputField>
            <LabelText>{company.logo}</LabelText>
            {watch('backgroundImage') && (
              <ImageTitleWrapper>
                <ImageTitle
                  fileName={getImageName(watch('backgroundImage') as string)}
                  removeImage={() => removeBackgroundImage(
                    getImageName(watch('backgroundImage') as string),
                  )}
                />
              </ImageTitleWrapper>
            )}
            {!watch('backgroundImage')
              && (!imageValue || !!errors.logoImage?.message) && (
              <ImageUpload
                labelText={image.imageInputLabel}
                info={company.logoPlaceholder}
                onDrop={onDrop}
                height="195px"
                error={!!errors.logoImage?.message}
                errorMessage={errors.logoImage?.message}
                data-cy="imageUpload"
              />
            )}
            {!!imageValue?.file
            && (
              <span>
                <File>
                  <UploadedImageContainer>
                    <UploadedImage src={imageSrc} />
                  </UploadedImageContainer>
                  <ImageDetails>
                    <TextComp>{imageValue?.file.name}</TextComp>
                    <ButtonComp
                      onClick={() => setValue('logoImage', null)}
                      label={<CancelIcon size={10} />}
                      variant="link"
                      data-cy="projectRemoveImage"
                    />
                  </ImageDetails>
                </File>
              </span>
            )}
          </InputField>
          <SelectInput
            options={headcountOptions}
            labelText={company.headcount}
            id="headcount"
            placeHolder={company.headcountPlaceholder}
            value={watch('headcount').value}
            data-cy="locationInput"
            onChange={(selected: MyOptionType | null) => selected
              && setValue(
                'headcount',
                { value: selected.value, label: selected.label },
                { shouldValidate: true, shouldDirty: true },
              )}
          />
          <MultipleInputTextArea
            value={watch('industries')}
            onChange={(value: IOption[]) => setValue('industries', value)}
            onInputChange={setInputValue}
            placeholder={company.industriesPlaceholder}
            label={company.industries}
            data-cy="searchTags"
            options={options}
            isLoading={tagListResult.isLoading}
          />
          <TagsLoaderContainer isLoading={tagListResult.isLoading}>
            {tagListResult.isLoading && <Loader fullScreen={false} />}
          </TagsLoaderContainer>
          <TextComp component="h6">{company.summary}</TextComp>
          <Description
            value={watch('summary')}
            setValue={(e) => setValue('summary', e, {
              shouldValidate: true,
              shouldDirty: true,
            })}
            maxCharacters={2000}
            placeholder={company.summaryPlaceholder}
            height={199}
            data-cy="summary"
          />
        </FormContainer>
        <CardsContainer></CardsContainer>
      </Container>
      <Buttons>
        <ButtonComp
          label={back}
          primary
          variant="link"
          onClick={onGoBack}
          data-cy="cancelCreateCompany"
        />
        <ButtonComp
          label={submit}
          disabled={isDisabled}
          primary
          fullWidth
          type="submit"
          data-cy="nextCreateCompany"
        />
      </Buttons>
    </form>
  );
};

export default CompleteProfile;
