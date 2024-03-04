import {
  StepperContainer,
  StepperCounter,
  StepperLabel,
  SteppersContainer,
} from './style';
import { StepperProps } from './types';

const Stepper = ({ steps, activeStep }: StepperProps) => {
  return (
    <SteppersContainer>
      {steps.map((step, index) => (
        <StepperContainer key={step}>
          <StepperCounter active={activeStep === index + 1} completed={activeStep > index + 1} data-testid="stepCount">
            {index + 1}
          </StepperCounter>
          <StepperLabel active={activeStep === index + 1}>{step}</StepperLabel>
        </StepperContainer>
      ))}
    </SteppersContainer>
  );
};

export default Stepper;
