import { useCallback } from 'react';
import { TextComp } from 'components/textComp';
import { HeaderContainer, TextWrapper } from 'pages/pro/onboarding/desktop/styles';
import { FormHeaderProps } from 'pages/pro/onboarding/desktop/types';
import { StepLine, Stepper, SubTitle } from 'pages/jobs/create/lever/FormHeader/styles';

const FormHeader = ({
  totalSteps,
  currentStep,
  title,
  subtitle,
  back,
  showStepper,
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
      {showStepper && <Stepper>{createSteps()}</Stepper>}
      {back && back}
      <TextWrapper>
        <TextComp component="h2" theme="light">
          {title}
        </TextComp>
        <SubTitle>
          {subtitle}
        </SubTitle>
      </TextWrapper>
    </HeaderContainer>
  );
};

export default FormHeader;
