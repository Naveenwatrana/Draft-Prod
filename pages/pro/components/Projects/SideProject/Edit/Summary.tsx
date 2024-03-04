import React, { useEffect, useMemo } from 'react';
import lang from 'common/lang';
import InputWordCount from 'components/inputComp/InputWordCount';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import InputComp from 'components/inputComp';
import { InputType } from 'components/inputComp/types';
import Divider from 'components/Divider/Divider';
import { useExperiences } from 'common/hooks/useExperiences';
import AsyncSelectInput from 'components/Select/AsyncSelect';
import Description from 'components/Atoms/InfoBlock/Description';
import { Buttons, DateField, SaveButton } from 'components/Atoms/ResumeFormButtonsContainer/styles';
import DatePickerComp from 'components/DatePicker';
import { formatDate } from 'common/utils/date/dateFormat';
import { dateFormatYMD } from 'common/constants';
import CheckBox from 'components/input/CheckBox';
import ButtonComp from 'components/buttonComp';
import { MyOptionType } from 'components/Select/types';
import { IOption } from 'components/MultipleInputTextArea/types';
import {
  OngoingProject,
} from './style';
import { ISummaryProjectValues, SummaryProps, summarySchema } from './types';
import { maxRoleTitleCharacters } from '../../constant';
import { ITagResponse } from '../../types';
const {
  projects: {
    form: { projectName, role, associatedWith },
    now, endDate, startDate, ongoingProjects,
  }, profile,
} = lang;
const Summary = ({
  save, cancelEdit, data, setIsProjectDirty,
}: SummaryProps) => {
  const defaultValues = { ...data };
  if (!defaultValues.associatedWith?.label) delete defaultValues.associatedWith;
  const {
    register,
    formState: { isValid, isDirty, errors },
    setValue,
    watch,
    handleSubmit,
    getValues,
  } = useForm<ISummaryProjectValues>({
    resolver: yupResolver(summarySchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues,
  });
  const ongoingFieldValue = getValues('ongoing');
  useEffect(() => {
    if (ongoingFieldValue) {
      setValue('endDate', '', { shouldValidate: true });
    }
  }, [ongoingFieldValue, setValue]);
  const { loadAsyncOption } = useExperiences();
  const disabledButton = useMemo(() => {
    return (
      (!isValid || !!Object.keys(errors)?.length)
      || (!data && !isDirty)
    );
  }, [data, errors, isDirty, isValid]);
  useEffect(() => {
    if (isDirty) {
      setIsProjectDirty(true);
    }
  }, [isDirty, setIsProjectDirty]);
  return (
    <form onSubmit={handleSubmit(save)}>
      <Divider />
      <InputWordCount
        value={watch('projectName')}
        setValue={(e) => setValue('projectName', e, {
          shouldValidate: true,
          shouldDirty: true,
        })}
        maxCharacters={maxRoleTitleCharacters}
        data-cy="title"
        placeholder={projectName.placeholder}
        label={projectName.label}
      />
      <InputComp
        type={InputType.TEXT}
        labelText={role.label}
        id="role"
        onChange={(e) => setValue('role', e.target.value, {
          shouldValidate: true,
          shouldDirty: true,
        })}
        placeholder={role.placeholder}
        register={register}
        error={errors?.role}
        data-cy="basicDetailFirstNameInput"
      />
      <AsyncSelectInput
        loadAsyncOption={loadAsyncOption}
        value={watch('associatedWith')}
        labelText={associatedWith.label}
        id="associatedWith"
        placeHolder={associatedWith.placeholder}
        data-cy="associatedWithInput"
        onChange={(selected: MyOptionType | null) => {
          setValue('associatedWith', selected ? selected as IOption & { tags: ITagResponse[] } : undefined, {
            shouldValidate: true,
            shouldDirty: true,
          });
        }}
      />
      <Description content={associatedWith.subTitle} />
      <Divider />
      <DateField>
        <DatePickerComp
          label={startDate}
          placeholder={startDate}
          id="startDate"
          maxDate={
            watch('endDate') || formatDate(new Date().toString(), dateFormatYMD)
          }
          onChange={(e) => setValue('startDate', `${e}`, {
            shouldValidate: true,
            shouldDirty: true,
          })}
          selected={watch('startDate')}
          cypressLocator="resume-start-date"
        />
        <DatePickerComp
          isDisabled={watch('ongoing')}
          label={endDate}
          placeholder={watch('ongoing') ? now : endDate}
          id="endDate"
          minDate={watch('startDate')}
          onChange={(e) => setValue('endDate', `${e}`, {
            shouldValidate: true,
            shouldDirty: true,
          })}
          selected={watch('endDate')}
          cypressLocator="resume-end-date"
        />
      </DateField>
      <OngoingProject>
        <CheckBox
          label={ongoingProjects}
          id="ongoing"
          register={register}
          data-cy="projectOngoing"
        />
      </OngoingProject>
      <Divider />
      <Buttons>
        <ButtonComp
          label={profile.cancel}
          onClick={cancelEdit}
          variant="link"
          primary
          data-cy="cancelEditProject"
        />
        <SaveButton
          label={profile.next}
          type="submit"
          disabled={disabledButton}
          primary
          data-cy="saveEditProject"
        />
      </Buttons>
    </form>
  );
};

export default Summary;
