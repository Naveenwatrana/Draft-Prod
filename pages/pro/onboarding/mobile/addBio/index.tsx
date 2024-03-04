import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from 'common/hooks/state';
import Loader from 'components/Loader/Loader';
import { useOnboardingMutation } from 'pages/pro/profileService';
import { yupResolver } from '@hookform/resolvers/yup';
import { AddBioProps, IAddBioFormValues } from 'pages/pro/onboarding/mobile/addBio/types';
import BioPreview from 'pages/pro/onboarding/mobile/previewImage/bioPreview';
import Bio from 'pages/pro/onboarding/mobile/addBio/bio';
import { schema } from 'pages/pro/onboarding/desktop/addBio/schema';
import { setUserBio } from '../onboardingSlice';

const AddBio = ({
  fullName, nextStep, setTitle, setSubtitle,
}: AddBioProps) => {
  const [showPreview, setShowPreview] = useState(false);
  const [onboarding, { isLoading }] = useOnboardingMutation();
  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    register,
    watch,
    getValues,
    formState: { errors },
  } = useForm<IAddBioFormValues>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: IAddBioFormValues) => {
    try {
      await onboarding({
        bio: data.bio,
        type: 'onboarding',
        onboarding_step: 3,
      }).unwrap();
      dispatch(setUserBio(data.bio));
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

  const handleNext = () => {
    setShowPreview(!showPreview);
  };

  const bioData = getValues('bio');

  return (
    <>
      {isLoading && <Loader />}
      {showPreview && (
        <BioPreview
          fullName={fullName}
          bio={bioData}
          setTitle={setTitle}
          setSubtitle={setSubtitle}
          handleBack={handleNext}
          handleSubmit={handleSubmit(onSubmit)}
        />
      )}
      {!showPreview && (
        <Bio
          setTitle={setTitle}
          setSubtitle={setSubtitle}
          showPreview={handleNext}
          register={register}
          watch={watch}
          errors={errors}
          handleSkip={handleSkip}
        />
      )}
    </>
  );
};

export default AddBio;
