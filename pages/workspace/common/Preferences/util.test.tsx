import { MyOptionType } from 'components/Select/types';
import {
  IJobPreferenceData, IJobPreferenceValues, JobJoiningPreferencesOption, PREFERENCE_OPTION_TYPE,
} from './types';
import {
  formatJobPreferenceData, formatJobPreferencePayload, mapToOption, mapJoiningPreferenceOption, mapJoiningPreferenceOptions,
} from './util';
const joiningOption: JobJoiningPreferencesOption = {
  id: 1,
  option: 'Part-time',
  type: PREFERENCE_OPTION_TYPE.EMPLOYMENT_TYPE,
};
const jobData: IJobPreferenceValues = {
  salary: 1500,
  compensation: 2000,
  joiningPreference: null,
  languages: [],
  locations: [],
  regions: [],
  employmentTypes: [],
  workStyles: [],
  officeDaysPerWeekType: null,
  minimumDays: null,
  maximumDays: null,
  roles: [],
  industryTypes: [],
};
const jobValues: IJobPreferenceData = {
  base_salary: 1500,
  total_on_target_earning: 2000,
  language_id: [],
  employment_type: [],
  max_days_office: null,
  industry_preferences: [],
  min_days_office: null,
  work_style: [],
  location: [],
  role_preferences: [],
  office_visiting_frequency_id: null,
};
const joiningOptions: JobJoiningPreferencesOption[] = [
  joiningOption,
  {
    id: 2,
    option: 'In the next year',
    type: PREFERENCE_OPTION_TYPE.JOINING_PREFERENCE,
  },
];
const selectJoiningOption: MyOptionType = {
  value: '1',
  label: 'Part-time',
};
const numericOption: MyOptionType = {
  value: '1',
  label: '1',
};
const selectJoiningOptions: MyOptionType[] = [
  selectJoiningOption,
  {
    value: '2',
    label: 'In the next year',
  },
];
describe('Personal Preference', () => {
  it('should format the payload from values', () => {
    const data = formatJobPreferencePayload(jobData);
    expect(data).toStrictEqual(jobValues);
  });
  it('should format the values from payload', () => {
    const data = formatJobPreferenceData(jobValues);
    expect(data).toStrictEqual(jobData);
  });
  it('should map option from joining-preference-option to select options', () => {
    const data = mapJoiningPreferenceOptions(joiningOptions);
    expect(data).toStrictEqual(selectJoiningOptions);
  });
  it('should map an option from joining-preference-option to select option', () => {
    const data = mapJoiningPreferenceOption(joiningOption);
    expect(data).toStrictEqual(selectJoiningOption);
  });
  it('should map number to select option', () => {
    const data = mapToOption(1);
    expect(data).toStrictEqual(numericOption);
  });
});
