import * as yup from 'yup';
import lang from 'common/lang';
import {
  MANTRA_MAX_LENGTH,
  FILE_SIZE,
  SUPPORTED_FORMATS,
} from 'common/constants';

const {
  onBoarding: { image },
} = lang;

export const schema = yup.object().shape({
  mantra: yup.string().max(MANTRA_MAX_LENGTH).notRequired(),
  image: yup
    .mixed()
    .test('fileSize', image.imageError, (file) => file ? file.size <= FILE_SIZE : true)
    .test('fileType', image.imageError, (file) => file ? SUPPORTED_FORMATS.includes(file.type) : true)
    .notRequired(),
});
