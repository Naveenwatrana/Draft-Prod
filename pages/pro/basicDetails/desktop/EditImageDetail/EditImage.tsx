import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextComp } from 'components/textComp';
import lang from 'common/lang';
import { useUpdateUserMutation } from 'pages/pro/profileService';
import {
  usePresignedUrlMutation,
} from 'common/utils/s3upload/service';
import { schemaImage } from 'pages/pro/basicDetails/schema';
import { EditImageProps, IAddImageFormValues } from 'pages/pro/basicDetails/type';
import ModalElement from 'components/Modal/Modal';
import ImageInput from 'pages/pro/basicDetails/desktop/EditImageDetail/imageInput';
import { Textarea } from 'components/Description/styles';
import PreviewCard from 'pages/pro/basicDetails/desktop/previewCard';
import { uploadData } from 'pages/pro/basicDetails/common/imageStepApi';
import {
  Counter, CounterError, Form, LeftPanel, PageContainer, RightPanel,
} from './style';
import { ButtonGroup, SkipButton, SubmitButton } from '../EditBasicDetail/styles';

const {
  bio,
  buttonText,
  onBoarding: { mantra },
} = lang;

const EditImage = ({
  firstName,
  lastName,
  picture,
  pictureName,
  setEditImageDetail,
  mantra: defaultMantra,
  userProfileCover,
  editImageDetail,
}: EditImageProps) => {
  const {
    register,
    control,
    watch,
    handleSubmit,
    setValue,
    getValues,
    trigger,
    formState: { errors },
  } = useForm<IAddImageFormValues>({
    resolver: yupResolver(schemaImage),
    mode: 'onBlur',
    defaultValues: {
      mantra: defaultMantra,
    },
  });

  const [editPicture, setEditPicture] = useState(picture);
  const watchMantra = watch('mantra');
  const fieldsEmpty = !editPicture && !watchMantra;
  const imageAdded = errors.image;
  const [updateUser] = useUpdateUserMutation();
  const [presignedUrl] = usePresignedUrlMutation();

  const onSubmit = async (data: IAddImageFormValues) => {
    const payload = {
      ...data,
      ...(userProfileCover ? { path: userProfileCover } : {}),
    };
    await uploadData(
      payload,
      updateUser,
      presignedUrl,
      !!(getValues('image') && getValues('image') !== editPicture),
      editPicture !== picture && !!userProfileCover,
    );
    setEditImageDetail(false);
  };

  const isDisableSave = (defaultMantra === watchMantra && editPicture === picture) || !!(imageAdded || fieldsEmpty);

  return (
    <ModalElement
      isOpen={editImageDetail}
      closeModal={() => setEditImageDetail(false)}
    >
      <PageContainer>
        <LeftPanel>
          <Form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <TextComp component="h2" theme="light">
              {bio.editCard}
            </TextComp>
            <TextComp>{mantra.mantraLabel}</TextComp>
            <Textarea
              id="mantra"
              height={78}
              placeholder={mantra.mantraPlaceholder}
              {...register('mantra')}
              maxLength={60}
              rows={2}
              data-cy="basicDetailEditMantra"
            />
            {!errors.mantra ? (
              <Counter
                total={60}
                count={watchMantra?.length ? watchMantra.length : 0}
              />
            ) : (
              <CounterError
                total={60}
                count={watchMantra?.length ? watchMantra.length : 0}
              />
            )}
            <ImageInput
              control={control}
              error={errors.image}
              imagePreview={setEditPicture}
              setValue={setValue}
              trigger={trigger}
              editPictureName={pictureName}
              labelText={bio.addImage}
            />
            <ButtonGroup>
              <SkipButton
                primary
                variant="link"
                label={buttonText.cancel}
                data-cy="editImageDetailCancel"
                onClick={() => setEditImageDetail(false)}
              />
              <SubmitButton
                primary
                label={buttonText.save}
                type="submit"
                disabled={isDisableSave}
                data-cy="editImageDetailSave"
              />
            </ButtonGroup>
          </Form>
        </LeftPanel>
        <RightPanel>
          <PreviewCard
            fullName={`${firstName} ${lastName}`}
            picture={editPicture}
            mantra={watchMantra}
          />
        </RightPanel>
      </PageContainer>
    </ModalElement>
  );
};
export default EditImage;
