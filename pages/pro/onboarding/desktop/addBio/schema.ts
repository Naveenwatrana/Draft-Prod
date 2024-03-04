import * as yup from 'yup';
import lang from 'common/lang';
import { VALIDATE_SPACE_AT_START } from 'common/constants';

const {
  onBoarding: { name },
} = lang;

export const schema = yup.object().shape({
  bio: yup.string().matches(VALIDATE_SPACE_AT_START, name.spaceError),
});
