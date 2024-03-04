import { yupResolver } from '@hookform/resolvers/yup';
import InputComp from 'components/inputComp';
import Divider from 'components/Divider/Divider';
import { InputType } from 'components/input/types';
import Loader from 'components/Loader/Loader';
import { useAppDispatch, useAppSelector } from 'common/hooks/state';
import { useCompleteOnboardingMutation, useOnboardingMutation } from 'pages/pro/profileService';
import { setCredentials } from 'pages/account/authSlice';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import lang from 'common/lang';
import { schema } from 'pages/pro/onboarding/desktop/addName/schema';
import { IAddNameFormValues, AddNameProps } from 'pages/pro/onboarding/desktop/addName/types';
import { showNotification } from 'pages/pro/components/Projects/util';
import { NotificationType } from 'pages/pro/components/Projects/ViewProject/types';
import { ToastContainer } from 'react-toastify';
import { Form, SubmitButton } from './styles';

const AddName = ({ nextStep, setFullName }: AddNameProps) => {
  const [onboarding, { isLoading }] = useOnboardingMutation();
  const [completeOnboarding] = useCompleteOnboardingMutation();
  const token = useAppSelector((state) => state.auth.token);
  const dispatch = useAppDispatch();
  const {
    onBoarding: { name },
  } = lang;

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<IAddNameFormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IAddNameFormValues> = async (data) => {
    try {
      const response = await onboarding({
        first_name: data.firstName,
        last_name: data.lastName,
        type: 'onboarding',
        onboarding_step: 3,
      }).unwrap().catch((error) => {
        showNotification(error?.data?.message, NotificationType.ERROR);
      });

      const payload = {
        user: response.data,
        token,
      };
      completeOnboarding('');

      dispatch(setCredentials(payload));

      nextStep();
    } catch (e: any) {
      // TODO: handle error
    }
  };

  const watchFirstName = watch('firstName', '');
  const watchLastName = watch('lastName', '');

  useEffect(() => {
    if (watchFirstName || watchLastName) {
      setFullName(`${watchFirstName} ${watchLastName}`);
    }
  }, [watchFirstName, watchLastName]);

  return (
    <>
      <ToastContainer
        position="top-center"
        hideProgressBar
        style={{
          width: '100%',
          maxWidth: '906px',
        }}
      />
      {isLoading && <Loader />}
      <Form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <InputComp
          type={InputType.TEXT}
          labelText={name.firstNameLabel}
          id="firstName"
          placeholder={name.firstNamePlaceholder}
          register={register}
          error={errors.firstName}
          data-cy="firstName"
        />
        <InputComp
          type={InputType.TEXT}
          labelText={name.lastNameLabel}
          id="lastName"
          placeholder={name.lastNamePlaceholder}
          register={register}
          error={errors.lastName}
          data-cy="lastName"
        />
        <Divider />
        <SubmitButton
          primary
          label="Next"
          type="submit"
          disabled={!(watchFirstName && watchLastName)}
          data-cy="nextButton"
        />
      </Form>
    </>
  );
};

export default AddName;
