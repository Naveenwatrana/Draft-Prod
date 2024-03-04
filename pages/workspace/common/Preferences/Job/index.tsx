import React, { useEffect, useMemo, useState } from 'react';
import TextComp from 'components/textComp';
import PriceInput from 'components/Atoms/PriceRange/PriceInput';
import { Buttons, ButtonsFixed } from 'components/buttonComp/style';
import ButtonComp from 'components/buttonComp';
import { FieldError, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import lang from 'common/lang';
import { useJobPreferencesMutation } from 'pages/jobs/jobsService';
import Loader from 'components/Loader/Loader';
import { showNotification } from 'pages/pro/components/Projects/util';
import { NotificationType } from 'pages/pro/components/Projects/ViewProject/types';
import { useIsMobile } from 'common/hooks/useIsMobile';
import SelectInput from 'components/Select/Select';
import { MyOptionType } from 'components/Select/types';
import { CancelableTagsContainer, DaysContainer } from 'pages/jobs/create/details/style';
import TagSelect from 'components/Atoms/TagSelect';
import AsyncSelectInput from 'components/Select/AsyncSelect';
import { useTags } from 'common/hooks/useTags';
import { LANGUAGES } from 'common/constants';
import { LocationAutoComplete } from 'components/Atoms/LocationAutocomplete';
import { minimumOfficeDaysPerWeekOptions, regionsOptions } from 'pages/jobs/create/details/const';
import { isFormFilled } from 'common/utils/helpers';
import { useFunctionalRoles } from 'common/hooks/useFunctionalRoles';
import {
  PreferenceChoiceSubTitle,
  PreferenceChoiceTitle,
  PreferenceContainer,
  PreferenceSubText,
  PreferencesContainer,
} from '../style';
import {
  IJobPreferenceValues, IndustryOptionType, PREFERENCE_OPTION_TYPE,
} from '../types';
import { jobPreferenceSchema } from '../schema';
import { formatJobPreferenceData, formatJobPreferencePayload, mapJoiningPreferenceOptions } from '../util';
import { JobPreferencesProps } from './type';
import { InputsContainer } from './style';
import IndustryAccordion from './IndustryAccordion';
const {
  preferences: {
    job: {
      title, salary, compensation, successfulMessage, joiningPreference, language, employmentType, location, region, workStyle, role, industries,
    },
  },
  jobs: {
    officeDaysPerWeeks,
    salaryRangeInvalid,
  },
  buttonText: { save },
} = lang;
const JobPreferences = ({ jobJoiningPreferenceOptions, jobPreferenceData, industryOptions }: JobPreferencesProps) => {
  const {
    handleSubmit,
    watch,
    setValue,
    setError,
    clearErrors,
    formState: { errors, isDirty },
  } = useForm<IJobPreferenceValues>({
    resolver: yupResolver(jobPreferenceSchema),
    mode: 'onChange',
    values: jobPreferenceData ? formatJobPreferenceData(jobPreferenceData, industryOptions) : undefined,
  });
  const isMobile = useIsMobile();
  const [setJobPreference, result] = useJobPreferencesMutation();
  const handleInputChange = (
    selectedVal: IJobPreferenceValues[keyof IJobPreferenceValues],
    type: keyof IJobPreferenceValues,
    shouldValidate = true,
  ) => setValue(type, selectedVal, {
    shouldValidate,
    shouldDirty: true,
  });
  const values = watch();
  const {
    employmentTypes,
    industryTypes,
    workStyles,
    maximumDays,
    minimumDays,
    languages: selectedLanguages,
    roles: selectedRoles,
    locations: selectedLocations,
    regions: selectedRegions,
    joiningPreference: joiningPreferenceOption,
  } = values;

  const onSubmit: SubmitHandler<IJobPreferenceValues> = async (data) => {
    setJobPreference(formatJobPreferencePayload(data))
      .unwrap()
      .then(() => {
        showNotification(successfulMessage, NotificationType.SUCCESS);
      }).catch((error) => showNotification(error?.data?.message, NotificationType.ERROR));
  };
  const joiningPreferenceOptions: MyOptionType[] = useMemo(() => mapJoiningPreferenceOptions(
    jobJoiningPreferenceOptions?.filter((option) => option.type === PREFERENCE_OPTION_TYPE.JOINING_PREFERENCE),
  ), [jobJoiningPreferenceOptions]);

  const employmentTypeOptions: MyOptionType[] = useMemo(() => mapJoiningPreferenceOptions(
    jobJoiningPreferenceOptions?.filter((option) => option.type === PREFERENCE_OPTION_TYPE.EMPLOYMENT_TYPE),
  ), [jobJoiningPreferenceOptions]);

  const locationTypeOptions: MyOptionType[] = useMemo(() => mapJoiningPreferenceOptions(
    jobJoiningPreferenceOptions?.filter((option) => option.type === PREFERENCE_OPTION_TYPE.WORK_STYLE),
  ), [jobJoiningPreferenceOptions]);

  const officeDaysPerWeekOptions: MyOptionType[] = useMemo(() => mapJoiningPreferenceOptions(
    jobJoiningPreferenceOptions?.filter((option) => option.type === PREFERENCE_OPTION_TYPE.OFFICE_FREQUENCY),
  ), [jobJoiningPreferenceOptions]);

  const { loadAsyncOption } = useTags(LANGUAGES);
  const { loadAsyncOption: loadAsyncFunctionalRoles } = useFunctionalRoles();

  const handleCancelSelect = (
    tag: MyOptionType,
    options: MyOptionType[],
    key: keyof IJobPreferenceValues,
  ) => handleInputChange(
    options?.filter(
      (selectedTag) => selectedTag.value !== tag.value,
    ),
    key,
  );

  const handleCancelableSelect = (
    selected: MyOptionType | null,
    options: MyOptionType[],
    key: keyof IJobPreferenceValues,
  ) => {
    if (
      selected
      && !options?.some((option) => option.value === selected.value)
    ) {
      handleInputChange([...(options || []), { ...selected }], key);
    }
  };

  const handleToggleSelect = (
    options: MyOptionType[] | IndustryOptionType[],
    tag: MyOptionType | IndustryOptionType,
    key: keyof IJobPreferenceValues,
  ) => handleInputChange(
    options?.some((type) => type.value === tag.value)
      ? options?.filter((type) => type.value !== tag.value)
      : [...(options || []), tag],
    key,
  );

  const disabledButton = !isDirty || !!Object.keys(errors).length || !isFormFilled(values);

  useEffect(() => {
    if (Number(maximumDays?.value) <= Number(minimumDays?.value)) {
      setError('maximumDays', { message: salaryRangeInvalid, type: 'max' });
      return;
    }
    clearErrors('maximumDays');
  }, [clearErrors, maximumDays, minimumDays, setError]);

  const handleWorkStyleToggleSelect = (tag: MyOptionType) => {
    handleToggleSelect(workStyles, tag, 'workStyles');
    if (workStyles.some((workStyleToMatch) => workStyleToMatch.label === workStyle.hybridLabel) && tag.label === workStyle.hybridLabel) {
      handleInputChange(null, 'officeDaysPerWeekType');
      handleInputChange(null, 'minimumDays');
      handleInputChange(null, 'maximumDays');
    }
  };

  const [defaultActiveAccordion, setDefaultActiveAccordion] = useState<string>();
  return (
    <PreferencesContainer onSubmit={handleSubmit(onSubmit)}>
      {result.isLoading && <Loader />}
      <TextComp component="h3">{title}</TextComp>
      <PreferenceContainer>
        <PreferenceChoiceTitle>{joiningPreference.title}</PreferenceChoiceTitle>
        <PreferenceChoiceSubTitle>
          {joiningPreference.subtitle}
        </PreferenceChoiceSubTitle>
        <SelectInput
          options={joiningPreferenceOptions}
          labelText=""
          id="joiningPreference"
          placeHolder={joiningPreference.placeholder}
          onChange={(selected) => handleInputChange(selected, 'joiningPreference')}
          data-cy="roleType"
          clearable={false}
          defaultValue={joiningPreferenceOption}
          error={errors.joiningPreference as FieldError}
        />
      </PreferenceContainer>
      <PreferenceContainer>
        <PreferenceChoiceTitle>{salary.title}</PreferenceChoiceTitle>
        <PreferenceChoiceSubTitle>{salary.subtitle}</PreferenceChoiceSubTitle>
        <PriceInput
          onChange={(value) => {
            handleInputChange(value || null, 'salary');
          }}
          id="salary"
          label={salary.label}
          value={values.salary}
          error={errors.salary}
        />
      </PreferenceContainer>
      <PreferenceContainer>
        <PreferenceChoiceTitle>{compensation.title}</PreferenceChoiceTitle>
        <PreferenceChoiceSubTitle>
          {compensation.subtitle}
        </PreferenceChoiceSubTitle>
        <PriceInput
          onChange={(value) => {
            handleInputChange(value || null, 'compensation');
          }}
          id="compensation"
          label={compensation.label}
          value={values.compensation}
          error={errors.compensation}
        />
      </PreferenceContainer>
      <PreferenceContainer>
        <PreferenceChoiceTitle>{language.title}</PreferenceChoiceTitle>
        <PreferenceChoiceSubTitle>{language.subtitle}</PreferenceChoiceSubTitle>
        {!!selectedLanguages?.length && (
          <CancelableTagsContainer>
            {selectedLanguages?.map((tag) => (
              <TagSelect
                key={tag.value}
                label={tag.label}
                isSelected
                withCrossIcon
                cancelSelect={() => handleCancelSelect(tag, selectedLanguages, 'languages')}
              />
            ))}
          </CancelableTagsContainer>
        )}
        <AsyncSelectInput
          loadAsyncOption={loadAsyncOption}
          labelText=""
          id="languages"
          placeHolder={language.placeholder}
          onChange={(value) => handleCancelableSelect(value, selectedLanguages, 'languages')}
          data-cy="skillsAndTechnologiesUsedInput"
        />
      </PreferenceContainer>
      <PreferenceContainer>
        <PreferenceChoiceTitle>{employmentType.title}</PreferenceChoiceTitle>
        <PreferenceChoiceSubTitle>
          {employmentType.subtitle}
        </PreferenceChoiceSubTitle>
        <CancelableTagsContainer>
          {employmentTypeOptions?.map((tag) => (
            <TagSelect
              key={tag.value}
              label={tag.label}
              isSelected={employmentTypes?.some(
                (type) => type.value === tag.value,
              )}
              withCheckIcon
              toggleSelect={() => handleToggleSelect(employmentTypes, tag, 'employmentTypes')}
            />
          ))}
        </CancelableTagsContainer>
      </PreferenceContainer>
      <PreferenceContainer>
        <PreferenceChoiceTitle>{workStyle.title}</PreferenceChoiceTitle>
        <PreferenceChoiceSubTitle>
          {workStyle.subtitle}
        </PreferenceChoiceSubTitle>
        <CancelableTagsContainer>
          {locationTypeOptions?.map((tag) => (
            <TagSelect
              key={tag.value}
              label={tag.label}
              isSelected={workStyles?.some((type) => type.value === tag.value)}
              withCheckIcon
              toggleSelect={() => handleWorkStyleToggleSelect(tag)}
            />
          ))}
        </CancelableTagsContainer>
        {workStyles?.some((style) => style.label === workStyle.hybridLabel) && (
          <InputsContainer>
            <TextComp component="h6">
              {workStyle.officeDaysPerWeek.label}
            </TextComp>
            <SelectInput
              options={officeDaysPerWeekOptions as MyOptionType[]}
              labelText=""
              id="officeDaysPerWeek"
              placeHolder={workStyle.officeDaysPerWeek.placeholder}
              data-cy="officeDaysPerWeek"
              onChange={(officeDaysPerWeekType) => handleInputChange(
                officeDaysPerWeekType,
                'officeDaysPerWeekType',
              )}
              value={values.officeDaysPerWeekType?.label}
              error={errors.officeDaysPerWeekType as FieldError}
            />
          </InputsContainer>
        )}
        {values.officeDaysPerWeekType?.label
          === officeDaysPerWeeks.setOfficeDaysPerWeek && (
          <InputsContainer>
            <PreferenceChoiceSubTitle>
              {workStyle.officeDaysPerWeek.label}
            </PreferenceChoiceSubTitle>
            <DaysContainer>
              <SelectInput
                options={minimumOfficeDaysPerWeekOptions}
                labelText=""
                id="minimumDays"
                placeHolder={workStyle.range.minimumDaysPlaceholder}
                value={minimumDays?.value}
                data-cy="minimumDays"
                onChange={(selected) => handleInputChange(selected, 'minimumDays')}
                error={errors.minimumDays as FieldError}
              />
              <SelectInput
                options={minimumOfficeDaysPerWeekOptions}
                labelText=""
                id="maximumDays"
                placeHolder={workStyle.range.maximumDaysPlaceholder}
                value={maximumDays?.value}
                data-cy="maximumDays"
                onChange={(selected: MyOptionType | null) => handleInputChange(
                  selected,
                  'maximumDays',
                  Number(minimumDays?.value)
                      < Number(selected?.value),
                )}
                error={errors.maximumDays as FieldError}
              />
            </DaysContainer>
          </InputsContainer>
        )}
      </PreferenceContainer>
      <PreferenceContainer>
        <PreferenceChoiceTitle>{location.title}</PreferenceChoiceTitle>
        <PreferenceChoiceSubTitle>
          {location.subtitle}
        </PreferenceChoiceSubTitle>
        {!!selectedLocations?.length && (
          <CancelableTagsContainer>
            {selectedLocations?.map((tag) => (
              <TagSelect
                key={tag.value}
                label={tag.label}
                isSelected
                withCrossIcon
                cancelSelect={() => handleCancelSelect(tag, selectedLocations, 'locations')}
              />
            ))}
          </CancelableTagsContainer>
        )}
        <LocationAutoComplete
          onChange={(value) => handleCancelableSelect(value, selectedLocations, 'locations')}
          label=""
          placeholder={location.placeholder}
          value={null}
          disabled={selectedLocations?.length === 5}
        />
      </PreferenceContainer>
      <PreferenceContainer>
        <PreferenceChoiceTitle>{region.title}</PreferenceChoiceTitle>
        <PreferenceChoiceSubTitle>{region.subtitle}</PreferenceChoiceSubTitle>
        {!!selectedRegions?.length && (
          <CancelableTagsContainer>
            {selectedRegions?.map((tag) => (
              <TagSelect
                key={tag.value}
                label={tag.label}
                isSelected
                withCrossIcon
                cancelSelect={() => handleCancelSelect(tag, selectedRegions, 'regions')}
              />
            ))}
          </CancelableTagsContainer>
        )}
        <SelectInput
          disabled={selectedRegions?.length === 5}
          options={regionsOptions as unknown as MyOptionType[]}
          labelText=""
          id="region"
          placeHolder={region.placeholder}
          data-cy="regions"
          onChange={(value) => handleCancelableSelect(value, selectedRegions, 'regions')}
          error={errors.regions as FieldError}
        />
      </PreferenceContainer>
      <PreferenceContainer>
        <PreferenceChoiceTitle>{role.title}</PreferenceChoiceTitle>
        <PreferenceChoiceSubTitle>{role.subtitle}</PreferenceChoiceSubTitle>
        {!!selectedRoles?.length && (
          <CancelableTagsContainer>
            {selectedRoles?.map((tag) => (
              <TagSelect
                key={tag.value}
                label={tag.label}
                isSelected
                withCrossIcon
                cancelSelect={() => handleCancelSelect(tag, selectedRoles, 'roles')}
              />
            ))}
          </CancelableTagsContainer>
        )}
        <AsyncSelectInput
          loadAsyncOption={loadAsyncFunctionalRoles}
          id="roles"
          placeHolder={role.placeholder}
          data-cy="functionalRoleInput"
          onChange={(value) => handleCancelableSelect(value, selectedRoles, 'roles')}
          labelText=""
          disabled={selectedRoles?.length === 5}
        />
      </PreferenceContainer>
      <PreferenceContainer>
        <PreferenceChoiceTitle>{industries.title}</PreferenceChoiceTitle>
        <PreferenceChoiceSubTitle>{industries.subtitle}</PreferenceChoiceSubTitle>
        <PreferenceSubText>{industries.selector.subtext}</PreferenceSubText>
        <CancelableTagsContainer>
          {industryOptions?.map((tag) => (
            <TagSelect
              key={tag.id}
              label={tag.industry}
              isSelected={industryTypes?.some(
                (type) => type.label === tag.industry,
              )}
              // icon={<QuestionMarkIcon />} // TODO: Enable with API
              cancelable
              toggleSelect={() => {
                setDefaultActiveAccordion(!industryTypes?.some((type) => type.label === tag.industry) ? tag.industry : '');
                handleToggleSelect(industryTypes, { value: `${tag.id}`, label: tag.industry, subIndustries: [] }, 'industryTypes');
              }}
            />
          ))}
        </CancelableTagsContainer>
        <IndustryAccordion
          industryOptions={industryOptions}
          industryTypes={industryTypes}
          onChange={(industriesToUpdate) => handleInputChange(industriesToUpdate, 'industryTypes')}
          selectedAccordionItem={defaultActiveAccordion}
        />
      </PreferenceContainer>
      {isMobile ? (
        <Buttons>
          <ButtonComp
            primary
            label={save}
            type="submit"
            disabled={disabledButton}
          />
        </Buttons>
      ) : (
        <ButtonsFixed width="calc(100% - 424px)">
          <ButtonComp
            primary
            label={save}
            type="submit"
            disabled={disabledButton}
          />
        </ButtonsFixed>
      )}
    </PreferencesContainer>
  );
};

export default JobPreferences;
