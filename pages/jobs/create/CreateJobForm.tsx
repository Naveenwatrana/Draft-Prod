import { yupResolver } from '@hookform/resolvers/yup';
import ButtonComp from 'components/buttonComp';
import ImageUpload from 'components/ImageUpload/ImageUpload';
import InputComp from 'components/inputComp';
import { InputType } from 'components/input/types';
import SelectInput from 'components/Select/Select';
import PlaceholderImage from '/public/images/defaultProfile.png';
import lang from 'common/lang';
import { useForm } from 'react-hook-form';
import SimpleInput from 'components/input/SimpleInput';
import { FILE_SIZE_ONE_MB, ONLY_NUMBERS } from 'common/constants';
import Description from 'components/Description/Description';
import ImageTitle from 'pages/pro/onboarding/common/imageTitle';
import {
  ButtonWrapper, ButtonWrapperPreview, CardContainer, Container, Disclaimer, InputField, LeftPanel, RightPanel,
} from 'pages/jobs/create/styles';
import {
  ICreateJobValues, CreateJobFormProps, ILocationApi, CreateJobSteps,
} from 'pages/jobs/create/types';
import { useLocationQuery } from 'pages/jobs/jobsService';
import { MyOptionType } from 'components/Select/types';
import { characterLimit, jobTypeOptions, locationTypeOptions } from 'pages/jobs/create/lever/constants';
import { v4 as uuidv4 } from 'uuid';
import JobCard from 'components/cards/JobCard/JobCard';
import { SkipButton } from 'pages/jobs/create/lever/CreateSnapshot/styles';
import { ChangeEvent, useMemo } from 'react';
import FormHeader from 'pages/jobs/create/lever/FormHeader/FormHeader';
import PreviewCard from 'pages/pro/onboarding/desktop/previewCard';
import { LabelText } from 'components/inputComp/styles';
import { getImageName } from 'common/utils/image';
import { ImageTitleWrapper } from 'components/ImageUpload/styles';
import { useSelector } from 'react-redux';
import { selectCurrentCompany } from 'pages/account/authSlice';
import { createJobSchema } from './schema';

const { onBoarding: { image }, jobs, buttonText } = lang;

const CreateJobForm = ({
  submit, cancel, values, totalSteps, currentStep, showStepper, next, backToEdit, isMobileView, isEdit,
}: CreateJobFormProps) => {
  const {
    register, watch, formState: { isValid, errors }, setValue, handleSubmit, clearErrors, getValues, setError,
  } = useForm<ICreateJobValues>({
    resolver: yupResolver(createJobSchema),
    defaultValues: values,
  });
  const isDesktopView = !isMobileView;
  const { data } = useLocationQuery('');
  const currentCompany = useSelector(selectCurrentCompany);

  const onlyNumberKey = (evt: ChangeEvent<HTMLInputElement>, fieldName: string) => {
    if (evt.target.value?.length > 20) {
      return;
    }
    if (evt.target.value === '') {
      setValue(fieldName as keyof ICreateJobValues, '', { shouldValidate: true, shouldDirty: true });
      return;
    }
    if ((ONLY_NUMBERS.test(evt.target.value) || evt.target.value === '') && parseInt(evt.target.value) > 0) {
      setValue(fieldName as keyof ICreateJobValues, parseInt(evt.target.value), { shouldValidate: true, shouldDirty: true });
    }
    if (fieldName === 'salaryFrom') {
      const salaryValues = getValues(['salaryFrom', 'salaryTo']);
      if (salaryValues[0] && salaryValues[1] && salaryValues[0] < salaryValues[1]) {
        clearErrors('salaryTo');
      }
      if (salaryValues[0] && salaryValues[1] && salaryValues[0] >= salaryValues[1]) {
        setError('salaryTo', { message: jobs.error.salary });
      }
    }
  };

  const onDrop = (files: File[]) => {
    if (files[0].size <= FILE_SIZE_ONE_MB) {
      setValue('jobPicture', { file: files[0], id: uuidv4() }, { shouldValidate: true });
    } else {
      setError('jobPicture', { message: jobs.image.error });
    }
  };
  const locationOptions = useMemo<MyOptionType[]>(
    () => data?.data?.map((item: ILocationApi) => ({ label: `${item.city}, ${item.state}`, value: `${item.id}` })),
    [data],
  );
  const imageValue = watch('jobPicture');
  const previewCardImage = () => {
    if (imageValue && imageValue.file) {
      return URL.createObjectURL(imageValue.file);
    }
    if (watch('backgroundImage')) {
      return watch('backgroundImage');
    }
    return PlaceholderImage.src;
  };
  const removeBackgroundImage = (imageName: string) => {
    setValue('backgroundImage', null, { shouldValidate: true, shouldDirty: true });
    setValue('deleteJobPicture', imageName, { shouldValidate: true, shouldDirty: true });
  };
  return (

    <Container isDesktopView={isDesktopView} data-cy="createJobForm">
      <LeftPanel>
        <FormHeader
          totalSteps={totalSteps}
          currentStep={currentStep}
          title={jobs.addJobStep1Title}
          subtitle={currentStep === CreateJobSteps.CREATE_JOB ? jobs.addJobStep1Subtitle : jobs.card.preview}
          showStepper={showStepper}
        />
        {(isDesktopView || (!isDesktopView && currentStep === CreateJobSteps.CREATE_JOB)) && (
          <form onSubmit={handleSubmit(submit)}>
            <InputField>
              <InputComp
                labelText={`${jobs.roleLabel}*`}
                id="role"
                type={InputType.TEXT}
                register={register}
                placeholder={jobs.rolePlaceholder}
                data-cy="roleInput"
              />
            </InputField>
            <InputField>
              <SelectInput
                options={locationOptions}
                labelText={`${jobs.locationLabel}*`}
                id="location"
                placeHolder={jobs.locationLabel}
                value={watch('location')?.value}
                data-cy="locationInput"
                onChange={(selected: MyOptionType | null) => selected && setValue('location', { value: selected.label, label: selected.label }, { shouldValidate: true, shouldDirty: true })}
              />
            </InputField>
            <InputField>
              <SelectInput
                options={locationTypeOptions}
                labelText={`${jobs.locationTypeLabel}*`}
                id="locationType"
                placeHolder={jobs.locationTypeLabel}
                value={watch('locationType')}
                data-cy="locationTypeInput"
                onChange={(value: MyOptionType | null) => value && setValue('locationType', value.value, { shouldValidate: true, shouldDirty: true })}
              />
            </InputField>
            <InputField>
              <SelectInput
                options={jobTypeOptions}
                labelText={`${jobs.jobTypeLabel}*`}
                id="jobType"
                placeHolder={jobs.jobTypePlaceholder}
                value={watch('jobType')}
                data-cy="jobTypeInput"
                onChange={(value: MyOptionType | null) => value && setValue('jobType', value.value, { shouldValidate: true, shouldDirty: true })}
              />
            </InputField>
            <InputField>
              <SimpleInput
                labelText={jobs.salaryFromLabel}
                id="salaryFrom"
                type={InputType.TEXT}
                onChange={(value) => onlyNumberKey(value, 'salaryFrom')}
                value={`${watch('salaryFrom') || ''}`}
                error={errors.salaryFrom}
                placeholder={jobs.salaryFromPlaceholder}
                data-cy="salaryFromInput"
              />
            </InputField>

            <InputField>
              <SimpleInput
                labelText={jobs.salaryToLabel}
                id="salaryTo"
                type={InputType.TEXT}
                onChange={(value) => onlyNumberKey(value, 'salaryTo')}
                value={`${watch('salaryTo') || ''}`}
                error={errors.salaryTo}
                placeholder={jobs.salaryToPlaceholder}
                data-cy="salaryToInput"
              />
            </InputField>
            <InputField>
              <LabelText>{jobs.imageLabel}</LabelText>
              {isEdit && watch('backgroundImage') && (
                <ImageTitleWrapper>
                  <ImageTitle
                    fileName={getImageName(watch('backgroundImage') as string)}
                    removeImage={() => removeBackgroundImage(getImageName(watch('backgroundImage') as string))}
                  />
                </ImageTitleWrapper>
              )}
              {!watch('backgroundImage') && watch('jobPicture') && !errors.jobPicture?.message && (
                <ImageTitleWrapper>
                  <ImageTitle fileName={watch('jobPicture')?.id || ''} removeImage={() => setValue('jobPicture', null, { shouldValidate: true, shouldDirty: true })} />
                </ImageTitleWrapper>
              )}
              {!watch('backgroundImage') && (!watch('jobPicture') || !!errors.jobPicture?.message) && (
                <ImageUpload
                  labelText={image.imageInputLabel}
                  info={jobs.image.imageInputInfo}
                  onDrop={onDrop}
                  height="195px"
                  error={!!errors.jobPicture?.message}
                  data-cy="imageUpload"
                />
              )}
            </InputField>
            <InputField>
              <LabelText>{jobs.descriptionLabel}</LabelText>

              <Disclaimer>
                {jobs.descriptionDisclamer}
              </Disclaimer>
              <Description
                noLabel
                value={watch('description')}
                setValue={(e) => setValue('description', e, { shouldValidate: true, shouldDirty: true })}
                maxCharacters={characterLimit}
                placeholder={jobs.descriptionPlaceholder}
                height={199}
                data-cy="descriptionInput"
              />
            </InputField>
            <ButtonWrapper>
              {isDesktopView && <SkipButton label={buttonText.cancel} primary variant="link" onClick={cancel} data-cy="cancelButton" />}
              <ButtonComp
                label={buttonText.next}
                disabled={!isValid}
                size="large"
                primary
                fullWidth
                type="submit"
                data-cy="nextButton"
              />
              {!isDesktopView && (
                <ButtonComp
                  label={buttonText.cancel}
                  fullWidth
                  onClick={cancel}
                  variant="link"
                  data-cy="cancelButton"
                />
              )}
            </ButtonWrapper>
          </form>
        )}
      </LeftPanel>

      {(isDesktopView || (!isDesktopView && currentStep === CreateJobSteps.CREATE_JOB_MOBILE)) && (
        <RightPanel align="flex-start" isDesktopView={isDesktopView}>
          <CardContainer>
            <PreviewCard
              fullName=""
              picture={previewCardImage() as string}
              mantra=""
              currentStep={1}
            >
              <JobCard
                companyName={currentCompany.name}
                role={watch('role')}
                location={watch('location')?.label}
                jobType={watch('jobType')}
                locationType={watch('locationType')}
                salaryFrom={watch('salaryFrom')}
                salaryTo={watch('salaryTo')}
              />
            </PreviewCard>

            {!isDesktopView && (
              <ButtonWrapperPreview>
                <ButtonComp
                  label={buttonText.next}
                  size="large"
                  primary
                  fullWidth
                  onClick={() => next(CreateJobSteps.CREATE_SNAPSHOT)}
                  data-cy="nextButton"
                />
                {!isDesktopView && (
                  <ButtonComp
                    label={buttonText.back}
                    fullWidth
                    onClick={backToEdit}
                    variant="link"
                    data-cy="backButton"
                  />
                )}
              </ButtonWrapperPreview>
            )}
          </CardContainer>
        </RightPanel>
      )}
    </Container>
  );
};

export default CreateJobForm;
