import ButtonComp from 'components/buttonComp';
import JobCard from 'components/cards/JobCard/JobCard';
import SelectInput from 'components/Select/Select';
import { useWindowDimensions } from 'common/hooks';
import lang from 'common/lang';
import PreviewCard from 'pages/pro/onboarding/desktop/previewCard';
import FormHeader from 'pages/jobs/create/lever/FormHeader/FormHeader';
import {
  ButtonWrapper,
  CardContainer, Container, InputField, LeftPanel, RightPanel,
} from '../../styles';
import { CreateJobLeverSteps, SelectJobLeverProps } from '../../types';

const { buttonText } = lang;

const SelectJobLever = ({ next }: SelectJobLeverProps) => {
  const { isDesktopView } = useWindowDimensions();
  return (
    <Container isDesktopView={isDesktopView} data-cy="createATSJobForm">
      <LeftPanel>
        <FormHeader
          totalSteps={3}
          currentStep={1}
          title="Select job"
          subtitle="Pick job from ATS"

        />
        <form>
          <InputField>
            <SelectInput
              options={[]}
              labelText="Choose Lever Job"
              id="location"
              placeHolder="asd"
              value=""
            />
          </InputField>
        </form>
        <ButtonWrapper>
          <ButtonComp
            label={buttonText.cancel}
            fullWidth
            variant="link"
            onClick={() => next(CreateJobLeverSteps.CREATE_JOB)}
            data-cy="cancelATSJobForm"
          />
          <ButtonComp
            label={buttonText.next}
            size="large"
            primary
            fullWidth
            type="submit"
            data-cy="submitATSJobFormStep1"
          />
        </ButtonWrapper>
      </LeftPanel>
      <RightPanel isDesktopView={isDesktopView}>
        <CardContainer>
          <PreviewCard fullName="" mantra="" picture="" currentStep={1}>
            <JobCard
              companyName="Roblox"
            />
          </PreviewCard>
        </CardContainer>
      </RightPanel>
    </Container>
  );
};

export default SelectJobLever;
