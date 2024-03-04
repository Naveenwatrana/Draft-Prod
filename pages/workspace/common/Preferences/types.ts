import { MyOptionType } from 'components/Select/types';
import { ITagResponse } from 'pages/pro/components/Projects/types';

export enum PREFERENCES_TAB {
  JOB = 'Job',
  ORGANISATIONS = 'Organisations',
  TOPICS = 'Topics',
}

export interface IndustryOptionType extends MyOptionType {
  subIndustries: MyOptionType[];
}

export type IJobPreferenceValues = {
  salary: number;
  compensation: number;
  joiningPreference: MyOptionType | null;
  languages: MyOptionType[];
  locations: MyOptionType[];
  regions: MyOptionType[];
  roles: MyOptionType[];
  employmentTypes: MyOptionType[];
  industryTypes: IndustryOptionType[];
  workStyles: MyOptionType[];
  officeDaysPerWeekType: MyOptionType | null;
  minimumDays: MyOptionType | null;
  maximumDays: MyOptionType | null;
};

export type IJobPreferenceData = {
  base_salary?: number | null;
  total_on_target_earning?: number | null;
  job_preference_option_id?: number;
  min_days_office?: number | null;
  max_days_office?: number | null;
  office_visiting_frequency_id?: number | null;
  language_id?: number[];
  role_preferences?: string[];
  employment_type?: number[];
  work_style?: number[];
  location?: string[];
  location_preference?: JobLocationOption[];
  joining_preference?: JobJoiningPreferencesOption;
  office_frequency_preference?: JobJoiningPreferencesOption;
  language_preference?: { id: number; language: ITagResponse }[];
  employment_preference?: { employment_type: JobJoiningPreferencesOption }[];
  work_style_preference?: { work_style: JobJoiningPreferencesOption }[];
  user?: {
    role_preferences: { id: string; role: string }[];
    industries: { sub_industry: SubIndustryData }[];
  };
  industry_preferences?: number[];
};

export type JobJoiningPreferencesOption = {
  id: number;
  option: string;
  type: PREFERENCE_OPTION_TYPE;
};

export type IndustriesOption = {
  id: number;
  industry: string;
  sub_industries: SubIndustryData[];
  description?: string;
};

export type SubIndustryData = {
  industry_id: number;
  id: number;
  name: string;
  description: string;
}

export type JobLocationOption = {
  id: number;
  location: string;
};

export enum PREFERENCE_OPTION_TYPE {
  EMPLOYMENT_TYPE = 'employment_type',
  JOINING_PREFERENCE = 'joining_preference',
  WORK_STYLE = 'work_style',
  OFFICE_FREQUENCY = 'office_frequency',
}

export type PreferencesProps = {
  jobJoiningPreferenceOptions: JobJoiningPreferencesOption[];
  industryOptions: IndustriesOption[];
}
