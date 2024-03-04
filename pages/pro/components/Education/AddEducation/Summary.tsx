import ButtonComp from 'components/buttonComp';
import lang from 'common/lang';
import { Buttons, DateField, SaveButton } from 'components/Atoms/ResumeFormButtonsContainer/styles';
import WordCounter from 'components/WordCounter/WordCounter';
import SimpleInput from 'components/input/SimpleInput';
import { Controller, useForm } from 'react-hook-form';
import Divider from 'components/Divider/Divider';
import { InputType } from 'components/inputComp/types';
import { useCallback, useEffect, useMemo } from 'react';
import DatePickerComp from 'components/DatePicker';
import CheckBox from 'components/input/CheckBox';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCompanies } from 'common/hooks/useCompanies';
import { universityOrgType } from 'pages/organization/create/const';
import AsyncCreatableSelectInput from 'components/Select/AsyncCreatable';
import { MyOptionType } from 'components/Select/types';
import { FieldWrapper } from './styles';
import { IEducationFormFields, SummaryProps, schema } from './types';

const { fields } = lang.profile.education;
const { cancel, next } = lang.buttonText;
const maxCharacters = 100;
const defaultValues = {
  institutionName: null,
  educationType: '',
  fieldOfStudy: '',
  grade: '',
  startDate: '',
  ongoing: false,
};

const Summary = ({
  closeForm, handleNext, data, setIsEducationDirty,
}: SummaryProps) => {
  const {
    setError,
    register,
    watch,
    clearErrors,
    handleSubmit,
    setValue,
    control,
    getValues,
    formState: { errors, isValid, isDirty },
  } = useForm<IEducationFormFields>({
    resolver: yupResolver(schema),
    defaultValues: { ...data, ongoing: !!data?.startDate && !data?.endDate } || defaultValues,
  });
  const watchStartDate = watch('startDate');
  const ongoingFieldValue = getValues('ongoing');
  const handleFieldUpdate = useCallback((name: string, value: string) => {
    if (value.length > maxCharacters) {
      setError(name as keyof IEducationFormFields, {
        type: 'maxLength',
        message: 'Max length exceeded',
      });
      return;
    }
    clearErrors(name as keyof IEducationFormFields);
    setValue(name as keyof IEducationFormFields, value, { shouldValidate: true, shouldDirty: true });
  }, [
    setValue, setError, clearErrors,
  ]);
  const fieldValue = {
    institutionName: watch('institutionName'),
    fieldOfStudy: watch('fieldOfStudy'),
    startDate: watchStartDate,
    ongoing: watch('ongoing'),
    educationType: watch('educationType'),
    grade: watch('grade'),
  };
  useEffect(() => {
    if (ongoingFieldValue) {
      setValue('endDate', '', { shouldValidate: true });
    }
  }, [ongoingFieldValue, setValue]);
  const disabledButton = useMemo(() => {
    return (
      (!isValid || !!Object.keys(errors)?.length)
      || (!data && !isDirty)
    );
  }, [data, errors, isDirty, isValid]);
  useEffect(() => {
    if (isDirty) {
      setIsEducationDirty(true);
    }
  }, [isDirty, setIsEducationDirty]);
  const { loadAsyncOption } = useCompanies(universityOrgType);
  return (
    <form onSubmit={handleSubmit(handleNext)}>
      <FieldWrapper>
        <AsyncCreatableSelectInput
          loadAsyncOption={loadAsyncOption}
          value={watch('institutionName')}
          labelText={fields.institutionName.label}
          onCreateOption={(option) => {
            setValue('institutionName', { value: '', label: option }, {
              shouldValidate: true,
              shouldDirty: true,
            });
          }}
          id="institutionName"
          placeHolder={fields.institutionName.placeholder}
          data-cy="institutionNameInput"
          onChange={(selected: MyOptionType | null) => setValue('institutionName', selected, {
            shouldValidate: true,
            shouldDirty: true,
          })}
        />
      </FieldWrapper>
      <FieldWrapper>
        <SimpleInput
          labelText={fields.educationType.label}
          type={InputType.TEXT}
          id="educationType"
          placeholder={fields.educationType.placeholder}
          value={fieldValue.educationType}
          onChange={(e) => handleFieldUpdate('educationType', e.target.value)}
          error={errors.educationType}
        />
        <WordCounter error={!!errors.educationType} count={fieldValue.educationType?.length} total={maxCharacters} />
      </FieldWrapper>
      <FieldWrapper>
        <SimpleInput
          labelText={fields.fieldOfStudy.label}
          type={InputType.TEXT}
          id="fieldOfStudy"
          placeholder={fields.fieldOfStudy.placeholder}
          value={fieldValue.fieldOfStudy}
          onChange={(e) => handleFieldUpdate('fieldOfStudy', e.target.value)}
          error={errors.fieldOfStudy}
        />
        <WordCounter error={!!errors.fieldOfStudy} count={fieldValue.fieldOfStudy?.length} total={maxCharacters} />
      </FieldWrapper>
      <DateField>
        <div>
          <Controller
            name="startDate"
            control={control}
            render={({ field }) => (
              <DatePickerComp
                onChange={field.onChange}
                selected={field.value}
                label={fields.startDate.label}
                id="startDate"
                placeholder={fields.startDate.placeholder}
                placement="top"
                cypressLocator="project-start-date"
              />
            )}
          />
        </div>

        <Controller
          name="endDate"
          control={control}
          render={({ field }) => (
            <DatePickerComp
              onChange={field.onChange}
              selected={field.value}
              label={fields.endDate.label}
              id="endDate"
              minDate={fieldValue.startDate}
              isDisabled={fieldValue.ongoing}
              placeholder={watch('ongoing') ? fields.endDate.now : fields.endDate.placeholder}
              placement="top"
              cypressLocator="project-end-date"
            />
          )}
        />

      </DateField>
      <div style={{ position: 'relative' }}>
        <CheckBox
          label={fields.onGoing.label}
          id="ongoing"
          register={register}
        />

      </div>
      <FieldWrapper>
        <SimpleInput
          labelText={fields.grade.label}
          type={InputType.TEXT}
          id="grade"
          placeholder={fields.grade.placeholder}
          value={fieldValue.grade}
          onChange={(e) => handleFieldUpdate('grade', e.target.value)}
          error={errors.grade}
        />
      </FieldWrapper>
      <Divider />
      <Buttons>
        <ButtonComp label={cancel} onClick={closeForm} variant="link" />
        <SaveButton label={next} type="submit" primary disabled={disabledButton} />
      </Buttons>
    </form>
  );
};

export default Summary;
