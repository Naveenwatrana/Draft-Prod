import InputComp from 'components/inputComp';
import ButtonComp from 'components/buttonComp';
import CheckBox from 'components/input/CheckBox';
import { InputType } from 'components/input/types';
import lang from 'common/lang';
import { Controller } from 'react-hook-form';
import { useEffect, useState } from 'react';
import SkipModal from 'pages/pro/onboarding/common/skipModal';
import { ProjectProps } from 'pages/pro/onboarding/mobile/addProject/types';
import DatePicker from 'components/DatePicker';
import {
  ButtonGroup, Disclaimer, Form, Ongoing, SkipButton,
} from '../styles';

const {
  onBoarding: { project },
  buttonText,
} = lang;

const Project = ({
  showPreview,
  handleSkip,
  setTitle,
  setSubtitle,
  register,
  watch,
  errors,
  control,
}: ProjectProps) => {
  const [showModal, setShowModal] = useState(false);

  const watchTitle = watch('title');
  const watchStartDate = watch('startDate');
  const watchEndDate = watch('endDate');

  const isButtonDisabled = () => {
    if (watch('ongoing')) {
      return !watchTitle || !watchStartDate;
    }
    return !watchTitle || !watchStartDate || !watchEndDate;
  };

  useEffect(() => {
    setTitle(project.title);
    setSubtitle(project.subtitle);
  }, []);

  return (
    <>
      <SkipModal
        show={showModal}
        handleShow={setShowModal}
        handleSkip={handleSkip}
        step="project"
      />
      <Disclaimer component="p">
        {project.disclaimer}
      </Disclaimer>
      <Form>
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
              placement="top"
              cypressLocator="project-start-date"
            />
          )}
        />

        <Ongoing>
          <CheckBox
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
              minDate={watchStartDate}
              isDisabled={watch('ongoing')}
              placeholder={project.endPlaceholder}
              placement="top"
              cypressLocator="project-end-date"
            />
          )}
        />
      </Form>
      <ButtonGroup>
        <ButtonComp
          label={buttonText.next}
          fullWidth
          primary
          disabled={isButtonDisabled()}
          onClick={showPreview}
          data-cy="skip-project"
        />
        <SkipButton
          label={buttonText.skip}
          fullWidth
          onClick={() => setShowModal(true)}
          data-cy="submit-project"
        />
      </ButtonGroup>
    </>
  );
};

export default Project;
