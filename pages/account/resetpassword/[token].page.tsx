import InputComp from 'components/inputComp';
import TextComp from 'components/textComp';
import { useResetPassMutation } from 'pages/account/userService';
import { SubmitHandler, useForm } from 'react-hook-form';
import { InputType } from 'components/input/types';
import PasswordValidator from 'components/PasswordValidator/Password';
import { yupResolver } from '@hookform/resolvers/yup';
import Loader from 'components/Loader/Loader';
import lang from 'common/lang';
import { useState } from 'react';
import { useNavigate, useParams } from 'common/utils/router-fill';
import { resetPassSchema, passwordValidations } from 'pages/account/schema';
import {
  AuthContainer, AuthForm, AuthWrapper, FormError, RightPanel, SubmitButton,
} from '../styles';
import { IResetPasswordFormValues } from '../types';

const { ResetPassword: ResetPasswordCopy } = lang;

const ResetPassword = () => {
  const [error, setError] = useState<string>('');
  const [resetPass, { isLoading }] = useResetPassMutation();
  const params = useParams();
  const navigate = useNavigate();
  const { token } = params;

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    getValues,
  } = useForm<IResetPasswordFormValues>({
    resolver: yupResolver(resetPassSchema),
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<IResetPasswordFormValues> = async (data) => {
    try {
      await resetPass({
        password: data.password,
        token: token as string,
      }).unwrap();
      navigate('/account/signin');
    } catch (e: any) {
      setError(e.data.message);
    }
  };

  return (
    <AuthContainer>
      <AuthWrapper>
        <TextComp component="h2">
          {ResetPasswordCopy.title}
        </TextComp>
        {isLoading && <Loader />}
        <AuthForm onSubmit={handleSubmit(onSubmit)}>
          {error && <FormError data-cy="resetpass-validation-error">{error}</FormError>}
          <InputComp
            type={InputType.PASSWORD}
            labelText={ResetPasswordCopy.passwordLabel}
            id="password"
            placeholder={ResetPasswordCopy.passwordPlaceholder}
            register={register}
            error={errors.password}
            data-cy="reset-password"
          />
          <InputComp
            type={InputType.PASSWORD}
            labelText={ResetPasswordCopy.passwordConfirmLabel}
            id="confirmPassword"
            placeholder={ResetPasswordCopy.passwordConfirmPlaceholder}
            register={register}
            error={errors.confirmPassword}
            data-cy="reset-password-confirm"
          />
          <PasswordValidator
            touched={touchedFields?.password}
            validations={passwordValidations}
            value={getValues().password}
          />
          <SubmitButton
            primary
            label={ResetPasswordCopy.submitButtonLabel}
            type="submit"
            data-cy="reset-password-submit"
          />
        </AuthForm>
      </AuthWrapper>
      <RightPanel />
    </AuthContainer>
  );
};

export default ResetPassword;
