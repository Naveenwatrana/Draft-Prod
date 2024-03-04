import React, { useState } from 'react';
import { useRouter } from 'next/router';
import ChevronLeft from 'components/Icons/LeftChevron';
import lang from 'common/lang';
import { MobileCreateCompanySteps } from '../types';
import ValidateURL from '../ValidateURL';
import CompleteProfile from '../CompleteProfile';
import { Container, CreateCompanyBody, CreateCompanyPageText } from './styles';
import MobileNavbar from '../Navbar/MobileNavbar';
import ValidateEmail from '../ValidateEmail';
const {
  company: {
    createCompanyPage,
  },
} = lang;
const MobileCreateCompany = () => {
  const [step, setStep] = useState(MobileCreateCompanySteps.URL);
  const [url, setUrl] = useState<string>('');
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  return (
    <Container>
      <CreateCompanyPageText>
        <ChevronLeft data-cy="goBackCreateCards" onClick={handleBack} />
        {createCompanyPage}
      </CreateCompanyPageText>
      <MobileNavbar step={step} />
      <CreateCompanyBody>
        {step === MobileCreateCompanySteps.URL && (
          <ValidateURL
            url={url}
            onNext={() => setStep(MobileCreateCompanySteps.COMPLETE_PROFILE)}
            onUrlChange={setUrl}
          />
        )}
        {step === MobileCreateCompanySteps.VALIDATE_EMAIL && (
          <ValidateEmail
            url={url}
            onNext={() => setStep(MobileCreateCompanySteps.COMPLETE_PROFILE)}
            onPrevious={() => setStep(MobileCreateCompanySteps.URL)}
          />
        )}
        {step === MobileCreateCompanySteps.COMPLETE_PROFILE && (
          <CompleteProfile
            url={url}
            onGoBack={() => setStep(MobileCreateCompanySteps.URL)}
          />
        )}
      </CreateCompanyBody>
    </Container>
  );
};

export default MobileCreateCompany;
