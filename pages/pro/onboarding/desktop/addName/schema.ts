import * as yup from 'yup';
import lang from 'common/lang';
import { NAME_MAX_LENGTH, VALIDATE_SPACE_AT_START } from 'common/constants';

const {
  onBoarding: { name },
} = lang;

export const schema = yup
  .object()
  .shape({
    firstName: yup
      .string()
      .max(NAME_MAX_LENGTH, name.limitError)
      .matches(VALIDATE_SPACE_AT_START, name.spaceError)
      .required(name.firstNameError),
    lastName: yup
      .string()
      .max(NAME_MAX_LENGTH, name.limitError)
      .matches(VALIDATE_SPACE_AT_START, name.spaceError)
      .required(name.lastNameError),
  })
  .required();
