import React from 'react';
import ChevronLeft from 'components/Icons/LeftChevron';
import Stepper from 'components/Stepper';
import lang from 'common/lang';
import useAddJob from 'common/hooks/useAddJob';
import {
  MobileContainer,
  MobileCreateJobPageText,
  MobileStepsContainer,
} from './styles';
import { CreateOrgJobSteps } from './types';
import Role from './role';
import Details from './details';
import Brand from './brand';
const {
  jobs: {
    createJob,
    createJobSteps: { role, details },
  },
} = lang;
const MobileCreateJob = () => {
  const {
    detailsData,
    jobData,
    handleBack,
    handleNext,
    handleAddJob,
    step,
    roleData,
  } = useAddJob();
  return (
    <MobileContainer>
      <MobileCreateJobPageText>
        <ChevronLeft
          height="24"
          width="24"
          data-cy="goBackCreateCards"
          onClick={handleBack}
        />
        <span>{createJob}</span>
      </MobileCreateJobPageText>

      <MobileStepsContainer>
        <Stepper
          steps={[role.title, details.title]}
          activeStep={step}
        />
        {step === CreateOrgJobSteps.ROLE && (
          <Role onNext={handleNext} data={roleData} />
        )}
        {step === CreateOrgJobSteps.DETAILS && (
          <Details roleData={roleData} onNext={handleAddJob} data={detailsData} />
        )}
        {step === CreateOrgJobSteps.BRAND && jobData && (
          <Brand coverCardData={jobData} />
        )}
      </MobileStepsContainer>
    </MobileContainer>
  );
};

export default MobileCreateJob;
