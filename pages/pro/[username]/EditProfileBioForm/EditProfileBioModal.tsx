import React, { useEffect, useState } from 'react';
import InputComp from 'components/inputComp';
import { InputType } from 'components/inputComp/types';
import { SubmitHandler, useForm } from 'react-hook-form';
import { LocationAutoComplete } from 'components/Atoms/LocationAutocomplete';
import { DividerComp } from 'components/Divider/styles';
import WordCounter from 'components/WordCounter/WordCounter';
import { MyOptionType } from 'components/Select/types';
import { FILE_SIZE_FIVE_MB, SUPPORTED_IMAGE_FORMATS } from 'common/constants';
import {
  Buttons,
  SaveButton,
} from 'components/Atoms/ResumeFormButtonsContainer/styles';
import ButtonComp from 'components/buttonComp';
import lang from 'common/lang';
import { yupResolver } from '@hookform/resolvers/yup';
import ImageUpload from 'components/ImageUpload/ImageUpload';
import { ModalContentForm, ModalContentWrapper } from 'components/Modal/style';
import ModalElement from 'components/Modal/Modal';
import ViewUploadedImage from 'components/Atoms/ViewUploadImage';
import { userApiEndpoint } from 'pages/api/const';
import { uploadMediaFile } from 'utils/uploadMediaFile';
import { useAppSelector } from 'common/hooks/state';
import { selectCurrentUser, setUserAuth } from 'pages/account/authSlice';
import { IImage } from 'components/ImageUpload/types';
import Loader from 'components/Loader/Loader';
import { useDispatch } from 'react-redux';
import { profileApi } from 'pages/pro/profileService';
import { schema } from './schema';
import {
  IEditProfileBioFormFields,
  IEditBioFormProps,
} from './type';
import {
  EditBioContainer,
  BioHeading,
  ImageContainer,
  PersonalInfoContainer,
  MantraContainer,
  CounterWrapper,
} from './style';
import { mapProfileData } from './util';

const {
  EditProfileBioModal: {
    bio,
    firstNameLabel,
    lastNameLabel,
    firstNamePlaceholder,
    lastNamePlaceholder,
    locationLabel,
    locationPlaceholder,
    mantraLabel,
    mantraPlaceholder,
    cancelBtn,
    saveBtn,
    imageInputLabel,
    fileExtension,
    fileSize,
    profileImageSizeError,
  },
} = lang;

const EditProfileBioModal = ({
  validated, closeForm, setIsCropImgModalOpen, handleUploadFileCallback, cropImageFile, setSkip,
}: IEditBioFormProps) => {
  const isCurrentUser = useAppSelector(selectCurrentUser);
  const defaultValues: IEditProfileBioFormFields = {
    firstName: isCurrentUser?.first_name,
    lastName: isCurrentUser?.last_name,
    mantra: isCurrentUser?.mantra,
    cards: isCurrentUser?.cards,
    location: { value: isCurrentUser?.location, label: isCurrentUser?.location },
    media: undefined,
  };

  const {
    register,
    watch,
    setValue,
    reset,
    handleSubmit,
    setError: setFormError,
    formState: { errors, isValid },
  } = useForm<IEditProfileBioFormFields>({
    defaultValues,
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(schema),
  });

  const maxCharacters = 100;
  const mantra = watch('mantra');
  const [file, setFile] = useState('');

  const [error, setError] = useState(false);
  useEffect(() => {
    if (isCurrentUser?.profile_image) {
      setFile(isCurrentUser.profile_image);
    }
    if (cropImageFile) {
      setFile(cropImageFile.img as string);
      setValue(
        'media',
        { file: cropImageFile.file, id: '1' },
        { shouldValidate: true, shouldDirty: true },
      );
    }
  }, [isCurrentUser?.profile_image, setValue, cropImageFile]);
  const removeImage = () => {
    setFile('');
    setValue('media', null, { shouldDirty: true, shouldValidate: true });
  };

  const onUploadMedia = async (files: File[] | null) => {
    if (files && files.length > 0) {
      if (files[0].size <= FILE_SIZE_FIVE_MB) {
        setFile(URL.createObjectURL(files[0]));
        setValue(
          'media',
          { file: files[0], id: '1' },
          { shouldValidate: true, shouldDirty: true },
        );
        setError(false);
        handleUploadFileCallback(URL.createObjectURL(files[0]));
        setIsCropImgModalOpen(!errors?.media);
      } else {
        setError(true);
      }
    }
  };
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<IEditProfileBioFormFields> = async (data: IEditProfileBioFormFields) => {
    try {
      setIsLoading(true);
      const updatedData = data;
      let media = isCurrentUser.profile_image ? isCurrentUser.profile_image : file;
      if ((data.media as IImage)?.file) {
        media = await uploadMediaFile(
          (data.media as IImage).file,
          isCurrentUser.username,
        );
      }
      if (data.cards.length > 0) {
        updatedData.cards[0].fields.mantra = data.mantra;
        updatedData.cards[0].fields.media = media;
      } else {
        updatedData.cards = [{
          type: 'cover',
          created_at: new Date().toISOString(),
          fields: {
            mantra: data.mantra,
            media: media || null,
          },
        }];
      }
      await fetch(userApiEndpoint, {
        method: 'PUT',
        body: JSON.stringify(mapProfileData(updatedData, media)),
      }).then((res) => res.json().then((response) => {
        if (!response?.errors) {
          dispatch(setUserAuth(response.data));
          dispatch(profileApi.util.invalidateTags(['Profile']));
          setSkip();
          closeForm();
          reset();
        } else if (response.errors.first_name?.[0]) {
          setFormError('firstName', {
            message: response.errors.first_name?.[0],
          });
        } else if (response.errors.last_name?.[0]) {
          setFormError('lastName', {
            message: response.errors.last_name?.[0],
          });
        }
      }));
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ModalElement
      isOpen={true}
      centered
      position={2}
      shouldCloseOnOverlayClick
    >
      {isLoading && <Loader />}
      <ModalContentWrapper>
        <ModalContentForm onSubmit={handleSubmit(onSubmit)}>
          <EditBioContainer>
            <BioHeading>{bio}</BioHeading>
            <ImageContainer>
              {file && (
                <ViewUploadedImage file={file} setFile={removeImage} />
              )}
              {!file && (
                <ImageUpload
                  labelBrowse={imageInputLabel}
                  labelText=""
                  info=""
                  onDrop={onUploadMedia}
                  accept={SUPPORTED_IMAGE_FORMATS}
                  height="250px"
                  error={error}
                  errorMessage={profileImageSizeError}
                  data-cy="imageUpload"
                  info1={fileExtension}
                  info2={fileSize}
                />
              )}
            </ImageContainer>
            <PersonalInfoContainer>
              <InputComp
                type={InputType.TEXT}
                labelText={firstNameLabel}
                id="firstName"
                register={register}
                placeholder={firstNamePlaceholder}
                error={errors.firstName}
              />
              <InputComp
                type={InputType.TEXT}
                labelText={lastNameLabel}
                id="lastName"
                register={register}
                placeholder={lastNamePlaceholder}
                error={errors.lastName}
              />
              <LocationAutoComplete
                onChange={(selected: MyOptionType | null) => selected
                && setValue(
                  'location',
                  { value: selected.value, label: selected.label },
                  { shouldValidate: true, shouldDirty: true },
                )}
                label={locationLabel}
                placeholder={locationPlaceholder}
                value={watch('location')}
              />
            </PersonalInfoContainer>
            <DividerComp />
            <MantraContainer>
              <InputComp
                type={InputType.TEXT}
                labelText={mantraLabel}
                id="mantra"
                register={register}
                placeholder={mantraPlaceholder}
                value={mantra}
                error={errors.mantra}
              />
              <CounterWrapper>
                <WordCounter error={mantra?.length > maxCharacters} total={maxCharacters} count={mantra?.length || 0} />
              </CounterWrapper>
            </MantraContainer>
            <DividerComp />
            <Buttons>
              <ButtonComp
                label={cancelBtn}
                onClick={() => {
                  closeForm();
                  reset();
                  setFile('');
                }}
                variant="link"
              />
              <SaveButton
                label={saveBtn}
                type="submit"
                primary
                disabled={!isValid || !file}
              />
            </Buttons>
          </EditBioContainer>
        </ModalContentForm>
      </ModalContentWrapper>
    </ModalElement>
  );
};
export default EditProfileBioModal;
