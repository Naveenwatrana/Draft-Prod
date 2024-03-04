import LayoutCompact from 'components/Molecules/LayoutCompact';
import lang from 'common/lang';
import useAddJob from 'common/hooks/useAddJob';
import Brand from './brand';
import { CreateOrgJobSteps } from './types';
import Role from './role';
import Details from './details';
const {
  jobs: {
    createJob,
    createJobSteps: { role, details },
  },
} = lang;
const DesktopCreateJob = () => {
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
    <LayoutCompact
      currentStep={step}
      onBack={handleBack}
      steps={[role.title, details.title]}
      title={createJob}
    >
      {step === CreateOrgJobSteps.ROLE && (
        <Role onNext={handleNext} data={roleData} />
      )}
      {step === CreateOrgJobSteps.DETAILS && (
        <Details roleData={roleData} onNext={handleAddJob} data={detailsData} />
      )}
      {step === CreateOrgJobSteps.BRAND && jobData && (
        <Brand coverCardData={jobData} />
      )}
    </LayoutCompact>
  );
};

export default DesktopCreateJob;
