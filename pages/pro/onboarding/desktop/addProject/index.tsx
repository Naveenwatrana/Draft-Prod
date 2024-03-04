import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { InputType } from 'components/input/types';
import Loader from 'components/Loader/Loader';
import { useAddProjectMutation, useCompleteOnboardingMutation } from 'pages/pro/profileService';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import lang from 'common/lang';
import DatePicker from 'components/DatePicker';
import CheckBoxComp from 'components/inputComp/checkbox';
import InputComp from 'components/inputComp';
import { formatDate } from 'common/utils/date/dateFormat';
import { dateFormat } from 'common/constants';
import { AddProjectProps, IAddProjectFormValues, IWatchProjectValues } from 'pages/pro/onboarding/desktop/addProject/types';
import SkipModal from 'pages/pro/onboarding/common/skipModal';
import { schema } from 'pages/pro/onboarding/desktop/addProject/schema';
import { showNotification } from 'pages/pro/components/Projects/util';
import { NotificationType } from 'pages/pro/components/Projects/ViewProject/types';
import { ToastContainer } from 'react-toastify';
import MultipleInputTextArea from 'components/MultipleInputTextArea';
import { IOption } from 'components/MultipleInputTextArea/types';
import { TagsLoaderContainer } from 'components/Atoms/TagsLoaderComponent';
import { useTags } from 'common/hooks/useTags';
import {
  ButtonGroup, Disclaimer, Ongoing, ProjectForm, SkipButton, SubmitButton,
} from './styles';

const AddProject = ({ setProject, nextStep }: AddProjectProps) => {
  const [addProject, result] = useAddProjectMutation();
  const [completeOnboarding] = useCompleteOnboardingMutation();
  const [showModal, setShowModal] = useState(false);
  const { setInputValue, options, tagListResult } = useTags();
  const {
    onBoarding: { project },
    buttonText,
  } = lang;

  const {
    register,
    watch,
    reset,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<IAddProjectFormValues>({ resolver: yupResolver(schema) });
  const onSubmit: SubmitHandler<IAddProjectFormValues> = async (data) => {
    try {
      await addProject({
        project_or_company: data.title,
        ...(data.role ? { role: data.role } : {}),
        start_date: formatDate(data.startDate, dateFormat),
        ongoing: data.ongoing ? 1 : 0,
        end_date: data.ongoing ? null : formatDate(data.endDate, dateFormat),
        tag_ids: data.tags.map((tag) => tag.value),
      }).unwrap().then(nextStep).catch((error) => {
        showNotification(error?.data?.message, NotificationType.ERROR);
      });
    } catch (e: any) {
      // TODO: handle error
    }
  };

  const handleSkip = async () => {
    reset();
    await completeOnboarding('').unwrap();
    nextStep();
  };

  const watchProject: IWatchProjectValues = {
    title: watch('title'),
    role: watch('role'),
    startDate: watch('startDate'),
    endDate: watch('endDate'),
    ongoing: watch('ongoing'),
    tags: watch('tags'),
  };

  const isButtonDisabled = () => {
    if (watchProject.ongoing) {
      return !watchProject.title || !watchProject.startDate || !watchProject.tags?.length;
    }
    return (
      !watchProject.title || !watchProject.startDate || !watchProject.endDate || !watchProject.tags?.length
    );
  };

  const isEndDateDisabled = () => {
    if (watchProject.ongoing) {
      return true;
    }
    return !watchProject.startDate;
  };

  useEffect(() => {
    const {
      title, startDate, endDate, ongoing,
    } = watchProject;
    if (title || startDate || ongoing || endDate) {
      setProject(watchProject);
    }
    if (startDate && endDate && startDate > endDate) {
      reset({ ...watchProject, endDate: undefined });
    }
    if (endDate && ongoing) {
      reset({ ...watchProject, endDate: undefined });
    }
  }, [watchProject]);

  return (
    <>
      <ToastContainer
        position="top-center"
        hideProgressBar
        style={{
          width: '100%',
          maxWidth: '906px',
        }}
      />
      {result.isLoading && <Loader />}
      <SkipModal
        show={showModal}
        handleShow={setShowModal}
        handleSkip={handleSkip}
        step="project"
      />
      <Disclaimer component="p">
        {project.disclaimer}
      </Disclaimer>
      <ProjectForm
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <InputComp
          type={InputType.TEXT}
          labelText={project.titleLabel}
          id="title"
          placeholder={project.titlePlaceholder}
          register={register}
          error={errors.title}
          maxLength={100}
          data-cy="project-title"
        />
        <InputComp
          type={InputType.TEXT}
          labelText={project.roleLabel}
          id="role"
          placeholder={project.rolePlaceholder}
          register={register}
          error={errors.role}
          maxLength={50}
          data-cy="project-role"
        />
        <MultipleInputTextArea
          value={watchProject?.tags}
          onChange={(value: IOption[]) => setValue('tags', value)}
          onInputChange={setInputValue}
          placeholder={project.tagsPlaceholder}
          label={project.tagsPlaceholder}
          data-cy="searchTags"
          options={options}
          isLoading={tagListResult.isLoading}
        />
        <TagsLoaderContainer isLoading={tagListResult.isLoading}>
          {tagListResult.isLoading && <Loader fullScreen={false} />}
        </TagsLoaderContainer>
        <Controller
          name="startDate"
          control={control}
          render={({ field }) => (
            <DatePicker
              onChange={field.onChange}
              selected={field.value}
              label={project.startLabel}
              id="startDate"
              placeholder={project.startPlaceholder}
              placement="top-start"
              cypressLocator="project-start-date"
            />
          )}
        />
        <Ongoing>
          <CheckBoxComp
            label={project.checkLabel}
            id="ongoing"
            register={register}
          />
        </Ongoing>
        <Controller
          name="endDate"
          control={control}
          render={({ field }) => (
            <DatePicker
              onChange={field.onChange}
              selected={field.value}
              label={project.endLabel}
              id="endDate"
              minDate={watchProject.startDate}
              isDisabled={isEndDateDisabled()}
              placeholder={project.endPlaceholder}
              placement="top-start"
              cypressLocator="project-end-date"
            />
          )}
        />
        <ButtonGroup>
          <SkipButton
            label={buttonText.skip}
            onClick={() => setShowModal(true)}
            data-cy="skip-project"
          />
          <SubmitButton
            primary
            label={buttonText.next}
            type="submit"
            disabled={isButtonDisabled()}
            data-cy="submit-project"
          />
        </ButtonGroup>
      </ProjectForm>
    </>
  );
};

export default AddProject;
