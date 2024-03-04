import React, { useEffect } from 'react';
import { ModalContentForm, ModalContentWrapper } from 'components/Modal/style';
import { FieldError, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import lang from 'common/lang';
import MultiInput from 'components/Atoms/MultiInput';
import SelectInput from 'components/Select/Select';
import { roleTypeOptions, totalPeopleManagedOptions, locationTypeOptions } from 'pages/pro/components/WorkExperience/const';
import { MyOptionType } from 'components/Select/types';
import ButtonComp from 'components/buttonComp';
import { SaveButton } from 'pages/pro/styles';
import { DividerComp } from 'components/Divider/styles';
import { LocationAutoComplete } from 'components/Atoms/LocationAutocomplete';
import {
  ModalHeading,
  ModalContent,
  BasicSalaryContainer,
  AddMoreContainer,
  AddMoreHeading,
  AddMoreContent,
  ButtonWrapper,
  DaysContainer,
} from './style';
import { WhatWillYouDoPopupProps, IWhatWillYouDoValues } from './type';
import { minimumOfficeDaysPerWeekOptions, officeDaysPerWeekOptions, regionsOptions } from './const';
import { whatWillYouDoSchema } from './schema';

const {
  jobs: {
    createJobSteps: {
      details: { skillPopup, whatWillYouDoPopup },
    },
    salaryRangeInvalid,
    officeDaysPerWeeks,
  },
  profile: {
    block: {
      workExperience: {
        form: { roleType },
      },
    },
  },
} = lang;
const WhatWillYouDoModal = ({ data, onClose, save }: WhatWillYouDoPopupProps) => {
  const {
    formState: { errors, isValid, isDirty },
    setValue,
    watch,
    handleSubmit,
    setError,
    clearErrors,
    getValues,
  } = useForm<IWhatWillYouDoValues>({
    resolver: yupResolver(whatWillYouDoSchema),
    mode: 'onChange',
    defaultValues: data || {},
  });

  const maximumDays = watch('maximumDays');
  const minimumDays = watch('minimumDays');
  const roleTypeValue = watch('roleType');
  const totalPeopleManagedValue = getValues('range');
  useEffect(() => {
    if (Number(maximumDays?.value) <= Number(minimumDays?.value)) {
      setError('maximumDays', { message: salaryRangeInvalid, type: 'max' });
      return;
    }
    clearErrors('maximumDays');
  }, [clearErrors, maximumDays, minimumDays, setError]);

  useEffect(() => {
    if (roleTypeValue?.value !== roleType.peopleManager) {
      setValue('range', null, { shouldValidate: true });
    }
  }, [roleTypeValue]);
  const disabledButton = !isValid
    || !!Object.keys(errors)?.length
    || (!data && !isDirty)
    || !watch('addMore')?.[0]
    || (roleTypeValue?.value === roleType.peopleManager
      && !totalPeopleManagedValue?.value)
      || (watch('workStyle')?.label === 'Hybrid' && !watch('officeDaysPerWeekType')?.value)
      || (watch('officeDaysPerWeekType')?.label === officeDaysPerWeeks.setOfficeDaysPerWeek && !watch('minimumDays')?.value);
  const handleWorkStyleChange = (selected: MyOptionType | null) => {
    if (watch('workStyle')?.label === 'Remote' || selected?.label === 'Remote') {
      setValue('location', null);
    }
    setValue('workStyle', selected, {
      shouldValidate: true,
      shouldDirty: true,
    });
    if (selected?.label !== 'Hybrid') {
      setValue('minimumDays', null);
      setValue('maximumDays', null);
      setValue('officeDaysPerWeekType', null);
    }
  };
  return (
    <ModalContentWrapper>
      <ModalContentForm width={670} onSubmit={handleSubmit(save)}>
        <ModalHeading>{whatWillYouDoPopup.title}</ModalHeading>
        <ModalContent>{whatWillYouDoPopup.subtitle}</ModalContent>
        <SelectInput
          options={roleTypeOptions}
          labelText={whatWillYouDoPopup.roleType.label}
          id="roleType"
          placeHolder={whatWillYouDoPopup.roleType.placeholder}
          onChange={(selected: MyOptionType | null) => setValue('roleType', selected, {
            shouldValidate: true,
            shouldDirty: true,
          })}
          data-cy="roleType"
          error={errors.roleType as FieldError}
        />
        {watch('roleType')?.value === roleType.peopleManager && (
          <BasicSalaryContainer>
            <AddMoreHeading>{whatWillYouDoPopup.range.label}</AddMoreHeading>
            <AddMoreContent>{whatWillYouDoPopup.range.subLabel}</AddMoreContent>
            <SelectInput
              options={totalPeopleManagedOptions}
              labelText=""
              id="range"
              placeHolder={whatWillYouDoPopup.range.placeholder}
              value={watch('range')?.value}
              data-cy="totalPeopleManagedInput"
              onChange={(selected: MyOptionType | null) => setValue('range', selected, {
                shouldValidate: true,
                shouldDirty: true,
              })}
            />
          </BasicSalaryContainer>
        )}
        <DividerComp />
        <SelectInput
          options={locationTypeOptions}
          labelText={whatWillYouDoPopup.workStyle.label}
          id="workStyle"
          placeHolder={whatWillYouDoPopup.workStyle.placeholder}
          value={watch('workStyle')?.value}
          data-cy="workStyle"
          onChange={handleWorkStyleChange}
        />
        {watch('workStyle')?.value === 'Remote' ? (
          <BasicSalaryContainer>
            <AddMoreHeading>{whatWillYouDoPopup.regions.label}</AddMoreHeading>
            <AddMoreContent>{whatWillYouDoPopup.regions.subLabel}</AddMoreContent>
            <SelectInput
              options={regionsOptions as unknown as MyOptionType[]}
              labelText=""
              id="regions"
              placeHolder={whatWillYouDoPopup.regions.placeholder}
              data-cy="regions"
              onChange={(selected: MyOptionType | null) => setValue('location', selected, {
                shouldValidate: true,
                shouldDirty: true,
              })}
              value={watch('location')?.value}
              error={errors.location as FieldError}
            />
          </BasicSalaryContainer>
        ) : (
          <>
            <LocationAutoComplete
              onChange={(selected: MyOptionType | null) => setValue('location', selected, {
                shouldValidate: true,
                shouldDirty: true,
              })}
              label={whatWillYouDoPopup.location.label}
              placeholder={whatWillYouDoPopup.location.placeholder}
              value={watch('location')}
            />
            {watch('workStyle')?.value !== 'On-site'
            && (
              <>
                <BasicSalaryContainer>
                  <AddMoreHeading>{whatWillYouDoPopup.officeDaysPerWeekType.label}</AddMoreHeading>
                  <AddMoreContent>{whatWillYouDoPopup.officeDaysPerWeekType.subLabel}</AddMoreContent>
                  <SelectInput
                    options={officeDaysPerWeekOptions}
                    labelText=""
                    id="officeDaysPerWeekType"
                    placeHolder={whatWillYouDoPopup.officeDaysPerWeekType.placeholder}
                    value={watch('officeDaysPerWeekType')?.value}
                    data-cy="officeDaysPerWeekType"
                    onChange={(selected: MyOptionType | null) => {
                      setValue('officeDaysPerWeekType', selected, {
                        shouldValidate: true,
                        shouldDirty: true,
                      });
                      if (selected?.label !== 'Set office days per week') {
                        setValue('minimumDays', null);
                        setValue('maximumDays', null);
                      }
                    }}
                    error={errors.officeDaysPerWeekType as FieldError}
                  />
                </BasicSalaryContainer>
                {watch('officeDaysPerWeekType')?.value === 'Set office days per week'
            && (
              <DaysContainer>
                <SelectInput
                  options={minimumOfficeDaysPerWeekOptions}
                  labelText={whatWillYouDoPopup.minimumDays.label}
                  id="minimumDays"
                  placeHolder={whatWillYouDoPopup.minimumDays.placeholder}
                  value={watch('minimumDays')?.value}
                  data-cy="minimumDays"
                  onChange={(selected: MyOptionType | null) => setValue('minimumDays', selected, {
                    shouldDirty: true,
                    shouldValidate: true,
                  })}
                  error={errors.minimumDays as FieldError}
                />
                <SelectInput
                  options={minimumOfficeDaysPerWeekOptions}
                  labelText=""
                  id="maximumDays"
                  placeHolder={whatWillYouDoPopup.maximumDays.placeholder}
                  value={watch('maximumDays')?.value}
                  data-cy="maximumDays"
                  onChange={(selected: MyOptionType | null) => setValue('maximumDays', selected, {
                    shouldDirty: true,
                    shouldValidate: Number(watch('minimumDays.value')) < Number(selected?.value),
                  })}
                  error={errors.maximumDays as FieldError}
                />
              </DaysContainer>
            )}
              </>
            )}
          </>
        )}
        <DividerComp />
        <AddMoreContainer>
          <AddMoreHeading>{whatWillYouDoPopup.addMore.label}</AddMoreHeading>
          <AddMoreContent>{whatWillYouDoPopup.addMore.subLabel}</AddMoreContent>
          <MultiInput
            inputs={watch('addMore') || []}
            onChange={(inputsToUpdate) => {
              setValue('addMore', inputsToUpdate, {
                shouldValidate: false,
                shouldDirty: true,
              });
            }}
            inputPlaceholder={whatWillYouDoPopup.addMore.placeholder}
            error={errors.addMore as FieldError}
            buttonText={whatWillYouDoPopup.addMore.buttonText}
          />
        </AddMoreContainer>
        <DividerComp />
        <ButtonWrapper>
          <ButtonComp
            label={skillPopup.cancel}
            variant="link"
            onClick={onClose}
            data-cy="close"
          />
          <SaveButton
            label={skillPopup.save}
            disabled={!!disabledButton}
            primary
            type="submit"
            data-cy="submit"
          />
        </ButtonWrapper>
      </ModalContentForm>
    </ModalContentWrapper>
  );
};

export default WhatWillYouDoModal;
