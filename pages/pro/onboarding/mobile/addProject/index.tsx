import { yupResolver } from '@hookform/resolvers/yup';
import { dateFormat } from 'common/constants';
import Loader from 'components/Loader/Loader';
import { formatDate } from 'common/utils/date/dateFormat';
import { useAddProjectMutation, useCompleteOnboardingMutation } from 'pages/pro/profileService';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import ProjectPreview from 'pages/pro/onboarding/mobile/previewImage/projectPreview';
import Project from 'pages/pro/onboarding/mobile/addProject/project';
import { schema } from 'pages/pro/onboarding/mobile/addProject/schema';
import {
  AddProjectProps,
  IAddProjectFormValues,
  IWatchProjectValues,
} from 'pages/pro/onboarding/mobile/addProject/types';
import { useAppDispatch } from 'common/hooks/state';
import { setUserProject } from '../onboardingSlice';

const AddProject = ({
  fullName,
  nextStep,
  setTitle,
  setSubtitle,
}: AddProjectProps) => {
  const [showPreview, setShowPreview] = useState(false);
  const [addProject, result] = useAddProjectMutation();
  const [completeOnboarding] = useCompleteOnboardingMutation();
  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    register,
    watch,
    getValues,
    reset,
    control,
    formState: { errors },
  } = useForm<IAddProjectFormValues>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<IAddProjectFormValues> = async (data) => {
    try {
      const payload = {
        project_or_company: data.title,
        ...(data.role ? { role: data.role } : {}),
        start_date: formatDate(data.startDate, dateFormat),
        ongoing: data.ongoing ? 1 : 0,
        end_date: data.ongoing ? null : formatDate(data.endDate, dateFormat),
      };
      await addProject(payload).unwrap();
      dispatch(
        setUserProject([
          {
            title: payload.project_or_company,
            role: payload.role,
            startDate: payload.start_date,
            endDate: payload.end_date,
            ongoing: payload.ongoing,
          },
        ]),
      );
      nextStep();
    } catch (e: any) {
      // TODO: handle error
    }
  };

  const handleSkip = async () => {
    reset();
    await completeOnboarding('').unwrap();
    nextStep();
  };

  const projectData: IWatchProjectValues = {
    title: getValues('title'),
    role: getValues('role'),
    startDate: getValues('startDate'),
    endDate: getValues('endDate'),
    ongoing: getValues('ongoing'),
  };

  const handleNext = () => {
    setShowPreview(!showPreview);
  };

  return (
    <>
      {result.isLoading && <Loader />}
      {showPreview && (
        <ProjectPreview
          fullName={fullName}
          project={projectData}
          setTitle={setTitle}
          setSubtitle={setSubtitle}
          handleBack={handleNext}
          handleSubmit={handleSubmit(onSubmit)}
        />
      )}
      {!showPreview && (
        <Project
          setTitle={setTitle}
          setSubtitle={setSubtitle}
          showPreview={handleNext}
          handleSkip={handleSkip}
          register={register}
          watch={watch}
          errors={errors}
          control={control}
        />
      )}
    </>
  );
};

export default AddProject;
