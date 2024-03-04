import { CAPTION_MAX_LENGTH, POSTS_MEDIA_MAX_LENGTH } from 'common/constants';
import lang from 'common/lang';
import { validateMedia } from 'components/CardCreationWizard/components/CardFields/utils';
import * as yup from 'yup';
const { imageError } = lang.cardCreationWizard;
const {
  onBoarding: { name },
} = lang;
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

const selectSchema = yup.object().shape({
  label: yup.string().required('required'),
  value: yup.string().required('required'),
}).required();

const mediaType = yup
  .mixed()
  .test('fileSize', imageError, validateUserMedia)
  .required(imageError);

export const uploadImageCardSchema = yup
  .object()
  .shape({
    media: yup
      .mixed()
      .test('fileSize', imageError, validateUserMedia)
      .required(imageError),
  })
  .required();

export const createPostSchema = yup.object().shape({
  caption: yup.string().max(CAPTION_MAX_LENGTH, name.captionError).required(),
  media: yup.array().of(mediaType).required().min(1).max(POSTS_MEDIA_MAX_LENGTH),
  tags: yup.array().of(selectSchema).required().min(1).max(20),
});
