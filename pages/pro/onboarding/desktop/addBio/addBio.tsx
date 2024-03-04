import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import Loader from 'components/Loader/Loader';
import lang from 'common/lang';
import { InputType } from 'components/inputComp/types';
import { useOnboardingMutation } from 'pages/pro/profileService';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AddBioProps, IAddBioFormValues } from 'pages/pro/onboarding/desktop/addBio/types';
import { schema } from 'pages/pro/onboarding/desktop/addBio/schema';
import SkipModal from 'pages/pro/onboarding/common/skipModal';
import InputComp from 'components/inputComp';
import {
  BioForm, ButtonGroup, Counter, Disclaimer, SkipButton, SubmitButton,
} from './styles';

const { onBoarding: { bio }, buttonText } = lang;

const AddBio = ({ setBio, nextStep }: AddBioProps) => {
  const [onboarding, { isLoading }] = useOnboardingMutation();
  const [showModal, setShowModal] = useState(false);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<IAddBioFormValues>({
    resolver: yupResolver(schema),
  });

  const watchBio = watch('bio', '');
  const onlySpaces = watchBio?.trim().length === 0;

  useEffect(() => {
    setBio(watchBio);
  }, [watchBio]);

  const onSubmit: SubmitHandler<IAddBioFormValues> = async (data: any) => {
    try {
      await onboarding({
        bio: data.bio,
        type: 'onboarding',
        onboarding_step: 3,
      }).unwrap();
      nextStep();
    } catch (e: any) {
      // TODO: handle error
    }
  };

  const handleSkip = async () => {
    try {
      await onboarding({
        type: 'onboarding',
        onboarding_step: 3,
      }).unwrap();
      nextStep();
    } catch (e: any) {
      // TODO: handle error
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <SkipModal
        show={showModal}
        handleShow={setShowModal}
        handleSkip={handleSkip}
        step="bio"
      />
      <Disclaimer component="p">
        {bio.bioDisclaimer}
      </Disclaimer>
      <BioForm
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <InputComp
          labelText={bio.bioLabel}
          id="bio"
          type={InputType.TEXTAREA}
          placeholder={bio.bioPlaceholder}
          register={register}
          textArea
          large
          maxLength={290}
          error={errors.bio}
          data-cy="bio"
        />
        <Counter
          error={!!errors.bio}
          total={290}
          count={watchBio?.length ? watchBio.length : 0}
        />
        <ButtonGroup>
          <SkipButton
            label={buttonText.skip}
            onClick={() => setShowModal(true)}
            data-cy="skip-bio"
          />
          <SubmitButton
            primary
            label={buttonText.next}
            type="submit"
            disabled={!watchBio || !!errors.bio || onlySpaces}
            data-cy="submit-bio"
          />
        </ButtonGroup>
      </BioForm>
    </>
  );
};

export default AddBio;
