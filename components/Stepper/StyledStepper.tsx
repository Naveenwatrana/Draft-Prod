import {
  StepperContainer,
  StyledStepperCounter,
  StyledStepperLabel,
  SteppersContainer,
} from './style';
import { StepperProps } from './types';

const StyledStepper = ({ steps, activeStep }: StepperProps) => {
  return (
    <SteppersContainer>
      {steps.map((step, index) => (
        <StepperContainer key={step}>
          <StyledStepperCounter
            active={activeStep === index + 1}
            completed={activeStep > index + 1}
            data-testid="stepCount"
          >
            {index + 1}
          </StyledStepperCounter>
          <StyledStepperLabel active={activeStep === index + 1} completed={activeStep > index + 1}>{step}</StyledStepperLabel>
        </StepperContainer>
      ))}
    </SteppersContainer>
  );
};

export default StyledStepper;
