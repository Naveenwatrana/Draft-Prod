import lang from 'common/lang';
import * as yup from 'yup';
const {
  jobs: { salaryRangeInvalid, atLeastOneRequirement, oteFromRequiredField },
} = lang;
export const schema = yup.object().shape({
  skillsAndTechnologiesUsed: yup.array().min(1).max(20).required(),
});

const selectSchema = yup.object().shape({
  label: yup.string().required('required'),
  value: yup.string().required('required'),
});
const selectNotRequiredSchema = yup
  .object()
  .shape({
    label: yup.string(),
    value: yup.string(),
  })
  .nullable();
export const whatWillYouDoSchema = yup.object().shape({
  roleType: selectSchema,
  range: selectNotRequiredSchema,
  workStyle: selectSchema,
  location: selectSchema,
  officeDaysPerWeekType: selectNotRequiredSchema,
  minimumDays: selectNotRequiredSchema,
  maximumDays: selectNotRequiredSchema,
  addMore: yup.array().nullable(),
});
export const whoYouAreSchema = yup.object().shape({
  employmentType: selectSchema,
  salaryFrom: yup
    .number()
    .transform((value) => (Number.isNaN(value) ? undefined : value))
    .required(),
  salaryTo: yup
    .number()
    .transform((value) => (Number.isNaN(value) ? undefined : value))
    .nullable()
    .when('salaryFrom', (salaryFrom, schemaToPass) => {
      return schemaToPass.min(salaryFrom + 1, salaryRangeInvalid);
    }),
  oteFrom: yup
    .number()
    .transform((value) => (Number.isNaN(value) ? undefined : value))
    .nullable().when('oteTo', {
      is: (value: number) => !!value,
      then: yup.number().transform((value) => (Number.isNaN(value) ? undefined : value)).required(oteFromRequiredField).typeError(oteFromRequiredField),
    }),
  oteTo: yup
    .number()
    .transform((value) => (Number.isNaN(value) ? undefined : value))
    .nullable()
    .min(yup.ref('oteFrom'), salaryRangeInvalid),
  languages: yup.array().max(20),
  requirement: yup.array().min(1, atLeastOneRequirement).max(20),
});
