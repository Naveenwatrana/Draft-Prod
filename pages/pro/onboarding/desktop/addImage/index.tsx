import { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useOnboardingMutation } from 'pages/pro/profileService';
import { usePresignedUrlMutation } from 'common/utils/s3upload/service';
import lang from 'common/lang';
import Loader from 'components/Loader/Loader';
import InputComp from 'components/inputComp';
import { InputType } from 'components/inputComp/types';
import ImageInput from 'pages/pro/onboarding/desktop/addImage/imageInput';
import { IAddImageFormValues, AddImageProps } from 'pages/pro/onboarding/desktop/addImage/types';
import { schema } from 'pages/pro/onboarding/desktop/addImage/schema';
import { uploadData } from 'pages/pro/onboarding/common/imageStepApi';
import {
  ButtonGroup, Counter, ImageStepForm, SkipButton, SubmitButton,
} from './styles';

const { onBoarding: { mantra, image }, buttonText } = lang;

const AddImage = ({ imagePreview, setMantra, nextStep }: AddImageProps) => {
  const [onboarding, { isLoading }] = useOnboardingMutation();
  const [presignedUrl] = usePresignedUrlMutation();

  const {
    register,
    control,
    watch,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<IAddImageFormValues>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  const watchMantra = watch('mantra', '');
  const watchImage = watch('image');
  const fieldsEmpty = !watchMantra && !watchImage;
  const imageAdded = errors.image;

  useEffect(() => {
    setMantra(watchMantra);
  }, [watchMantra]);

  // FIXME: Need to set correct type for data
  const onSubmit: SubmitHandler<IAddImageFormValues> = async (data: any) => {
    await uploadData(data, onboarding, presignedUrl);
    nextStep();
  };

  const handleSkip = async () => {
    await uploadData(null, onboarding);
    nextStep();
  };

  return (
    <>
      {isLoading && <Loader />}
      <ImageStepForm
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <InputComp
          labelText={mantra.mantraLabel}
          id="mantra"
          type={InputType.TEXTAREA}
          placeholder={mantra.mantraPlaceholder}
          register={register}
          textArea
          maxLength={100}
          error={errors.mantra}
          data-cy="mantra"
        />
        <Counter
          error={!!errors.mantra}
          total={100}
          count={watchMantra?.length ? watchMantra.length : 0}
        />
        <ImageInput
          control={control}
          error={errors.image}
          imagePreview={imagePreview}
          setValue={setValue}
          trigger={trigger}
          labelText={image.imageLabel}
        />
        <ButtonGroup>
          <SkipButton label={buttonText.skip} onClick={handleSkip} data-cy="skip" />
          <SubmitButton
            primary
            label={buttonText.next}
            type="submit"
            disabled={!!(imageAdded || fieldsEmpty)}
            data-cy="submit"
          />
        </ButtonGroup>
      </ImageStepForm>
    </>
  );
};

export default AddImage;
