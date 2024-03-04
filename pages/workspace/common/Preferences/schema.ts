import * as yup from 'yup';
const selectSchema = yup.object().shape({
  label: yup.string(),
  value: yup.string(),
}).nullable();
export const jobPreferenceSchema = yup.object().shape({
  salary: yup.number().nullable(),
  compensation: yup.number().nullable(),
  joiningPreference: selectSchema,
  languages: yup.array().of(selectSchema),
  locations: yup.array().of(selectSchema).max(5),
  regions: yup.array().of(selectSchema).max(5),
  employmentTypes: yup.array().of(selectSchema),
  industryTypes: yup.array().of(selectSchema),
  workStyles: yup.array().of(selectSchema).max(3),
  officeDaysPerWeekType: selectSchema,
  minimumDays: selectSchema,
  maximumDays: selectSchema,
  roles: yup.array().of(selectSchema).max(5),
});
