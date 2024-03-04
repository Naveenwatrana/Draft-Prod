import TextComp from 'components/textComp';
import lang from 'common/lang';
import { FieldError, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import ButtonComp from 'components/buttonComp';
import InputComp from 'components/inputComp';
import { InputType } from 'components/inputComp/types';
import { useState } from 'react';
import { selectCurrentUser, setUserAuth } from 'pages/account/authSlice';
import { useAppDispatch, useAppSelector } from 'common/hooks/state';
import Loader from 'components/Loader/Loader';
import { userApiEndpoint } from 'pages/api/const';
import { LocationAutoComplete } from 'components/Atoms/LocationAutocomplete';
import { MyOptionType } from 'components/Select/types';
import {
  CreateOnBoardingSteps, IOnBoardingValues, NameProps, nameDetailsSchema,
} from '../types';
import { Buttons } from '../style';
import {
  DescriptionText,
  Header,
  InputCompWrapper,
  OnBoardingDetailsContainer,
} from './style';

const {
  userOnBoarding: {
    label: {
      FirstConfirmYourName,
    },
    profileForm: {
      FirstnameInput,
      LastnameInput,
      profileText,
      location,
    },
  },
  buttonText: { next },
} = lang;

const NameDetail = ({ onNext }: NameProps) => {
  const [error, setError] = useState<string>('');
  const [lastNameErr, setLastNameErr] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const isCurrentUser = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const locationInit = isCurrentUser?.location && {
    label: isCurrentUser.location,
    value: isCurrentUser.location,
  };
  const {
    register,
    watch,
    getValues,
    setValue,
    formState: { isValid, errors },
  } = useForm<IOnBoardingValues>({
    resolver: yupResolver(nameDetailsSchema),
    mode: 'onChange',
    values: {
      firstName: isCurrentUser?.first_name,
      lastName: isCurrentUser?.last_name,
      location: locationInit,
    },
  });
  const firstName = getValues('firstName');
  const lastName = getValues('lastName');
  const locationVal = getValues('location.label');

  const onSubmit = async () => {
    if (firstName === isCurrentUser?.first_name && lastName === isCurrentUser?.last_name) {
      onNext(watch());
    } else {
      const onBoardingStep = isCurrentUser?.onboarding_step
        ? {}
        : { onboarding_step: CreateOnBoardingSteps.NAME };
      setLoading(true);
      fetch(userApiEndpoint, {
        method: 'PUT',
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          location: locationVal,
          ...onBoardingStep,
        }),
      }).then((res) => res.json().then((response) => {
        if (typeof window !== 'undefined' && window?.heap) {
          window?.heap.addUserProperties({ Name: `${firstName} ${lastName}`, username: response?.data?.username, id: response?.data?.id });
        }
        if (response?.errors) {
          setError(response.errors.first_name?.[0]);
          setLastNameErr(response.errors.last_name?.[0]);
        } else {
          onNext(watch());
          setError('');
          setLastNameErr('');
          dispatch(setUserAuth(response.data));
        }
        setLoading(false);
      }));
    }
  };

  return (
    <OnBoardingDetailsContainer>
      {loading && <Loader />}
      <Header>
        <TextComp component="h2">{FirstConfirmYourName}</TextComp>
        <DescriptionText>{profileText.paragraphOne}</DescriptionText>
        <DescriptionText>{profileText.paragraphTwo}</DescriptionText>
        <InputCompWrapper>

          <InputComp
            type={InputType.TEXT}
            id="firstName"
            labelText={FirstnameInput.firstname}
            value={watch('firstName')}
            autoComplete="off"
            placeholder={FirstnameInput.placeholder}
            register={register}
            data-cy="firstName"
            error={error ? { message: error } as FieldError : errors?.firstName}
            required
          />

          <InputComp
            type={InputType.TEXT}
            id="lastName"
            autoComplete="off"
            value={watch('lastName')}
            placeholder={LastnameInput.placeholder}
            labelText={LastnameInput.Lastname}
            register={register}
            error={lastNameErr ? { message: lastNameErr } as FieldError : errors?.lastName}
            data-cy="lastName"
            required
          />
          <LocationAutoComplete
            onChange={(selected: MyOptionType | null) => selected && setValue('location', { value: selected.value, label: selected.label }, { shouldValidate: true, shouldDirty: true })}
            label={location.label}
            placeholder={location.placeholder}
            value={watch('location')}
          />
        </InputCompWrapper>
      </Header>
      <Buttons>
        <ButtonComp
          label={next}
          disabled={!isValid}
          onClick={onSubmit}
          primary
          fullWidth
          data-cy="nextCreateCompany"
        />
      </Buttons>
    </OnBoardingDetailsContainer>
  );
};

export default NameDetail;
