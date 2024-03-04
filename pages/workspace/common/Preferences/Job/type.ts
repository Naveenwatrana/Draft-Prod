import {
  IJobPreferenceData, IndustriesOption, IndustryOptionType, JobJoiningPreferencesOption,
} from '../types';

export type JobPreferencesProps = {
  jobJoiningPreferenceOptions: JobJoiningPreferencesOption[];
  jobPreferenceData: IJobPreferenceData;
  industryOptions: IndustriesOption[];
};

export type IndustryAccordionProps = {
  industryOptions: IndustriesOption[];
  industryTypes: IndustryOptionType[];
  onChange: (options: IndustryOptionType[]) => void;
  selectedAccordionItem?: string;
};
