/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable camelcase */
import { MyOptionType } from 'components/Select/types';
import { regionsOptions } from 'pages/jobs/create/details/const';
import {
  IJobPreferenceData, IJobPreferenceValues, IndustriesOption, JobJoiningPreferencesOption, JobLocationOption,
} from './types';

export const formatJobPreferencePayload = (
  data: IJobPreferenceValues,
): IJobPreferenceData => {
  const dataToReturn: IJobPreferenceData = {
    language_id: data?.languages?.map((lang) => Number(lang.value)),
    role_preferences: data?.roles?.map((lang) => lang.label),
    employment_type: data?.employmentTypes?.map((employmentType) => Number(employmentType.value)),
    work_style: data?.workStyles?.map((workStyle) => Number(workStyle.value)),
    base_salary: typeof data?.salary === 'number' ? data.salary : null,
    total_on_target_earning: typeof data?.compensation === 'number' ? data.compensation : null,
    min_days_office: data?.minimumDays?.value ? Number(data.minimumDays.value) : null,
    max_days_office: data?.maximumDays?.value ? Number(data.maximumDays.value) : null,
    office_visiting_frequency_id: data?.officeDaysPerWeekType?.value ? Number(data.officeDaysPerWeekType.value) : null,
    location: ([...data?.locations || [], ...data?.regions || []])?.map((location) => location.label),
    industry_preferences: [...(data.industryTypes || []).flatMap((types) => types.subIndustries.map((subIndustries) => Number(subIndustries.value)))],
  };
  if (data?.joiningPreference?.value) {
    dataToReturn.job_preference_option_id = Number(data.joiningPreference.value);
  }
  return dataToReturn;
};

export const formatJobPreferenceData = ({
  base_salary,
  total_on_target_earning,
  joining_preference,
  language_preference,
  employment_preference,
  office_frequency_preference,
  work_style_preference,
  max_days_office,
  min_days_office,
  location_preference: locationsData,
  user,
}: IJobPreferenceData, industryOptions: IndustriesOption[] = []): IJobPreferenceValues => {
  const regions: MyOptionType[] = [];
  const locations: MyOptionType[] = [];
  if (locationsData) {
    mapJoiningLocationOption(locationsData)?.forEach((locationData) => {
      if (regionsOptions.some((regionOption) => regionOption.options.some((option) => option.label === locationData.label))) {
        regions.push(locationData);
        return;
      }
      locations.push(locationData);
    });
  }
  const filteredIndustries = industryOptions
    .filter((industry) => user?.industries
      ?.some((userIndustry) => userIndustry.sub_industry.industry_id === industry.id));
  const dataToReturn: IJobPreferenceValues = {
    salary: base_salary || 0,
    compensation: total_on_target_earning || 0,
    joiningPreference: joining_preference?.id && joining_preference?.option
      ? { value: `${joining_preference?.id}`, label: joining_preference?.option }
      : null,
    languages: (language_preference || [])?.map((languagePreference) => {
      return {
        value: `${languagePreference.language.id}`,
        label: languagePreference.language.tag,
      };
    }),
    locations,
    regions,
    employmentTypes: mapJoiningPreferenceOptions((employment_preference || []).map(({ employment_type }) => employment_type)),
    workStyles: mapJoiningPreferenceOptions((work_style_preference || []).map(({ work_style }) => work_style)),
    officeDaysPerWeekType: office_frequency_preference ? mapJoiningPreferenceOption(office_frequency_preference) : null,
    minimumDays: min_days_office ? mapToOption(min_days_office) : null,
    maximumDays: max_days_office ? mapToOption(max_days_office) : null,
    roles: (user?.role_preferences || [])?.map((role) => mapToOption(role.role)),
    industryTypes: filteredIndustries?.map((industry) => ({
      value: `${industry.id}`,
      label: industry.industry,
      subIndustries: (user?.industries || [])
        .filter((userIndustry) => userIndustry.sub_industry.industry_id === industry.id)
        .map((userIndustry) => ({ value: `${userIndustry.sub_industry.id}`, label: userIndustry.sub_industry.name })),
    })),
  };
  return dataToReturn;
};

export const mapJoiningPreferenceOptions = (options: JobJoiningPreferencesOption[]) : MyOptionType[] => options?.map(mapJoiningPreferenceOption);

export const mapJoiningPreferenceOption = (option: JobJoiningPreferencesOption) => ({ value: `${option.id}`, label: option.option });

export const mapJoiningLocationOption = (options: JobLocationOption[]) => options.map((option) => ({ value: `${option.id}`, label: option.location }));

export const mapToOption = (option: number | string) => ({ value: `${option}`, label: `${option}` });
