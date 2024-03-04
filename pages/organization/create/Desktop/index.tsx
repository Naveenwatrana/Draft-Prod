import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useAppSelector } from 'common/hooks/state';
import { selectCurrentCompany } from 'pages/account/authSlice';
import { CreateOrganizationSteps, IOrganizationValues } from '../types';
import {
  Container,
  CreateOrganizationBody,
  ImageContainer,
  PlaceholderImage,
} from '../style';
import Navbar from '../Navbar';
import OrgDetails from '../Steps/OrgDetails';
import ConfirmEmail from '../Steps/ConfirmEmail';
import Website from '../Steps/Website';
import BrandStack from '../Steps/BrandStack';
import SplashScreen from '../Steps/SplashScreen';

const DesktopCreateOrganization = () => {
  const router = useRouter();
  const currentCompany = useAppSelector(selectCurrentCompany);
  const [step, setStep] = useState(CreateOrganizationSteps.SPLASH_SCREEN);
  const [organizationDetails, setOrganizationDetails] = useState<IOrganizationValues>();
  const handleNext = (values: IOrganizationValues) => {
    setOrganizationDetails(values);
    setStep((stepToUpdate) => stepToUpdate + 1);
  };
  const handleBack = (currentStep: number) => {
    if (step !== CreateOrganizationSteps.SPLASH_SCREEN) {
      setStep(currentStep - 1);
    } else {
      router.back();
    }
  };
  const handleBrandNext = () => {
    router.replace(`/org/${currentCompany.username}`);
  };

  return (
    <Container>
      <Navbar step={step} onBack={handleBack} />
      <CreateOrganizationBody>
        {step === CreateOrganizationSteps.SPLASH_SCREEN && (
          <SplashScreen onNext={() => setStep(CreateOrganizationSteps.WEBSITE)} />
        )}
        {step === CreateOrganizationSteps.WEBSITE && (
          <Website onNext={handleNext} orgData={organizationDetails} />
        )}
        {step === CreateOrganizationSteps.ORG_DETAILS && (
          <OrgDetails onNext={handleNext} orgData={organizationDetails} />
        )}
        {step === CreateOrganizationSteps.BRAND_STACK && (
          <BrandStack onNext={handleBrandNext} />
        )}
        {step === CreateOrganizationSteps.CONFIRM_EMAIL
          && organizationDetails && <ConfirmEmail orgData={organizationDetails} onNext={() => setStep(CreateOrganizationSteps.BRAND_STACK)} />}
        {step !== CreateOrganizationSteps.BRAND_STACK && (
          <ImageContainer>
            <PlaceholderImage />
          </ImageContainer>
        )}
      </CreateOrganizationBody>
    </Container>
  );
};

export default DesktopCreateOrganization;
