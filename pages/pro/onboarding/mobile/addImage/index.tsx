import {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { useAppDispatch } from 'common/hooks/state';
import PlaceholderImage from 'public/images/defaultProfile.png';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { usePresignedUrlMutation } from 'common/utils/s3upload/service';
import { useOnboardingMutation } from 'pages/pro/profileService';
import Loader from 'components/Loader/Loader';
import lang from 'common/lang';
import AddImage from 'pages/pro/onboarding/mobile/addImage/image';
import { IAddImageFormValues, ImageStepProps, IStepConfig } from 'pages/pro/onboarding/mobile/addImage/types';
import { schema } from 'pages/pro/onboarding/mobile/addImage/schema';
import Mantra from 'pages/pro/onboarding/mobile/addImage/mantra';
import { uploadData } from 'pages/pro/onboarding/common/imageStepApi';
import ImagePreview from 'pages/pro/onboarding/mobile/previewImage/imagePreview';
import { setUserImage, setUserMantra } from '../onboardingSlice';
import { ButtonWrapper, Form, FormButton } from '../styles';

const { onBoarding: { image, mantra: mantraCopy, previewCard }, buttonText } = lang;

enum Steps {
  IMAGE = 1,
  MANTRA = 2,
  PREVIEW = 3,
}

const ImageStep = ({
  fullName,
  nextStep,
  setTitle,
  setSubtitle,
}: ImageStepProps) => {
  const [currentStep, setCurrentStep] = useState(Steps.IMAGE);
  const [picture, setPicture] = useState<any>(PlaceholderImage); // FIXME: any type
  const [mantra, setMantra] = useState('');

  const [onboarding, { isLoading }] = useOnboardingMutation();
  const [presignedUrl] = usePresignedUrlMutation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    setHeader(image.title, image.subtitle);
  }, []);

  const {
    handleSubmit,
    control,
    trigger,
    setValue,
    getValues,
    watch,
    register,
    formState: { errors },
  } = useForm<IAddImageFormValues>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: IAddImageFormValues) => {
    await uploadData(data, onboarding, presignedUrl);
    data.image && dispatch(setUserImage(URL.createObjectURL(data.image)));
    dispatch(setUserMantra(data.mantra));
    nextStep();
  };

  const setHeader = useCallback((title: string, subtitle: string) => {
    setTitle(title);
    setSubtitle(subtitle);
  }, [currentStep]);

  const imageSubmit = useCallback(() => {
    if (getValues('image')) {
      setPicture(URL.createObjectURL(getValues('image')));
      setCurrentStep(Steps.MANTRA);
      setHeader(mantraCopy.title, mantraCopy.subtitle);
    }
  }, [currentStep]);

  const mantraSubmit = useCallback(() => {
    if (getValues('mantra')) {
      setMantra(getValues('mantra'));
      setCurrentStep(Steps.PREVIEW);
      setHeader(previewCard.title, previewCard.subtitle);
    }
  }, [currentStep]);

  const handleSkip = useCallback(async () => {
    if (currentStep === Steps.IMAGE) {
      setCurrentStep(Steps.MANTRA);
      setHeader(mantraCopy.title, mantraCopy.subtitle);
    }

    if (currentStep === Steps.MANTRA) {
      if (picture.toString() !== PlaceholderImage.toString()) {
        setCurrentStep(Steps.PREVIEW);
        setHeader(previewCard.title, previewCard.subtitle);
      } else {
        await uploadData(null, onboarding);
        nextStep();
      }
    }
  }, [currentStep]);

  const handleBack = useCallback(() => {
    if (currentStep === Steps.PREVIEW) {
      setCurrentStep(Steps.MANTRA);
      setHeader(mantraCopy.title, mantraCopy.subtitle);
    }
  }, [currentStep]);

  const renderButton = (
    label: string,
    handleClick: () => void,
    condition: boolean | File | string,
    isPrimary?: boolean,
  ) => (
    <FormButton
      label={label}
      fullWidth
      onClick={handleClick}
      disabled={!condition}
      primary={isPrimary}
      data-cy={`addImage${label}`}
    />
  );

  const stepConfigs: Record<Steps, IStepConfig> = {
    [Steps.IMAGE]: {
      content: (
        <AddImage
          fullName={fullName}
          error={errors.image}
          control={control}
          setValue={setValue}
          trigger={trigger}
        />
      ),
      primaryButton: useMemo(
        () => renderButton(buttonText.next, imageSubmit, getValues('image') && !errors.image, true),
        [getValues('image')],
      ),
      secondaryButton: useMemo(
        () => renderButton(buttonText.skip, handleSkip, true),
        [currentStep],
      ),
    },
    [Steps.MANTRA]: {
      content: (
        <Mantra watch={watch} register={register} error={errors.mantra} />
      ),
      primaryButton: useMemo(
        () => renderButton(
          buttonText.next,
          mantraSubmit,
          getValues('mantra'),
          true,
        ),
        [getValues('mantra')],
      ),
      secondaryButton: useMemo(
        () => renderButton(buttonText.skip, handleSkip, true),
        [currentStep],
      ),
    },
    [Steps.PREVIEW]: {
      content: (
        <ImagePreview image={picture} mantra={mantra} fullName={fullName} />
      ),
      primaryButton: useMemo(
        () => renderButton(buttonText.next, handleSubmit(onSubmit), true, true),
        [],
      ),
      secondaryButton: useMemo(
        () => renderButton(buttonText.back, handleBack, true),
        [currentStep],
      ),
    },
  };

  const renderContent = stepConfigs[currentStep].content;

  return (
    <>
      {isLoading && <Loader />}
      <Form onSubmit={handleSubmit(onSubmit)}>
        {renderContent}
      </Form>
      <ButtonWrapper>
        {stepConfigs[currentStep].primaryButton}
        {stepConfigs[currentStep].secondaryButton}
      </ButtonWrapper>
    </>
  );
};

export default ImageStep;
