import * as yup from 'yup';
import lang from 'common/lang';
import {
  REGEX_CAPITAL_LETTER,
  REGEX_MIN_EIGHT_CHARACTER,
  REGEX_SPECIAL_CHARACTER,
} from 'common/constants';

const {
  SignUp, SignIn, PasswordError, RecoverPassword,
} = lang;

export const signUpSchema = yup
  .object()
  .shape({
    email: yup.string().email().required(SignUp.emailError),
    password: yup
      .string()
      .required(PasswordError.passwordRequiredError)
      .matches(/^\S*$/, PasswordError.passwordWhitespaceError)
      .min(8, PasswordError.passwordMinError),
    confirmPassword: yup
      .string()
      .required(PasswordError.passwordConfirmRequiredError)
      .matches(/^\S*$/, PasswordError.passwordWhitespaceError)
      .oneOf(
        [yup.ref('password'), null],
        PasswordError.passwordConfirmRequiredError,
      ),
    terms: yup.bool().oneOf([true], SignUp.termsError),
  })
  .required();

export const signInSchema = yup
  .object()
  .shape({
    email: yup.string().email().required(SignIn.emailError),
    password: yup.string().required(PasswordError.passwordRequiredError),
  })
  .required();

export const recoverPassSchema = yup
  .object()
  .shape({
    email: yup.string().email().required(RecoverPassword.emailError),
  })
  .required();

export const resetPassSchema = yup
  .object()
  .shape({
    password: yup
      .string()
      .required(PasswordError.passwordRequiredError)
      .min(8, PasswordError.passwordMinError)
      .matches(
        /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?!.*\s)/,
        PasswordError.passwordFormatError,
      ),
    confirmPassword: yup
      .string()
      .required(PasswordError.passwordConfirmRequiredError)
      .oneOf(
        [yup.ref('password'), null],
        PasswordError.passwordConfirmRequiredError,
      ),
  })
  .required();

export const passwordValidations = [
  {
    message: PasswordError.validationMinCharLabel,
    valid: (value: string) => REGEX_MIN_EIGHT_CHARACTER.test(value),
    id: 1,
  },
  {
    message: PasswordError.validationCapitalLetterLabel,
    valid: (value: string) => REGEX_CAPITAL_LETTER.test(value),
    id: 2,
  },
  {
    message: PasswordError.validationSpecialCharLabel,
    valid: (value: string) => REGEX_SPECIAL_CHARACTER.test(value),
    id: 3,
  },
];
