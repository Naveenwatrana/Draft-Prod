import { useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import ButtonComp from 'components/buttonComp';
import { TextComp } from 'components/textComp';
import lang from 'common/lang';
import { InputType } from 'components/input/types';
import { usePresignedUrlMutation } from 'common/utils/s3upload/service';
import { useUpdateUserMutation } from 'pages/pro/profileService';
import { uploadData } from 'pages/pro/basicDetails/common/imageStepApi';
import { EditImageProps } from 'pages/pro/basicDetails/type';
import { IAddImageFormValues, IStepConfig } from 'pages/pro/basicDetails/mobile/EditImageDetail/types';
import { schema } from 'pages/pro/basicDetails/mobile/EditImageDetail/schema';
import Mantra from 'pages/pro/basicDetails/mobile/EditImageDetail/mantra';
import PreviewImage from 'pages/pro/basicDetails/mobile/EditImageDetail/previewImage';
import EditImage from 'pages/pro/basicDetails/mobile/EditImageDetail/image/EditImage';
import ModalElement from 'components/Modal/Modal';
import { BtnWrapper, Container, Form } from './styles';

enum Steps {
  IMAGE = 1,
  MANTRA = 2,
  PREVIEW = 3,
}

const {
  bio,
  buttonText,
  onBoarding: { image },
} = lang;

const ImageStep = ({
  firstName,
  lastName,
  picture,
  pictureName,
  setEditImageDetail,
  mantra: defaultMantra,
  userProfileCover,
  editImageDetail,
}: EditImageProps) => {
  const [currentStep, setCurrentStep] = useState(Steps.IMAGE);

  const [editPicture, setEditPicture] = useState('');
  const [editPictureImgUrl, setEditPictureImgUrl] = useState(picture);
  const [editPictureName, setEditPictureName] = useState(pictureName);

  const [mantra, setMantra] = useState(defaultMantra);

  const fullName = `${firstName} ${lastName}`;

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
    defaultValues: {
      mantra: defaultMantra,
    },
  });

  const watchMantra = watch('mantra');

  const [updateUser] = useUpdateUserMutation();
  const [presignedUrl] = usePresignedUrlMutation();

  const onSubmit = async (data: IAddImageFormValues) => {
    const payload = {
      ...data,
      ...(userProfileCover ? { path: userProfileCover } : {}),
    };
    await uploadData(
      payload,
      updateUser,
      presignedUrl,
      !!(getValues('image') && getValues('image') !== editPictureImgUrl),
      editPictureImgUrl !== picture && !!userProfileCover,
    );

    setEditImageDetail(false);
  };

  const imageSubmit = useCallback(() => {
    if (getValues('image') && getValues('image') !== editPictureImgUrl) {
      setEditPicture(URL.createObjectURL(getValues('image') as File));
      setEditPictureImgUrl('');
    }

    setCurrentStep(Steps.MANTRA);
  }, [currentStep]);

  const mantraSubmit = useCallback(() => {
    setMantra(getValues('mantra') || '');
    setCurrentStep(Steps.PREVIEW);
  }, [currentStep]);

  const handleBack = useCallback(() => {
    if (currentStep === Steps.PREVIEW) {
      return setCurrentStep(Steps.MANTRA);
    } else if (currentStep === Steps.MANTRA) {
      return setCurrentStep(Steps.IMAGE);
    }
  }, [currentStep]);

  const renderButton = (
    label: string,
    handleClick: () => void,
    condition: boolean | File | string,
    isPrimary?: boolean,
  ) => (
    <ButtonComp
      label={label}
      data-cy={`editImage${label}`}
      onClick={handleClick}
      primary={isPrimary}
      {...(isPrimary ? { disabled: !condition } : { variant: 'link' })}
    />
  );

  const isDisableImageStep = !(errors.image && errors.image.message);

  const isDisablePreviewStep = !(defaultMantra === watchMantra) || (picture ? editPictureImgUrl !== picture : !!editPicture);

  const isDisableMantraStep = !!(editPicture || editPictureImgUrl) || watchMantra;

  const stepConfigs: Record<Steps, IStepConfig> = {
    [Steps.IMAGE]: {
      content: (<EditImage
        fullName={fullName}
        mantra={mantra}
        labelText={image.imageInputLabel}
        labelBrowse={image.imageInputBrowse}
        info={image.imageInputInfo}
        error={errors.image}
        id="image"
        type={InputType.FILE}
        control={control}
        setValue={setValue}
        trigger={trigger}
        editPicture={editPicture}
        editPictureImgUrl={editPictureImgUrl}
        setEditPictureImgUrl={setEditPictureImgUrl}
        editPictureName={editPictureName}
        setEditPictureName={setEditPictureName}
        isImageErr={!!(errors.image && errors.image.message)}
      />
      ),
      primaryButton: useMemo(
        () => renderButton(buttonText.next, imageSubmit, isDisableImageStep, true),
        [getValues('image'), editPictureImgUrl, errors.image],
      ),
      secondaryButton: useMemo(
        () => renderButton(
          buttonText.cancel,
          () => setEditImageDetail(false),
          false,
        ),
        [currentStep],
      ),
      headerText: (
        <TextComp component="h3" theme="light">
          {bio.editImageText}
        </TextComp>
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
          isDisableMantraStep,
          true,
        ),
        [watchMantra, editPictureImgUrl, editPicture],
      ),
      secondaryButton: useMemo(
        () => renderButton(buttonText.back, handleBack, false),
        [currentStep],
      ),
      headerText: (
        <TextComp component="h3" theme="light">
          {bio.editMantraText}
        </TextComp>
      ),
    },
    [Steps.PREVIEW]: {
      content: (
        <PreviewImage
          image={editPictureImgUrl || editPicture}
          mantra={mantra}
          fullName={fullName}
        />
      ),
      primaryButton: useMemo(
        () => renderButton(
          buttonText.next,
          handleSubmit(onSubmit),
          isDisablePreviewStep,
          true,
        ),
        [watchMantra, editPictureImgUrl, editPicture],
      ),
      secondaryButton: useMemo(
        () => renderButton(buttonText.back, handleBack, false),
        [currentStep],
      ),
      headerText: (
        <TextComp component="h3" theme="light">
          {bio.editPreviewText}
        </TextComp>
      ),
    },
  };

  const renderContent = stepConfigs[currentStep].content;
  const renderHeaderText = stepConfigs[currentStep].headerText;

  return (
    <ModalElement
      isOpen={editImageDetail}
      closeModal={() => setEditImageDetail(false)}
      centered={false}
    >
      <Container>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TextComp component="h2">{bio.editCard}</TextComp>
          {renderHeaderText}
          {renderContent}
        </Form>
        <BtnWrapper>
          {stepConfigs[currentStep].primaryButton}
          {stepConfigs[currentStep].secondaryButton}
        </BtnWrapper>
      </Container>
    </ModalElement>
  );
};

export default ImageStep;
