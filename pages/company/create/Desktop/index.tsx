import React, { useState } from 'react';
import { CreateCompanySteps } from '../types';
import { Container, CreateCompanyBody } from '../styles';
import Navbar from '../Navbar';
import ValidateURL from '../ValidateURL';
import CompleteProfile from '../CompleteProfile';
import ValidateEmail from '../ValidateEmail';
const DesktopCreateCompany = () => {
  const [step, setStep] = useState(CreateCompanySteps.URL);
  const [url, setUrl] = useState<string>('');
  return (
    <Container>
      <Navbar step={step} />
      <CreateCompanyBody>
        {step === CreateCompanySteps.URL && (
          <ValidateURL
            url={url}
            onNext={() => setStep(CreateCompanySteps.VALIDATE_EMAIL)}
            onUrlChange={setUrl}
          />
        )}
        {step === CreateCompanySteps.VALIDATE_EMAIL && (
          <ValidateEmail
            url={url}
            onNext={() => setStep(CreateCompanySteps.COMPLETE_PROFILE)}
            onPrevious={() => setStep(CreateCompanySteps.URL)}
          />
        )}
        {step === CreateCompanySteps.COMPLETE_PROFILE && (
          <CompleteProfile
            url={url}
            onGoBack={() => setStep(CreateCompanySteps.VALIDATE_EMAIL)}
          />
        )}
      </CreateCompanyBody>
    </Container>
  );
};

export default DesktopCreateCompany;
