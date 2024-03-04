import { useState } from 'react';
import { useNavigate } from 'common/utils/router-fill';
import CreateJobForm from 'pages/jobs/create/CreateJobForm';
import { initialJobValues } from 'pages/jobs/constants';
import ReviewJob from 'pages/jobs/review';
import CreateSnapshot from 'pages/jobs/create/lever/CreateSnapshot/CreateSnapshot';
import { CreateJobProps, CreateJobSteps, ICreateJobValues } from '../types';

const AddJobDesktop = ({ isMobileView }: CreateJobProps) => {
  const totalSteps = 2;
  const [currentStep, setCurrentStep] = useState(CreateJobSteps.CREATE_JOB);
  const [values, setValues] = useState<ICreateJobValues>(initialJobValues);
  const isDesktopView = !isMobileView;
  const navigate = useNavigate();
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
  const submit = (e: ICreateJobValues) => {
    setValues({ ...e });
    setCurrentStep(isDesktopView ? CreateJobSteps.CREATE_SNAPSHOT : CreateJobSteps.CREATE_JOB_MOBILE);
  };
  const submitSnapshot = (e: ICreateJobValues) => {
    setValues({ ...values, ...e });
    setCurrentStep(isDesktopView ? CreateJobSteps.REVIEW_JOB : CreateJobSteps.CREATE_SNAPSHOT_MOBILE);
  };
  const goToNextStep = (step: CreateJobSteps) => {
    setCurrentStep(step);
  };

  if (currentStep === CreateJobSteps.REVIEW_JOB) {
    return <ReviewJob back={backToEdit} values={values} />;
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
        setValues={setValues}
        values={values}
        next={goToNextStep}
        backToEdit={backToEdit}
        isMobileView={isMobileView}
      />
    );
  }
  return (
    <CreateJobForm
      cancel={goBack}
      submit={submit}
      values={values}
      totalSteps={totalSteps}
      currentStep={currentStep}
      goBack={goBack}
      showStepper={currentStep !== CreateJobSteps.CREATE_JOB_MOBILE}
      next={goToNextStep}
      backToEdit={backToEdit}
      isMobileView={isMobileView}
      isEdit={false}
    />
  );
};

export default AddJobDesktop;
