import TextComp from 'components/textComp';
import InputComp from 'components/inputComp';
import Loader from 'components/Loader/Loader';
import { useState } from 'react';
import lang from 'common/lang';
import { InputType } from 'components/inputComp/types';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { recoverPassSchema } from 'pages/account/schema';
import { useRecoverPassMutation } from 'pages/account/userService';
import RecoverSuccess from 'pages/account/recoverpassword/recoverSuccess';
import {
  AuthContainer, AuthForm, AuthWrapper, FormError, RightPanel, SubmitButton,
} from '../styles';
import { CancelButton, CancelLink } from './styles';
import { IRecoverPasswordFormValues } from '../types';

const { RecoverPassword: RecoverPassCopy } = lang;

const RecoverPassword = () => {
  const [userEmail, setUserEmail] = useState('');
  const [error, setError] = useState<string>('');
  const [recoverPass, { isLoading, isSuccess, isError }] = useRecoverPassMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRecoverPasswordFormValues>({
    resolver: yupResolver(recoverPassSchema),
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<IRecoverPasswordFormValues> = async ({
    email,
  }) => {
    try {
      await recoverPass({ email }).unwrap();
      setUserEmail(email);
    } catch (err: any) {
      setError(err.data.message);
    }
  };

  return (
    <AuthContainer>
      <AuthWrapper>
        {isSuccess && <RecoverSuccess email={userEmail} />}
        {!isSuccess && (
          <>
            <TextComp component="h2" theme="light">
              {RecoverPassCopy.title}
            </TextComp>
            {isLoading && <Loader />}
            <AuthForm onSubmit={handleSubmit(onSubmit)}>
              {isError && <FormError data-cy="recoverpass-validation-error">{error}</FormError>}
              <InputComp
                type={InputType.EMAIL}
                labelText={RecoverPassCopy.emailLabel}
                id="email"
                placeholder={RecoverPassCopy.emailPlaceholder}
                register={register}
                error={errors.email}
                data-cy="recover-email"
              />
              <SubmitButton
                primary
                label={RecoverPassCopy.submitButtonLabel}
                type="submit"
                disabled={!!errors.email}
                data-cy="recover-submit"
              />
              <CancelLink href="/account/signin" data-cy="cancel-link">
                <CancelButton component="h5">{RecoverPassCopy.cancelText}</CancelButton>
              </CancelLink>
            </AuthForm>
          </>
        )}
      </AuthWrapper>
      <RightPanel />
    </AuthContainer>
  );
};

export default RecoverPassword;
