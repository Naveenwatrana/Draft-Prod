import lang from 'common/lang';
import { validURLRegex } from 'pages/company/create/schema';
import { validateUserMediaOptional } from 'components/CardCreationWizard/components/CardFields/utils';
import * as yup from 'yup';
const {
  company: { validUrlError },
} = lang;
const { image } = lang.onBoarding;
const regex = /^(?!.*(?:\b\w+\.[a-z]{2,}\b.*\b\w+\.[a-z]{2,}\b))/;

export const schema = yup
  .object()
  .shape({
    url: yup
      .string()
      .matches(new RegExp(validURLRegex && regex), validUrlError)
      .required(),
    title: yup.string().required('Title field is required'),
  })
  .required();

export const editLinkModalSchema = yup.object().shape({
  media: yup
    .mixed()
    .test('fileSize', image.imageError, validateUserMediaOptional),
  editTitle: yup.string(),
  editLinkTitle1: yup.string().required('Title field is required'),
  editUrl: yup.string()
    .matches(new RegExp(validURLRegex && regex), validUrlError)
    .required('URL field is required'),
  editBtnText: yup.string().required('Button text field is required'),
}).required();
