import React from 'react';
import ChevronLeft from 'components/Icons/LeftChevron';
import Stepper from 'components/Stepper';
import lang from 'common/lang';
import { ToastContainer } from 'react-toastify';
import useOnboarding from 'common/hooks/useOnboarding';
import Loader from 'components/Loader/Loader';
import { CreateOnBoardingSteps, OnboardingProps } from '../types';
import {
  Container,
  OnBoardingMainBody,
  OnBoardingMainBodyPageText,
  StepsContainer,
} from './style';
import NameDetails from '../Steps/Name';
import OnboardingResume from '../Steps/OnboardingResume';
import Brand from '../Steps/Brand';
import { ClippedUserName } from '../Navbar/style';

const {
  userOnBoarding: {
    step: {
      name, resume, brand,
    },
    title,
  },
} = lang;
const stepsToRender = [name, resume];
const MobileCreateOnBoarding = ({ onboardingStep }:OnboardingProps) => {
  const {
    handleBack,
    handleResumeNext,
    loading,
    handleNext,
    onBoardingDetails,
    step,
    name: username,
  } = useOnboarding(onboardingStep);
  return (
    <Container>
      {loading && <Loader />}
      <ToastContainer
        position="top-center"
        hideProgressBar
        style={{
          width: '100%',
          maxWidth: '906px',
        }}
      />
      <OnBoardingMainBodyPageText>
        <ChevronLeft
          height="24"
          width="24"
          data-cy="goBackCreateCards"
          onClick={handleBack}
        />
        <ClippedUserName>{step === CreateOnBoardingSteps.NAME ? title : username}</ClippedUserName>
      </OnBoardingMainBodyPageText>
      <StepsContainer>
        <Stepper steps={stepsToRender} activeStep={step} />
      </StepsContainer>
      <OnBoardingMainBody>
        {step === CreateOnBoardingSteps.NAME && (
          <NameDetails onNext={handleNext} onBoardingData={onBoardingDetails} />
        )}

        {step === CreateOnBoardingSteps.RESUME && (
          <OnboardingResume onNext={handleResumeNext} />
        )}

      </OnBoardingMainBody>
    </Container>
  );
};

export default MobileCreateOnBoarding;
