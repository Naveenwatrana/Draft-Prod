import React from 'react';
import lang from 'common/lang';
import { MobileCreateCompanySteps } from '../types';
import {
  StepsContainer, Step, StepsCount, StepName,
} from './style';

type MobileNavbarProps = {
  step: number;
};
const {
  company: {
    step: {
      url, validateEmail, completeProfile, createCards,
    },
  },
} = lang;

const stepsToRender = [
  { name: url, step: MobileCreateCompanySteps.URL },
  { name: validateEmail, step: MobileCreateCompanySteps.VALIDATE_EMAIL },
  { name: completeProfile, step: MobileCreateCompanySteps.COMPLETE_PROFILE },
  { name: createCards, step: MobileCreateCompanySteps.CREATE_CARDS },
];

const MobileNavbar = ({ step }: MobileNavbarProps) => {
  return (
    <div>
      <StepsContainer>
        {stepsToRender.map((stepToRender) => (
          <Step active={step === stepToRender.step} key={stepToRender.name}>
            <StepsCount>{stepToRender.step}</StepsCount>
            {step === stepToRender.step && (
              <StepName>{stepToRender.name}</StepName>
            )}
          </Step>
        ))}
      </StepsContainer>
    </div>
  );
};

export default MobileNavbar;
