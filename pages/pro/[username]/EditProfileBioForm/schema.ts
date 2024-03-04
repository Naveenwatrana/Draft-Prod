import * as yup from 'yup';
import lang from 'common/lang';
import { validateUserMediaOptional } from 'components/CardCreationWizard/components/CardFields/utils';

const { image } = lang.onBoarding;

const selectSchema = yup.object().shape({
  label: yup.string().required('required'),
  value: yup.string(),
});

export const schema = yup.object().shape({
  media: yup
    .mixed()
    .test('fileSize', image.imageError, validateUserMediaOptional),
  firstName: yup.string().max(100).required(),
  lastName: yup.string().max(100).required(),
  location: selectSchema,
  mantra: yup.string().max(100).required(),
});
