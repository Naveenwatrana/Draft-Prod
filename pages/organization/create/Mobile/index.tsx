import React, { useState } from 'react';
import lang from 'common/lang';
import ChevronLeft from 'components/Icons/LeftChevron';
import Stepper from 'components/Stepper';
import { useRouter } from 'next/router';
import { useAppSelector } from 'common/hooks/state';
import { selectCurrentCompany } from 'pages/account/authSlice';
import { CreateOrganizationSteps, IOrganizationValues } from '../types';
import {
  Container,
  CreateOrganizationBody,
  CreateOrganizationPageText,
  StepsContainer,
} from './style';
import Website from '../Steps/Website';
import OrgDetails from '../Steps/OrgDetails';
import ConfirmEmail from '../Steps/ConfirmEmail';
import BrandStack from '../Steps/BrandStack';
import SplashScreen from '../Steps/SplashScreen';
const {
  organization: {
    create: {
      step: {
        website, orgDetails, confirmEmail, brand,
      },
      title,
    },
  },
} = lang;
const stepsToRender = [website, orgDetails, confirmEmail, brand];
const MobileCreateOrganization = () => {
  const currentCompany = useAppSelector(selectCurrentCompany);
  const [step, setStep] = useState(CreateOrganizationSteps.SPLASH_SCREEN);
  const [organizationDetails, setOrganizationDetails] = useState<IOrganizationValues>();
  const handleNext = (values: IOrganizationValues) => {
    setOrganizationDetails(values);
    setStep((stepToUpdate) => stepToUpdate + 1);
  };
  const router = useRouter();
  const handleBack = () => {
    if (step !== CreateOrganizationSteps.SPLASH_SCREEN) {
      setStep(step - 1);
    } else {
      router.back();
    }
  };
  const handleBrandNext = () => {
    router.replace(`/org/${currentCompany.username}`);
  };
  return (
    <Container withoutBottomNav={step !== CreateOrganizationSteps.SPLASH_SCREEN}>
      <CreateOrganizationPageText>
        <ChevronLeft
          height="24"
          width="24"
          data-cy="goBackCreateCards"
          onClick={handleBack}
        />
        <span>{title}</span>
      </CreateOrganizationPageText>
      {!!step
      && (
        <StepsContainer>
          <Stepper steps={stepsToRender} activeStep={step} />
        </StepsContainer>
      )}
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
        {step === CreateOrganizationSteps.CONFIRM_EMAIL
          && organizationDetails && <ConfirmEmail orgData={organizationDetails} onNext={() => setStep(CreateOrganizationSteps.BRAND_STACK)} />}
        {step === CreateOrganizationSteps.BRAND_STACK && (
          <BrandStack onNext={handleBrandNext} />
        )}
      </CreateOrganizationBody>
    </Container>
  );
};

export default MobileCreateOrganization;
