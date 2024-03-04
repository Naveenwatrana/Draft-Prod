import { yupResolver } from '@hookform/resolvers/yup';
import InputComp from 'components/inputComp';
import { InputType } from 'components/input/types';
import Loader from 'components/Loader/Loader';
import { useAppDispatch } from 'common/hooks/state';
import lang from 'common/lang';
import { useOnboardingMutation } from 'pages/pro/profileService';
import { SubmitHandler, useForm } from 'react-hook-form';
import { schema } from 'pages/pro/onboarding/desktop/addName/schema';
import { AddNameProps, IAddNameFormValues } from 'pages/pro/onboarding/mobile/addName/types';
import { setUserFullName } from '../onboardingSlice';
import { NameForm, SubmitButton } from '../styles';

const { onBoarding: { name }, buttonText } = lang;

const AddName = ({ nextStep, setName }: AddNameProps) => {
  const [onboarding, { isLoading }] = useOnboardingMutation();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IAddNameFormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IAddNameFormValues> = async (data) => {
    try {
      await onboarding({
        first_name: data.firstName,
        last_name: data.lastName,
        type: 'onboarding',
        onboarding_step: 1,
      }).unwrap();
      dispatch(setUserFullName(`${data.firstName} ${data.lastName}`));
      setName(`${data.firstName} ${data.lastName}`);
      nextStep();
    } catch (e: any) {
      // TODO: handle error
    }
  };

  const watchFirstName = watch('firstName');
  const watchLastName = watch('lastName');

  return (
    <>
      {isLoading && <Loader />}
      <NameForm
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <InputComp
          type={InputType.TEXT}
          labelText={name.firstNameLabel}
          id="firstName"
          placeholder={name.firstNamePlaceholder}
          register={register}
          error={errors?.firstName}
          data-cy="firstName"
        />
        <InputComp
          type={InputType.TEXT}
          labelText={name.lastNameLabel}
          id="lastName"
          placeholder={name.lastNamePlaceholder}
          register={register}
          error={errors?.lastName}
          data-cy="firstName"
        />
        <SubmitButton
          primary
          label={buttonText.next}
          fullWidth
          type="submit"
          disabled={watchFirstName && watchLastName ? false : true}
          data-cy="nextButton"
        />
      </NameForm>
    </>
  );
};

export default AddName;
