import { useState } from 'react';
import { useSignUpMutation } from 'pages/account/userService';
import { useForm, SubmitHandler } from 'react-hook-form';
import { InputType } from 'components/input/types';
import PasswordValidator from 'components/PasswordValidator/Password';
import { yupResolver } from '@hookform/resolvers/yup';
import CheckBoxComp from 'components/inputComp/checkbox';
import Loader from 'components/Loader/Loader';
import Divider from 'components/Divider/Divider';
import Link from 'next/link';
import { passwordValidations, signUpSchema } from 'pages/account/schema';
import SignUpSuccess from 'pages/account/signup/SignupSuccess';
import Terms from 'pages/account/signup/terms';
import InputComp from 'components/inputComp';
import lang from 'common/lang';
import { TermsUseUrl, privacyPolicyUrl } from 'common/utils/network/appRouts';
import TextComp from 'components/textComp';
import { useAppDispatch } from 'common/hooks/state';
import {
  LoginLink, LoginLinkText, Tnc, TermsAndConditionsButton,
} from './styles';
import {
  AuthContainer, AuthForm, AuthWrapper, FormError, RightPanel, SubmitButton,
} from '../styles';
import { ISignupFormValues } from '../types';
import { setCredentials } from '../authSlice';

const { SignUp: signup } = lang;

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    getValues,
  } = useForm<ISignupFormValues>({ resolver: yupResolver(signUpSchema) });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const [showTerms, setShowTerms] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [signUp] = useSignUpMutation();

  const onSubmit: SubmitHandler<ISignupFormValues> = async (data) => {
    setError('');
    setLoading(true);
    try {
      await signUp({ email: data.email, password: data.password }).unwrap().then();
      dispatch(setCredentials({ user: { email: data.email } } as any)); // To Persist email for re-verification
      if (typeof window !== 'undefined' && window?.heap) {
        window?.heap.identify(data.email);
      }
      setSuccess(true);
    } catch (e: any) {
      setError(e.data.errors?.email || e.data.message);
    }
    setLoading(false);
  };

  return (
    <AuthContainer>
      {success && <SignUpSuccess />}
      {showTerms ? (
        <Terms handleTerms={() => setShowTerms(false)} />
      ) : (
        <>
          {!success
          && (
            <AuthWrapper>
              <TextComp component="h2" theme="light">
                {signup.title}
              </TextComp>
              {loading && <Loader />}
              <AuthForm
                onSubmit={handleSubmit(onSubmit)}
                noValidate
              >
                {error && <FormError data-cy="signup-validation-error">{error}</FormError>}
                <InputComp
                  type={InputType.EMAIL}
                  labelText={signup.emailLabel}
                  id="email"
                  placeholder={signup.emailPlaceholder}
                  register={register}
                  error={errors.email}
                  data-cy="signup-email"
                />
                <InputComp
                  type={InputType.PASSWORD}
                  labelText={signup.passwordLabel}
                  id="password"
                  placeholder={signup.passwordPlaceholder}
                  register={register}
                  error={errors.password}
                  data-cy="signup-password"
                />
                <InputComp
                  type={InputType.PASSWORD}
                  labelText={signup.passwordConfirmLabel}
                  id="confirmPassword"
                  placeholder={signup.passwordConfirmPlaceholder}
                  register={register}
                  error={errors.confirmPassword}
                  data-cy="signup-confirm-password"
                />
                <PasswordValidator
                  touched={touchedFields?.password}
                  validations={passwordValidations}
                  value={getValues().password}
                />
                <Divider />
                <Tnc>
                  <CheckBoxComp
                    error={errors.terms}
                    register={register}
                    id="terms"
                    label={signup.checkboxLabel}
                    data-cy="signup-terms"
                  />
                  <TermsAndConditionsButton
                    data-cy="signup-terms-cta"
                    href={TermsUseUrl}
                    target="_blank"
                  >
                    {signup.checkboxLink}
                  </TermsAndConditionsButton>
                  <p>{signup.checkboxLabel2}</p>
                  <TermsAndConditionsButton
                    href={privacyPolicyUrl}
                    target="_blank"
                    data-cy="signup-terms-privacy-policy"
                  >
                    {signup.checkboxLink2}
                  </TermsAndConditionsButton>
                </Tnc>
                <SubmitButton
                  primary
                  label={signup.submitButtonLabel}
                  type="submit"
                  data-cy="signup-submit"
                />
              </AuthForm>
              <LoginLink>
                <LoginLinkText>{signup.loginText}</LoginLinkText>
                <Link href="/account/signin" data-cy="login-link">
                  <TextComp textBold>{signup.loginLink}</TextComp>
                </Link>
              </LoginLink>
            </AuthWrapper>
          )}

          <RightPanel />
        </>
      )}
    </AuthContainer>
  );
};

export default SignUp;
