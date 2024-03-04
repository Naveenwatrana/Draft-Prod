import React from 'react';
import { ToastContainer } from 'react-toastify';
import Loader from 'components/Loader/Loader';
import useOnboarding from 'common/hooks/useOnboarding';
import lang from 'common/lang';
import { CreateOnBoardingSteps, OnboardingProps } from '../types';
import {
  Container,
  CreateOnBoardingBody,
  ImageContainer,
  ProfilesImg,
} from '../style';
import Navbar from '../Navbar';
import NameDetails from '../Steps/Name';
import OnboardingResume from '../Steps/OnboardingResume';
import Brand from '../Steps/Brand';
const {
  userOnBoarding: {
    title,
  },
} = lang;

const DesktopCreateOnBoarding = ({ onboardingStep }: OnboardingProps) => {
  const {
    handleBack,
    handleResumeNext,
    loading,
    handleNext,
    onBoardingDetails,
    step,
    name,
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
      <Navbar step={step} onBack={handleBack} title={step === CreateOnBoardingSteps.NAME ? title : name} />
      <CreateOnBoardingBody>
        {step === CreateOnBoardingSteps.NAME && (
          <NameDetails onNext={handleNext} onBoardingData={onBoardingDetails} />
        )}

        {step === CreateOnBoardingSteps.RESUME && (
          <OnboardingResume onNext={handleResumeNext} />
        )}

        {step === CreateOnBoardingSteps.NAME && (
          <ImageContainer>
            <ProfilesImg />
          </ImageContainer>
        )}
      </CreateOnBoardingBody>
    </Container>
  );
};

export default DesktopCreateOnBoarding;
