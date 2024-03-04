import { useRouter } from 'next/router';
import { IDetailsData } from 'pages/jobs/create/details/type';
import {
  CreateOrgJobSteps,
  IJobRoleValues,
  JobCoverCardFelids,
} from 'pages/jobs/create/types';
import { useState } from 'react';
import { selectCurrentCompany } from 'pages/account/authSlice';
import { useAppSelector } from './state';

const useAddJob = () => {
  const [step, setStep] = useState(CreateOrgJobSteps.ROLE);
  const router = useRouter();
  const [roleData, setRoleData] = useState<IJobRoleValues>();
  const [detailsData, setDetailsData] = useState<IDetailsData>();
  const [jobData, setJobData] = useState<JobCoverCardFelids>();
  const handleBack = () => {
    if (step !== CreateOrgJobSteps.ROLE) {
      setStep((currentStep) => currentStep - 1);
    } else {
      router.back();
    }
  };
  const handleNext = (roleDataToSet: IJobRoleValues) => {
    setStep((stepToUpdate) => stepToUpdate + 1);
    setRoleData(roleDataToSet);
  };
  const currentCompany = useAppSelector(selectCurrentCompany);
  const handleAddJob = (data?: IDetailsData, id?: number) => {
    if (roleData && id && data) {
      setDetailsData(data);
      setJobData({
        companyName: currentCompany.name,
        role: roleData.role,
        location: data.whatWillYouDo.location?.label || '',
        salaryFrom: data.whoYouAre.salaryFrom,
        salaryTo: data.whoYouAre.salaryTo,
        icon: currentCompany.logo,
        locationType: data.whatWillYouDo.workStyle?.label || '',
        employmentType: data.whoYouAre.employmentType?.label || '',
        id,
        cover: '',
        title: roleData.role,
      });
    }
    setStep((stepToUpdate) => stepToUpdate + 1);
  };
  return {
    detailsData,
    jobData,
    handleBack,
    handleNext,
    handleAddJob,
    step,
    roleData,
  };
};

export default useAddJob;
