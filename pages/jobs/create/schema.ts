import { FILE_SIZE_ONE_MB, SUPPORTED_FORMATS } from 'common/constants';
import lang from 'common/lang';
import { maxTitleCharacters } from 'pages/pro/components/Projects/constant';
import * as yup from 'yup';
const {
  onBoarding: { image },
  jobs: { createJobSteps: { role: { jobRoleRequired, maxWord } } },
} = lang;
export const createJobSchema = yup.object().shape({
  role: yup.string().trim().required('required'),
  location: yup.object().shape({
    label: yup.string().required('required'),
    value: yup.string().required('required'),
  }),
  locationType: yup.string().required('required'),
  jobType: yup.string().required('required'),
  salaryFrom: yup
    .number()
    .transform((value) => (Number.isNaN(value) ? undefined : value))
    .nullable(),
  salaryTo: yup
    .number()
    .transform((value) => (Number.isNaN(value) ? undefined : value))
    .nullable()
    .min(yup.ref('salaryFrom'), 'salaryTo must be greater than salaryFrom'),
  description: yup.string(),
  jobPicture: yup
    .mixed()
    .test('fileSize', image.imageError, (file) => file ? file?.file?.size <= FILE_SIZE_ONE_MB : true)
    .test('fileType', image.imageError, (file) => file ? SUPPORTED_FORMATS.includes(file?.file?.type) : true),
});

const selectSchema = yup.object().shape({
  label: yup.string().required('required'),
  value: yup.string().required('required'),
});
export const jobRoleSchema = yup.object().shape({
  role: yup
    .string()
    .trim()
    .required(jobRoleRequired)
    .max(maxTitleCharacters, maxWord),
  roleType: selectSchema,
});
