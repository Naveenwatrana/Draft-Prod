import {
  Step, StepName, StepsContainer, StepsCount,
} from './styles';
import { StepperProps } from './types';

const Stepper = ({ stepsToRender, step }: StepperProps) => {
  return (
    <StepsContainer>
      {stepsToRender && stepsToRender.map((stepToRender) => (
        <Step active={step === stepToRender.step} key={stepToRender.name}>
          <StepsCount>{stepToRender.step}</StepsCount>
          <StepName>{stepToRender.name}</StepName>
        </Step>
      ))}
    </StepsContainer>
  );
};

export default Stepper;
