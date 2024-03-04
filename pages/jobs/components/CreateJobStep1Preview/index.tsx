import lang from 'common/lang';
import { ButtonComp } from 'components/buttonComp';
import JobCard from 'components/cards/JobCard/JobCard';
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

const CreateJobStep1Preview = ({
  isDesktopView, next, backToEdit, values, totalSteps, currentStep, showStepper,
}: any) => {
  const currentCompany = useSelector(selectCurrentCompany);
  const previewCardImage = () => {
    if (values.jobPicture && values.jobPicture.file) {
      return URL.createObjectURL(values.jobPicture.file);
    }
    if (values.backgroundImage) {
      return values.backgroundImage;
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
            <JobCard
              companyName={currentCompany?.name}
              role={values.role}
              location={values.location.label}
              jobType={values.jobType}
              locationType={values.locationType}
              salaryFrom={values.salaryFrom}
              salaryTo={values.salaryTo}
            />
          </PreviewCard>

          <ButtonWrapperPreview>
            <ButtonComp
              label={buttonText.next}
              size="large"
              primary
              fullWidth
              onClick={() => next(CreateJobSteps.CREATE_SNAPSHOT)}
              data-cy="nextCrateJobStep1"
            />
            {!isDesktopView && (
              <ButtonComp
                label={buttonText.back}
                fullWidth
                onClick={backToEdit}
                variant="link"
                data-cy="backCrateJobStep1"
              />
            )}
          </ButtonWrapperPreview>
        </CardContainer>
      </CardPanel>
    </Container>

  );
};

export default CreateJobStep1Preview;
