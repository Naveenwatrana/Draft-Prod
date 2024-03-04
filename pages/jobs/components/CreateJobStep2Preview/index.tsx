import lang from 'common/lang';
import ButtonComp from 'components/buttonComp';
import JobSnapshotCard from 'components/cards/JobSnapShotCard/JobSnapShotCard';
import {
  ButtonWrapperPreview, CardContainer, Container, LeftPanel,
} from 'pages/jobs/create/styles';
import { CreateJobSteps } from 'pages/jobs/create/types';
import FormHeader from 'pages/jobs/create/lever/FormHeader/FormHeader';
import PreviewCard from 'pages/pro/onboarding/desktop/previewCard';
import { useSelector } from 'react-redux';
import { selectCurrentCompany } from 'pages/account/authSlice';
import { CardPanel } from './styles';

const { buttonText, jobs } = lang;

const CreateJobStep2Preview = ({
  isDesktopView, next, backToEdit, values, totalSteps, currentStep, showStepper,
}: any) => {
  const currentCompany = useSelector(selectCurrentCompany);
  const previewCardImage = () => {
    if (values.snapShotPicture && values.snapShotPicture.file) {
      return URL.createObjectURL(values.snapShotPicture.file);
    }
    if (values.backgroundSnapshotImage) {
      return values.backgroundSnapshotImage;
    }
    // return placeholderImage;
  };
  return (
    <Container isDesktopView={isDesktopView} data-cy="createJobForm">
      <LeftPanel>
        <FormHeader
          totalSteps={totalSteps}
          currentStep={currentStep}
          title={jobs.addJobStep1Title}
          subtitle={jobs.card.preview}
          showStepper={showStepper}
        />
      </LeftPanel>
      <CardPanel align="flex-start" isDesktopView={isDesktopView}>
        <CardContainer>
          <PreviewCard
            fullName=""
            picture={previewCardImage()}
            mantra=""
            currentStep={1}
          >
            <JobSnapshotCard
              companyName={currentCompany?.name}
              text={values.snapshotDescription}
            />
          </PreviewCard>

          <ButtonWrapperPreview>
            <ButtonComp
              label={buttonText.next}
              size="large"
              primary
              fullWidth
              onClick={() => next(CreateJobSteps.REVIEW_JOB)}
              data-cy="nextCrateJobStep2"
            />
            {!isDesktopView && (
              <ButtonComp
                label={buttonText.back}
                fullWidth
                onClick={backToEdit}
                variant="link"
                data-cy="backCrateJobStep2"
              />
            )}
          </ButtonWrapperPreview>
        </CardContainer>
      </CardPanel>
    </Container>

  );
};

export default CreateJobStep2Preview;
