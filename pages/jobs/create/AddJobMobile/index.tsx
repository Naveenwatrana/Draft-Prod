import { initialJobValues } from 'pages/jobs/constants';
import { useNavigate } from 'common/utils/router-fill';
import ReviewJob from 'pages/jobs/review';
import { useState } from 'react';
import CreateSnapshot from 'pages/jobs/create/lever/CreateSnapshot/CreateSnapshot';
import CreateJobStep1Preview from 'pages/jobs/components/CreateJobStep1Preview';
import CreateJobStep2Preview from 'pages/jobs/components/CreateJobStep2Preview';
import { CreateJobSteps, ICreateJobValues } from '../types';
import CreateJobForm from '../CreateJobForm';

const AddJobMobile = () => {
  const totalSteps = 2;
  const [currentStep, setCurrentStep] = useState(CreateJobSteps.CREATE_JOB);
  const [values, setValues] = useState<ICreateJobValues>(initialJobValues);
  const navigate = useNavigate();

  const backToEdit = () => {
    const stepDifference = 0.5;
    if (currentStep > 1) {
      setCurrentStep(currentStep - stepDifference);
    } else {
      navigate('/workspace');
    }
  };
  const goBack = () => {
    const stepDifference = 0.5;
    if (currentStep > 1) {
      setCurrentStep(currentStep - stepDifference);
    } else {
      navigate('/workspace');
    }
  };
  const submit = (e: ICreateJobValues) => {
    setValues({ ...e });
    setCurrentStep(CreateJobSteps.CREATE_JOB_MOBILE);
  };
  const submitSnapshot = (e: ICreateJobValues) => {
    setValues({ ...values, ...e });
    setCurrentStep(CreateJobSteps.CREATE_SNAPSHOT_MOBILE);
  };
  const goToNextStep = (step: CreateJobSteps) => {
    setCurrentStep(step);
  };
  switch (currentStep) {
    case CreateJobSteps.REVIEW_JOB:
      return <ReviewJob back={backToEdit} values={values} />;
    case CreateJobSteps.CREATE_SNAPSHOT:
      return (
        <CreateSnapshot
          totalSteps={totalSteps}
          currentStep={currentStep}
          goBack={goBack}
          showStepper={true}
          submit={submitSnapshot}
          cancel={goBack}
          setValues={setValues}
          values={values}
          next={goToNextStep}
          backToEdit={backToEdit}
          isMobileView={true}
        />
      );
    case CreateJobSteps.CREATE_SNAPSHOT_MOBILE:
      return (
        <CreateJobStep2Preview
          cancel={goBack}
          submit={submit}
          values={values}
          totalSteps={totalSteps}
          currentStep={currentStep}
          goBack={goBack}
          showStepper={false}
          next={goToNextStep}
          backToEdit={backToEdit}
          isMobileView={true}
          isEdit={false}
        />
      );
    case CreateJobSteps.CREATE_JOB_MOBILE:
      return (
        <CreateJobStep1Preview
          cancel={goBack}
          submit={submit}
          values={values}
          totalSteps={totalSteps}
          currentStep={currentStep}
          goBack={goBack}
          showStepper={false}
          next={goToNextStep}
          backToEdit={backToEdit}
          isMobileView={true}
          isEdit={false}
        />
      );
    default:
      return (
        <CreateJobForm
          cancel={goBack}
          submit={submit}
          values={values}
          totalSteps={totalSteps}
          currentStep={currentStep}
          goBack={goBack}
          showStepper={true}
          next={goToNextStep}
          backToEdit={backToEdit}
          isMobileView={true}
          isEdit={false}
        />
      );
  }
};

export default AddJobMobile;
