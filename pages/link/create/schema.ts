import { CAPTION_MAX_LENGTH } from 'common/constants';
import lang from 'common/lang';
import { mediaType, selectSchema } from 'pages/article/components/NewArticleFlow/schema';
import * as yup from 'yup';

const {
  onBoarding: { name },
} = lang;
export const createShareLinkSchema = yup.object().shape({
  caption: yup.string().trim().max(CAPTION_MAX_LENGTH, name.captionError).required(),
  media: yup.array().of(mediaType).required().min(1),
  tags: yup.array().of(selectSchema).required().min(1).max(20),
  title: yup.string().trim().required(),
});
