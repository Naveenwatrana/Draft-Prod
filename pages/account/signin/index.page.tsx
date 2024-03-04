import { useAppDispatch } from 'common/hooks/state';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { setCredentials } from 'pages/account/authSlice';
import { InputType } from 'components/input/types';
import lang from 'common/lang';
import { LogoIcon } from 'components/Icons/icon';
import Divider from 'components/Divider/Divider';
import Loader from 'components/Loader/Loader';
import { useNavigate } from 'common/utils/router-fill';
import Link from 'next/link';
import { signInSchema } from 'pages/account/schema';
import Bugsnag from "@bugsnag/js";
import InputComp from 'components/inputComp';
import TextComp from 'components/textComp';
import { ToastContainer } from 'react-toastify';
import {
  SignupLink, SignUpWrapper, Title,
} from './styles';
import {
  AuthContainer, AuthForm, AuthWrapper, FormError, RightPanel, SubmitButton,
} from '../styles';
import { ISigninFormValues } from '../types';

const { SignIn: signInCopy } = lang;

declare global {
  interface Window {
    heap: {
      identify: (id: string) => void;
      addUserProperties: (props: Record<string, string>) => void;
    };
  }
}
const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISigninFormValues>({
    resolver: yupResolver(signInSchema),
    mode: 'onBlur',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<ISigninFormValues> = async ({ email, password }) => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }
      const { token, type, ...user } = responseData.data;
      const payload = {
        user,
        token: {
          token,
          type,
        },
      };
      dispatch(setCredentials(payload));
      if (user.onboarding_status) {
        if (typeof window !== 'undefined' && window?.heap) {
          window?.heap.identify(user.email);
          window?.heap.addUserProperties({ Name: `${user.first_name} ${user.last_name}`, username: user.username, id: user.id });
        }
        navigate('/feed');
      } else {
        navigate('/profile/onboarding');
      }
    } catch (e: any) {
      Bugsnag.notify(`Error in Signing in: ${e}`);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <AuthContainer>
      <AuthWrapper>
        <ToastContainer
          position="top-center"
          hideProgressBar
          style={{
            width: '100%',
            maxWidth: '906px',
          }}
        />
        <LogoIcon theme="light" />
        <Title component="h2">
          {signInCopy.title}
        </Title>
        {loading && <Loader />}
        <AuthForm onSubmit={handleSubmit(onSubmit)}>
          {error && <FormError data-cy="login-validation-error">{error}</FormError>}
          <InputComp
            type={InputType.EMAIL}
            labelText={signInCopy.emailLabel}
            id="email"
            placeholder={signInCopy.emailPlaceholder}
            register={register}
            error={errors.email}
            data-cy="signin-email"
          />
          <InputComp
            type={InputType.PASSWORD}
            labelText={signInCopy.passwordLabel}
            id="password"
            placeholder={signInCopy.passwordPlaceholder}
            register={register}
            error={errors.password}
            data-cy="signin-password"
          />
          <SubmitButton primary label={signInCopy.submitButtonLabel} type="submit" data-cy="signin-submit" />
        </AuthForm>
        <Divider />
        <SignUpWrapper>
          <TextComp>{signInCopy.signUpText}</TextComp>
          <Link href="/account/signup" data-cy="signup-link">
            <SignupLink textBold>
              {signInCopy.signUpLink}
            </SignupLink>
          </Link>
        </SignUpWrapper>
        <div>
          <Link href="/account/recoverpassword" data-cy="recover-pass-link">
            <TextComp textBold>
              {signInCopy.resetPass}
            </TextComp>
          </Link>
        </div>
      </AuthWrapper>
      <RightPanel />
    </AuthContainer>
  );
};

export default SignIn;
