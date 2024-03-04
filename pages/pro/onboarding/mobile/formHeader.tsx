import { useCallback } from 'react';
import { FormHeaderProps } from 'pages/pro/onboarding/mobile/types';
import ThumbsIcon from 'components/Icons/ThumbsIcon';
import TextComp from 'components/textComp';
import {
  HeaderContainer,
  StepLine,
  StepLineWrapper,
  TextWrapper,
  ThumbsIconWrapper,
} from './styles';

const FormHeader = ({
  totalSteps,
  currentStep,
  title,
  subtitle,
}: FormHeaderProps) => {
  const isSuccess = currentStep === 5;
  const createSteps = useCallback(() => {
    const steps = [];
    for (let i = 1; i <= totalSteps; i += 1) {
      steps.push(<StepLine key={i} active={currentStep === i} />);
    }
    return steps;
  }, [totalSteps, currentStep]);

  return (
    <HeaderContainer success={isSuccess}>
      {!isSuccess && <StepLineWrapper>{createSteps()}</StepLineWrapper>}
      {isSuccess && (
        <ThumbsIconWrapper>
          <ThumbsIcon />
        </ThumbsIconWrapper>
      )}
      <TextWrapper>
        <TextComp component="h2" theme="light">
          {title}
        </TextComp>
        <TextComp component="h4" theme="light">
          {subtitle}
        </TextComp>
      </TextWrapper>
    </HeaderContainer>
  );
};

export default FormHeader;
