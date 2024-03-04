import * as yup from 'yup';
import lang from 'common/lang';
import {
  MANTRA_MAX_LENGTH,
  FILE_SIZE,
  SUPPORTED_FORMATS,
  NAME_MAX_LENGTH,
  NAME_MIN_LENGTH,
  BLOCK_TITLE_MAX_LENGTH,
} from 'common/constants';
import { validateMedia } from 'components/CardCreationWizard/components/CardFields/utils';

export const regexSpecialChracter = /^[^!@#$%^&*+=<>:;|~]*$/;
export const regexNumberChracter = /^([^0-9]*)$/;

const { imageError } = lang.cardCreationWizard;

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

const {
  onBoarding: { name, image },
} = lang;

const schemaFullName = yup
  .object()
  .shape({
    firstName: yup
      .string()
      .min(NAME_MIN_LENGTH, name.minLimitError)
      .max(NAME_MAX_LENGTH, name.limitError)
      .matches(regexNumberChracter, name.numberCharErr)
      .matches(regexSpecialChracter, name.specialCharErr)
      .required(name.firstNameError)
      .trim(),
    lastName: yup
      .string()
      .max(NAME_MAX_LENGTH, name.limitError)
      .min(NAME_MIN_LENGTH, name.minLimitError)
      .matches(regexNumberChracter, name.numberCharErr)
      .matches(regexSpecialChracter, name.specialCharErr)
      .required(name.lastNameError)
      .trim(),
    location: yup.object().shape({
      label: yup.string().required('required'),
      value: yup.string().required('required'),
    }),
  })
  .required();

const textBlockSchema = yup
  .object()
  .shape({
    title: yup.string().nullable().max(BLOCK_TITLE_MAX_LENGTH, name.limitError),
    description: yup
      .string()
      .required(name.descriptionError),
  })
  .required();

const highLightBlockSchema = yup
  .object()
  .shape({
    title: yup.string().nullable().max(BLOCK_TITLE_MAX_LENGTH, name.limitError),
    media: yup
      .mixed()
      .test('fileSize', imageError, validateUserMedia)
      .required(imageError),
  })
  .required();
const schemaImage = yup.object().shape({
  mantra: yup.string().max(MANTRA_MAX_LENGTH).notRequired(),
  image: yup
    .mixed()
    .test('fileSize', image.imageError, (file) => file ? file.size <= FILE_SIZE : true)
    .test('fileType', image.imageError, (file) => file ? SUPPORTED_FORMATS.includes(file.type) : true)
    .notRequired(),
});

export {
  schemaFullName, schemaImage, textBlockSchema, highLightBlockSchema,
};
