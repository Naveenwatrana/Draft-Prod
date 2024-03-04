import { useState } from 'react';
import { CreateJobSteps, ICreateJobValues } from 'pages/jobs/create/types';
import { useRouter } from 'next/router';
import { useNavigate } from 'common/utils/router-fill';
import CreateSnapshot from 'pages/jobs/create/lever/CreateSnapshot/CreateSnapshot';
import ReviewJob from 'pages/jobs/review';
import CreateJobForm from '../../create/CreateJobForm';

const EditJobDesktop = ({ isDesktopView, data }: { isDesktopView: boolean, data: ICreateJobValues }) => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(CreateJobSteps.CREATE_JOB);
  const [values, setValues] = useState<ICreateJobValues>(data);
  const navigate = useNavigate();
  const totalSteps = 2;
  const submit = (e: ICreateJobValues) => {
    setValues({ ...e });
    setCurrentStep(isDesktopView ? CreateJobSteps.CREATE_SNAPSHOT : CreateJobSteps.CREATE_JOB_MOBILE);
  };

  const submitSnapshot = (e: ICreateJobValues) => {
    setValues({ ...values, ...e });
    setCurrentStep(isDesktopView ? CreateJobSteps.REVIEW_JOB : CreateJobSteps.CREATE_SNAPSHOT_MOBILE);
  };
  const goBack = () => {
    const stepDifference = isDesktopView ? 1 : 0.5;
    if (currentStep > 1) {
      setCurrentStep(currentStep - stepDifference);
    } else {
      navigate('/workspace');
    }
  };
  const backToEdit = () => {
    const stepDifference = isDesktopView ? 1 : 0.5;
    if (currentStep > 1) {
      setCurrentStep(currentStep - stepDifference);
    } else {
      navigate('/workspace');
    }
  };

  if (!data) {
    return null;
  }
  if (currentStep === CreateJobSteps.REVIEW_JOB) {
    return (
      <ReviewJob
        values={values}
        back={() => setCurrentStep(CreateJobSteps.CREATE_SNAPSHOT)}
        isEdit
      />
    );
  }
  if (currentStep === CreateJobSteps.CREATE_SNAPSHOT || currentStep === CreateJobSteps.CREATE_SNAPSHOT_MOBILE) {
    return (
      <CreateSnapshot
        totalSteps={totalSteps}
        currentStep={currentStep}
        goBack={goBack}
        showStepper={currentStep !== CreateJobSteps.CREATE_SNAPSHOT_MOBILE}
        submit={submitSnapshot}
        cancel={goBack}
        values={values}
        setValues={setValues}
        next={() => setCurrentStep(CreateJobSteps.REVIEW_JOB)}
        backToEdit={backToEdit}
        isMobileView={!isDesktopView}
        isEdit
      />
    );
  }
  return (
    <div>
      <CreateJobForm
        values={values}
        cancel={() => router.back()}
        submit={submit}
        totalSteps={totalSteps}
        currentStep={currentStep}
        showStepper={currentStep !== CreateJobSteps.CREATE_JOB_MOBILE}
        next={() => setCurrentStep(CreateJobSteps.CREATE_SNAPSHOT)}
        backToEdit={backToEdit}
        goBack={goBack}
        isMobileView={!isDesktopView}
        isEdit
      />
    </div>
  );
};

export default EditJobDesktop;
