import { useRouter } from 'next/router';
import { useState } from 'react';
import { useWindowDimensions } from 'common/hooks';
import CreateSnapshot from 'pages/jobs/create/lever/CreateSnapshot/CreateSnapshot';
import SelectJobLever from 'pages/jobs/create/lever/SelectJobLever/SelectJobLever';
import CreateJobForm from '../CreateJobForm';
import { CreateJobLeverSteps, ICreateJobValues } from '../types';
import ReviewJob from '../../review';

const SelectJob = () => {
  const totalSteps = 2;
  const [currentStep, setCurrentStep] = useState(CreateJobLeverSteps.SELECT_JOB);
  const [values, setValues] = useState<ICreateJobValues>({
    role: '',
    location: { value: '', label: '' },
    description: '',
    locationType: '',
    jobType: '',
    salaryFrom: null,
    salaryTo: null,
    jobPicture: undefined,
    snapShotPicture: undefined,
    snapshotDescription: '',
  });
  const router = useRouter();
  const goBack = () => {
    const stepDifference = isDesktopView ? 1 : 0.5;
    if (currentStep > 1) {
      setCurrentStep(currentStep - stepDifference);
    } else {
      router.push('/workspace');
    }
  };
  const backToEdit = () => {
    const stepDifference = isDesktopView ? 1 : 0.5;
    if (currentStep > 1) {
      setCurrentStep(currentStep - stepDifference);
    } else {
      router.push('/workspace');
    }
  };
  const { isDesktopView } = useWindowDimensions();
  const submit = (e: ICreateJobValues) => {
    setValues({ ...e });
    setCurrentStep(isDesktopView ? CreateJobLeverSteps.CREATE_SNAPSHOT : CreateJobLeverSteps.CREATE_JOB_MOBILE);
  };
  const submitSnapshot = (e: ICreateJobValues) => {
    setValues({ ...values, ...e });
    setCurrentStep(isDesktopView ? CreateJobLeverSteps.REVIEW_JOB : CreateJobLeverSteps.CREATE_SNAPSHOT_MOBILE);
  };
  const goToNextStep = (step: CreateJobLeverSteps) => {
    setCurrentStep(step);
  };
  const isReview = currentStep === CreateJobLeverSteps.REVIEW_JOB;
  const snapshotStep = currentStep === CreateJobLeverSteps.CREATE_SNAPSHOT || currentStep === CreateJobLeverSteps.CREATE_SNAPSHOT_MOBILE;

  if (isReview) {
    return <ReviewJob back={backToEdit} values={values} />;
  }
  if (snapshotStep) {
    return (
      <CreateSnapshot
        totalSteps={totalSteps}
        currentStep={currentStep}
        goBack={goBack}
        showStepper={currentStep !== CreateJobLeverSteps.CREATE_SNAPSHOT_MOBILE}
        submit={submitSnapshot}
        cancel={goBack}
        setValues={setValues}
        values={values}
        next={goToNextStep}
        backToEdit={backToEdit}
      />
    );
  }
  if (currentStep === CreateJobLeverSteps.CREATE_JOB || currentStep === CreateJobLeverSteps.CREATE_JOB_MOBILE) {
    return (
      <CreateJobForm
        cancel={goBack}
        submit={submit}
        values={values}
        totalSteps={totalSteps}
        currentStep={currentStep}
        goBack={goBack}
        showStepper={currentStep !== CreateJobLeverSteps.CREATE_JOB_MOBILE}
        next={goToNextStep}
        backToEdit={backToEdit}
      />
    );
  }
  return (
    <SelectJobLever next={(e) => setCurrentStep(e)} />
  );
};

export default SelectJob;
