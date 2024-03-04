import { CAPTION_MAX_LENGTH } from 'common/constants';
import lang from 'common/lang';
import { validateMedia } from 'components/CardCreationWizard/components/CardFields/utils';
import * as yup from 'yup';

const { imageError } = lang.cardCreationWizard;
const {
  onBoarding: { name },
} = lang;
const { imagePath } = lang.errorMessages;

const validateUserMedia = async (file: { file: File }): Promise<boolean> => {
  if (typeof file === 'string') {
    return true;
  }
  if (file && file.file) {
    return validateMedia(file);
  } else {
    return false;
  }
};

const validationSchema = yup.object().shape({
  imagePath: yup.mixed().test('is-file-or-string', imagePath, (value) => {
    if (!value) {
      return false;
    }

    if (typeof value === 'string') {
      return true;
    }
    if (value && value.file) {
      return validateMedia(value);
    }

    return false;
  }),
});

export const selectSchema = yup.object().shape({
  label: yup.string().required('required'),
  value: yup.string().required('required'),
}).required();

export const mediaType = yup
  .mixed()
  .test('fileSize', imageError, validateUserMedia)
  .required(imageError);

export const mediaTypeWithImage = yup
  .mixed()
  .test('fileSize', imageError, validateUserMedia)
  .required(imageError);

export const createArticleSchema = yup.object().shape({
  caption: yup.string().trim().max(CAPTION_MAX_LENGTH, name.captionError).required(),
  media: yup.array().of(mediaType).required().min(1),
  tags: yup.array().of(selectSchema).required().min(1).max(20),
  title: yup.string().trim().required(),
  content: yup.string().trim().required(),
});
export const editArticleSchema = yup.object().shape({
  caption: yup.string().trim().max(CAPTION_MAX_LENGTH, name.captionError).required(),
  media: validationSchema,
  tags: yup.array().of(selectSchema).required().min(1).max(20),
  title: yup.string().trim().required(),
  content: yup.string().trim().required(),
});
