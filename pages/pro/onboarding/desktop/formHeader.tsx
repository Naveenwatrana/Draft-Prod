import { useCallback } from 'react';
import { FormHeaderProps } from 'pages/pro/onboarding/desktop/types';
import {
  FormSubtitle, HeaderContainer, StepLine, StepLineWrapper, TextWrapper,
} from 'pages/pro/onboarding/desktop/styles';
import TextComp from 'components/textComp';

const FormHeader = ({
  totalSteps,
  currentStep,
  title,
  subtitle,
  back,
  showStepper = true,
}: FormHeaderProps) => {
  const createSteps = useCallback(() => {
    const steps = [];
    for (let i = 1; i <= totalSteps; i += 1) {
      steps.push(
        <StepLine
          key={i}
          active={currentStep === i}
        />,
      );
    }
    return steps;
  }, [totalSteps, currentStep]);

  return (
    <HeaderContainer back={!!back}>
      {showStepper && <StepLineWrapper>{createSteps()}</StepLineWrapper>}
      {!!back && back}
      <TextWrapper>
        <TextComp component="h2" theme="light">
          {title}
        </TextComp>
        <FormSubtitle theme="light">
          {subtitle}
        </FormSubtitle>
      </TextWrapper>
    </HeaderContainer>
  );
};

export default FormHeader;
