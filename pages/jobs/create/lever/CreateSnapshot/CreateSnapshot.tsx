import Description from 'components/Description/Description';
import ImageUpload from 'components/ImageUpload/ImageUpload';
import PreviewCard from 'pages/pro/onboarding/desktop/previewCard';
import { BoldText } from 'components/text/styles';
import PlaceholderImage from '/public/images/defaultProfile.png';
import { v4 as uuidv4 } from 'uuid';
import lang from 'common/lang';
import ImageTitle from 'pages/pro/onboarding/common/imageTitle';
import FormHeader from 'pages/pro/onboarding/desktop/formHeader';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import ButtonComp from 'components/buttonComp';
import { FILE_SIZE_ONE_MB } from 'common/constants';
import JobSnapshotCard from 'components/cards/JobSnapShotCard/JobSnapShotCard';
import { CreateJobSnapshotType, createJobSpanshotSchema } from 'pages/jobs/create/lever/CreateSnapshot/types';
import {
  ButtonWrapper,
  ButtonWrapperPreview, CardContainer,
  Container,
  InputField,
  LeftPanel, RightPanel,
} from 'pages/jobs/create/styles';
import { CreateJobSteps, ICreateJobValues } from 'pages/jobs/create/types';
import BackButton from 'pages/jobs/create/BackButton';
import { getImageName } from 'common/utils/image';
import { ImageTitleWrapper } from 'components/ImageUpload/styles';
import { useSelector } from 'react-redux';
import { selectCurrentCompany } from 'pages/account/authSlice';

const { jobs, onBoarding: { image }, buttonText } = lang;

const CreateSnapshot = ({
  totalSteps, currentStep, goBack, showStepper, submit, cancel, values, next, backToEdit, isMobileView, isEdit,
}: CreateJobSnapshotType) => {
  const currentCompany = useSelector(selectCurrentCompany);
  const isDesktopView = !isMobileView;
  const {
    watch, formState: { isValid, errors }, setValue, handleSubmit, setError,
  } = useForm<ICreateJobValues>({
    resolver: yupResolver(createJobSpanshotSchema),
    defaultValues: values,
  });
  const onDrop = (files: File[]) => {
    if (files[0].size <= FILE_SIZE_ONE_MB) {
      setValue(
        'snapShotPicture',
        { file: files[0], id: uuidv4() },
        {
          shouldDirty: true,
          shouldValidate: true,
        },
      );
    } else {
      setError('snapShotPicture', { message: jobs.image.error });
    }
  };
  const removeBackgroundImage = (imageName: string) => {
    setValue('snapShotBackground', null, { shouldValidate: true, shouldDirty: true });
    setValue('deleteSnapShotPicture', imageName, { shouldValidate: true, shouldDirty: true });
  };
  const imageValue = watch('snapShotPicture');
  const previewCardImage = () => {
    if (imageValue && imageValue.file) {
      return URL.createObjectURL(imageValue.file);
    }
    if (watch('snapShotBackground')) {
      return watch('snapShotBackground');
    }
    return PlaceholderImage.src;
  };
  return (
    <Container isDesktopView={isDesktopView} data-cy="createJobSnapshortForm">
      <LeftPanel>
        <FormHeader
          totalSteps={totalSteps}
          currentStep={currentStep}
          title={jobs.addSnaphotTitle}
          subtitle={isDesktopView ? jobs.addSnapshotSubtitle : jobs.card.preview}
          back={isDesktopView && <BackButton onClick={goBack} />}
          showStepper={showStepper}
        />
        {(isDesktopView || (!isDesktopView && currentStep === CreateJobSteps.CREATE_SNAPSHOT)) && (
          <form onSubmit={handleSubmit(submit)}>
            <InputField>
              <BoldText className="semibold12">{jobs.addSnapshotLabel}</BoldText>
              <Description
                maxCharacters={260}
                value={watch('snapshotDescription')}
                setValue={(e) => setValue('snapshotDescription', e, { shouldValidate: true, shouldDirty: true })}
                height={176}
                data-cy="snapshotDescription"
              />
            </InputField>

            <InputField>
              <BoldText className="semibold12">{jobs.imageLabel}</BoldText>
              {isEdit && watch('snapShotBackground') && (
                <ImageTitleWrapper>
                  <ImageTitle
                    fileName={getImageName(watch('snapShotBackground') as string)}
                    removeImage={() => removeBackgroundImage(getImageName(watch('snapShotBackground') as string))}
                  />
                </ImageTitleWrapper>
              )}
              {!watch('snapShotBackground') && watch('snapShotPicture') && !errors.snapShotPicture?.message && (
                <ImageTitleWrapper>
                  <ImageTitle fileName={watch('snapShotPicture')?.id || ''} removeImage={() => setValue('snapShotPicture', null, { shouldValidate: true, shouldDirty: true })} />
                </ImageTitleWrapper>
              )}
              {!watch('snapShotBackground') && (!watch('snapShotPicture') || !!errors.snapShotPicture?.message) && (
                <ImageUpload
                  labelText={image.imageInputLabel}
                  info={image.imageInputInfo}
                  onDrop={onDrop}
                  height="194px"
                  error={!!errors.snapShotPicture?.message}
                  data-cy="snapshotImage"
                />
              )}
            </InputField>
            <ButtonWrapper>
              <ButtonComp
                label={buttonText.next}
                disabled={!isValid}
                size="large"
                primary
                fullWidth
                type="submit"
              />
              {!isDesktopView && (
                <ButtonComp
                  label={buttonText.back}
                  fullWidth
                  onClick={cancel}
                  variant="link"
                />
              )}
            </ButtonWrapper>
          </form>
        )}
      </LeftPanel>
      {(isDesktopView || (!isDesktopView && currentStep === CreateJobSteps.CREATE_SNAPSHOT_MOBILE)) && (
        <RightPanel isDesktopView={isDesktopView}>
          <CardContainer>
            <PreviewCard
              fullName=""
              picture={previewCardImage() as string}
              mantra=""
              currentStep={1}
            >
              <JobSnapshotCard companyName={currentCompany.name} text={watch('snapshotDescription')} />
            </PreviewCard>
            {!isDesktopView && (
              <ButtonWrapperPreview>
                <ButtonComp
                  label={buttonText.next}
                  size="large"
                  primary
                  fullWidth
                  onClick={() => next(CreateJobSteps.REVIEW_JOB)}
                />
                {!isDesktopView && (
                  <ButtonComp
                    label={buttonText.back}
                    fullWidth
                    onClick={backToEdit}
                    variant="link"
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

export default CreateSnapshot;
