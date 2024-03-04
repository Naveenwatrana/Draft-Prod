import lang from 'common/lang';
import SelectInput from 'components/Select/Select';
import { MyOptionType } from 'components/Select/types';
import InputWordCount from 'components/inputComp/InputWordCount';
import React, { useEffect } from 'react';
import { formatDate } from 'common/utils/date/dateFormat';
import { dateFormatYMD } from 'common/constants';
import DatePickerComp from 'components/DatePicker';
import {
  useForm,
} from 'react-hook-form';
import CheckBox from 'components/input/CheckBox';
import { yupResolver } from '@hookform/resolvers/yup';
import Divider from 'components/Divider/Divider';
import ButtonComp from 'components/buttonComp';
import { useCompanies } from 'common/hooks/useCompanies';
import AsyncSelectInput from 'components/Select/AsyncSelect';
import { useFunctionalRoles } from 'common/hooks/useFunctionalRoles';
import AsyncCreatableSelectInput from 'components/Select/AsyncCreatable';
import { LocationAutoComplete } from 'components/Atoms/LocationAutocomplete';
import { companyOrgType } from 'pages/organization/create/const';
import {
  Buttons, DateField, OngoingProject, SaveButton,
} from './styles';
import {
  employmentTypeOptions,
  locationTypeOptions,
  roleTypeOptions,
  totalPeopleManagedOptions,
} from './const';
import { maxRoleTitleCharacters } from '../Projects/constant';
import { IExperienceSummaryValues, summarySchema } from './type';
const {
  profile: {
    cancel, next,
    block: {
      workExperience: {
        form: {
          role,
          functionalRole,
          organisationName,
          location,
          employmentType,
          locationType,
          roleType,
          totalPeopleManaged,
          date,
        },
      },
    },
  },
} = lang;

type SummaryProps = {
  save: (formData: IExperienceSummaryValues) => void;
  cancelEdit: () => void;
  validated: boolean;
  data?: IExperienceSummaryValues | null,
  isExperienceDirty: boolean,
  setIsExperienceDirty: React.Dispatch<React.SetStateAction<boolean>>,
};
const Summary = ({
  save, cancelEdit, data, validated, isExperienceDirty, setIsExperienceDirty,
}: SummaryProps) => {
  const {
    register,
    formState: { isValid, isDirty },
    setValue,
    watch,
    reset,
    getValues,
    handleSubmit,
  } = useForm<IExperienceSummaryValues>({
    resolver: yupResolver(summarySchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: data || {},
  });
  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [data, reset]);

  const { loadAsyncOption } = useCompanies(companyOrgType);
  const ongoingFieldValue = getValues('ongoing');
  const roleTypeValue = getValues('roleType');
  const { loadAsyncOption: loadAsyncFunctionalRoles } = useFunctionalRoles();
  useEffect(() => {
    if (ongoingFieldValue) {
      setValue('endDate', '', { shouldValidate: true });
    }
  }, [ongoingFieldValue]);

  useEffect(() => {
    if (roleTypeValue?.value !== roleType.peopleManager) {
      setValue('totalPeopleManaged', null, { shouldValidate: true });
    }
  }, [roleTypeValue]);

  useEffect(() => {
    if (isDirty) {
      setIsExperienceDirty(true);
    }
  }, [isDirty, setIsExperienceDirty]);
  return (
    <form onSubmit={handleSubmit(save)}>
      <Divider />
      <InputWordCount
        value={watch('roleTitle')}
        setValue={(e) => setValue('roleTitle', e, {
          shouldValidate: true,
          shouldDirty: true,
        })}
        maxCharacters={maxRoleTitleCharacters}
        data-cy="roleTitle"
        placeholder={role.placeholder}
        label={role.label}
      />
      <AsyncSelectInput
        loadAsyncOption={loadAsyncFunctionalRoles}
        labelText={functionalRole.label}
        id="functionalRole"
        placeHolder={functionalRole.placeholder}
        value={watch('functionalRole')}
        data-cy="functionalRoleInput"
        onChange={(selected: MyOptionType | null) => setValue('functionalRole', selected, {
          shouldValidate: true,
          shouldDirty: true,
        })}
      />
      <AsyncCreatableSelectInput
        loadAsyncOption={loadAsyncOption}
        value={watch('organisationName')}
        labelText={organisationName.label}
        onCreateOption={(option) => {
          setValue('organisationName', { value: '', label: option }, {
            shouldValidate: true,
            shouldDirty: true,
          });
        }}
        id="organisationName"
        placeHolder={organisationName.placeholder}
        data-cy="organisationNameInput"
        onChange={(selected: MyOptionType | null) => setValue('organisationName', selected, {
          shouldValidate: true,
          shouldDirty: true,
        })}
      />
      <SelectInput
        options={employmentTypeOptions}
        labelText={employmentType.label}
        id="employmentType"
        placeHolder={employmentType.placeholder}
        value={watch('employmentType')?.value}
        data-cy="employmentTypeInput"
        onChange={(selected: MyOptionType | null) => setValue('employmentType', selected, {
          shouldValidate: true,
          shouldDirty: true,
        })}
      />
      <LocationAutoComplete
        onChange={(selected: MyOptionType | null) => selected && setValue('location', { value: selected.value, label: selected.label }, { shouldValidate: true, shouldDirty: true })}
        label={location.label}
        placeholder={location.placeholder}
        value={watch('location')}
      />
      <SelectInput
        options={locationTypeOptions}
        labelText={locationType.label}
        id="locationType"
        placeHolder={locationType.placeholder}
        value={watch('locationType')?.value}
        data-cy="locationTypeInput"
        onChange={(selected: MyOptionType | null) => setValue('locationType', selected, {
          shouldValidate: true,
          shouldDirty: true,
        })}
      />
      <SelectInput
        options={roleTypeOptions}
        labelText={roleType.label}
        id="roleType"
        placeHolder={roleType.placeholder}
        value={watch('roleType')?.value}
        data-cy="roleTypeInput"
        onChange={(selected: MyOptionType | null) => setValue('roleType', selected, {
          shouldValidate: true,
          shouldDirty: true,
        })}
      />
      {watch('roleType')?.value === roleType.peopleManager && (
        <SelectInput
          options={totalPeopleManagedOptions}
          labelText={totalPeopleManaged.label}
          id="totalPeopleManaged"
          placeHolder={totalPeopleManaged.placeholder}
          value={watch('totalPeopleManaged')?.value}
          data-cy="totalPeopleManagedInput"
          onChange={(selected: MyOptionType | null) => setValue('totalPeopleManaged', selected, {
            shouldValidate: true,
            shouldDirty: true,
          })}
        />
      )}
      <DateField>
        <DatePickerComp
          label={date.startDate}
          placeholder={date.startDate}
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
          label={date.endDate}
          placeholder={watch('ongoing') ? date.now : date.endDate}
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
          label={date.ongoing}
          id="ongoing"
          register={register}
          data-cy="projectOngoing"
        />
      </OngoingProject>
      <Divider />
      <Buttons>
        <ButtonComp
          label={cancel}
          onClick={cancelEdit}
          variant="link"
          primary
          data-cy="cancel"
        />
        <SaveButton
          label={next}
          type="submit"
          disabled={!isValid}
          primary
          data-cy="next"
        />
      </Buttons>
    </form>
  );
};

export default Summary;
