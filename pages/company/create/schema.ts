import * as yup from 'yup';
import lang from 'common/lang';
import { FILE_SIZE_ONE_MB, SUPPORTED_FORMATS } from 'common/constants';

export const validURLRegex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;

export const validDraftURLRegex = /^[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;

const {
  company: { companyUrlError, validUrlError, completeProfileError },
  onBoarding: { image },
} = lang;

export const schema = yup
  .object()
  .shape({
    companyUrl: yup
      .string()
      .matches(new RegExp(validURLRegex), validUrlError)
      .required(companyUrlError),
  })
  .required();

export const validateEmailSchema = yup
  .object()
  .shape({
    companyEmail: yup
      .string().email().required(),
  })
  .required();

export const createCompanySchema = yup
  .object()
  .shape({
    companyName: yup.string().required(completeProfileError.name),
    headcount: yup.object().shape({
      label: yup.string().required('required'),
      value: yup.string().required('required'),
    }),
    logoImage: yup
      .mixed()
      .test('fileSize', image.imageError, (file) => file ? file?.file?.size <= FILE_SIZE_ONE_MB : true)
      .test('fileType', image.imageError, (file) => file ? SUPPORTED_FORMATS.includes(file?.file?.type) : true),
    industries: yup.array().min(1).required(completeProfileError.industry),
    summary: yup.string().trim(),
  })
  .required();
