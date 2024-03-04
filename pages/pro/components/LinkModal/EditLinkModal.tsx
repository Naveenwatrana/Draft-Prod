import ModalElement from 'components/Modal/Modal';
import {
  ModalContentForm,
  ModalContentWrapper,
  ModalHeader,
} from 'components/Modal/style';
import React, { useState, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import InputComp from 'components/inputComp';
import { InputType } from 'components/inputComp/types';
import { DividerComp } from 'components/Divider/styles';
import ButtonComp from 'components/buttonComp';
import lang from 'common/lang';
import Loader from 'components/Loader/Loader';
import WordCounter from 'components/WordCounter/WordCounter';
import ImageUpload from 'components/ImageUpload/ImageUpload';
import { FILE_SIZE_TWENTY_MB, SUPPORTED_IMAGE_FORMATS } from 'common/constants';
import { DeleteIcon } from 'components/Atoms/ViewUploadImage/styles';
import TrashIcon from 'components/Icons/TrashIcon';
import { extractGithubUsername } from 'pages/api/link/utils';
import { useEditBlockMutation } from 'pages/pro/profileService';
import { useAppSelector } from 'common/hooks/state';
import { selectCurrentUser } from 'pages/account/authSlice';
import { IImage } from 'components/ImageUpload/types';
import { uploadMediaFile } from 'utils/uploadMediaFile';
import Link from 'next/link';
import useCompany from 'common/hooks/useCompany';
import { EditLinkModalProps, EditLinkValues } from './type';
import { editLinkModalSchema } from './schema';
import {
  StyledButtons, EditLinkContainer, CounterWrapper, ModalSubTitle, BlockWrapper, LinkBlockWrapper, EditLinkBlockWrapper,
  LinkImageContainer, LinkTitle, LinkInfo, LinkDescription, EditModalContentWrapper, MoreBtnContainer, LinkImage, EditLinkImageContainer, GitHubLinkBlockWrapper,
} from './style';
import GithubBlock from '../Blocks/GithubBlock';
import { showNotification } from '../Projects/util';
import { NotificationType } from '../Projects/ViewProject/types';

const {
  buttonText: { cancel, save },
  profile: {
    link: {
      editLinkForm: {
        editLinkTitle,
        editLinkSubTitle,
        editTitle: { editLinkTitleLabel, editLinkTitlePlaceholder },
        editLinkDescription: { editLinkDescriptionLabel, editLinkDescriptionPlaceholder },
        editBtnText: { editBtnTextLabel, editBtnTextPlaceholder },
        editUrl: { editUrlLabel, editUrlPlaceholder },
        imageInputLabel,
        linkImageSizeError,
        fileExtension,
        fileSize,
        moreBtnLabel,
      },
    },
  },
  linkPosts: { errorMessage },
} = lang;

const EditLinkModal = ({
  editBlockValue, closeModal, setSkip,
}: EditLinkModalProps) => {
  const defaultValues: EditLinkValues = {
    media: editBlockValue?.media,
    editDescription: editBlockValue?.description?.trim() as string,
    editLinkTitle1: editBlockValue?.title?.trim() as string,
    editUrl: editBlockValue?.url as string,
    editBtnText: editBlockValue?.button as string || `${moreBtnLabel}`,
  };
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { isValid, errors },
  } = useForm<EditLinkValues>({
    resolver: yupResolver(editLinkModalSchema),
    defaultValues,
    mode: 'onChange',
  });
  useEffect(() => {
    if (editBlockValue?.media) {
      setFile(editBlockValue.media);
    }
  }, [editBlockValue?.media, setValue]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [editBlock, editBlockResult] = useEditBlockMutation();
  const [file, setFile] = useState('');
  const [error, setError] = useState(false);
  const editTitleMaxCharacters = 75;
  const editDescMaxCharacters = 200;
  const editBtnTextMaxCharacters = 50;
  const editLinkTitle1 = watch('editLinkTitle1');
  const editDescription = watch('editDescription');
  const editBtnText = watch('editBtnText');
  const disabledButton = !editLinkTitle1?.trim() || !editBtnText?.trim();
  const currentUser = useAppSelector(selectCurrentUser);
  const removeImage = () => {
    setFile('');
    setValue('media', null, { shouldDirty: true, shouldValidate: true });
  };
  const { currentCompany: userIsCompany } = useCompany();

  const onUploadMedia = async (files: File[] | null) => {
    if (files && files.length > 0) {
      if (files[0].size <= FILE_SIZE_TWENTY_MB) {
        setFile(URL.createObjectURL(files[0]));
        setValue(
          'media',
          { file: files[0], id: '1' },
          { shouldValidate: true, shouldDirty: true },
        );
        setError(false);
      } else {
        setError(true);
      }
    }
  };
  const onLinkFormSubmit: SubmitHandler<EditLinkValues> = async (formData) => {
    setIsLoading(true);

    let { media } = formData;
    const { file: fileToUpload } = media as IImage;
    if (fileToUpload) {
      media = await uploadMediaFile(
        fileToUpload,
        currentUser.username,
      );
    }
    const body = {
      type: 'link',
      sort: editBlockValue?.sort,
      fields: {
        title: formData?.editLinkTitle1,
        url: formData.editUrl,
        description: formData.editDescription,
        media,
        button: formData.editBtnText,
        domain: formData.domain,
      },
      blockable_type: userIsCompany ? 'companies' : 'users',
      blockable_id: userIsCompany?.id || currentUser.id,
    };
    if (editBlockValue?.id) {
      editBlock({ id: editBlockValue?.id, payload: body }).unwrap().then(() => {
        closeModal();
        setSkip();
      }).catch((err) => {
        showNotification(err?.data?.message, NotificationType.ERROR);
      });
    }
  };
  const isGithub = extractGithubUsername(editBlockValue?.url || '');
  return (
    <ModalElement isOpen>
      {editBlockResult.isLoading && <Loader />}
      <ModalContentWrapper>
        <EditModalContentWrapper>
          <ModalContentForm onSubmit={handleSubmit(onLinkFormSubmit)}>
            <ModalHeader>{editLinkTitle}</ModalHeader>
            <ModalSubTitle>{editLinkSubTitle}</ModalSubTitle>
            <BlockWrapper>
              {isGithub ? (
                <GitHubLinkBlockWrapper
                  href={editBlockValue?.url || ''}
                  target="_blank"
                >
                  <GithubBlock
                    gitBlockTitle={watch('editLinkTitle1')}
                    gitBlockDescription={watch('editDescription')}
                    username={isGithub}
                    buttonText={watch('editBtnText')}
                  />
                </GitHubLinkBlockWrapper>
              ) : (
                <LinkBlockWrapper>
                  <LinkImageContainer>
                    {file && (
                      <LinkImage>
                        <EditLinkImageContainer
                          src={file || editBlockValue?.media}
                        />
                        <DeleteIcon onClick={removeImage}>
                          <TrashIcon color="red" />
                        </DeleteIcon>
                      </LinkImage>
                    )}
                    {!file && (
                      <ImageUpload
                        labelBrowse={imageInputLabel}
                        labelText=""
                        info=""
                        accept={SUPPORTED_IMAGE_FORMATS}
                        onDrop={onUploadMedia}
                        height="245px"
                        error={error}
                        errorMessage={linkImageSizeError}
                        data-cy="imageUpload"
                        info1={fileExtension}
                        info2={fileSize}
                      />
                    )}
                  </LinkImageContainer>
                  <LinkInfo>
                    <LinkTitle>{watch('editLinkTitle1')?.replace(/\s+/g, ' ')?.trim()}</LinkTitle>
                    <LinkDescription>
                      {watch('editDescription')?.replace(/\s+/g, ' ')?.trim()}
                    </LinkDescription>
                  </LinkInfo>
                  <MoreBtnContainer>
                    <Link href={editBlockValue?.url as string} target="_blank">
                      {watch('editBtnText')}
                    </Link>
                  </MoreBtnContainer>
                </LinkBlockWrapper>
              )}
              <EditLinkBlockWrapper>
                <EditLinkContainer>
                  <InputComp
                    type={InputType.TEXT}
                    maxLength={75}
                    labelText={editLinkTitleLabel}
                    id="editLinkTitle1"
                    placeholder={editLinkTitlePlaceholder}
                    register={register}
                    error={errors.editLinkTitle1}
                    style={{ borderRadius: '18px' }}
                  />
                  <CounterWrapper>
                    <WordCounter
                      error={editLinkTitle1?.length > editTitleMaxCharacters}
                      total={editTitleMaxCharacters}
                      count={editLinkTitle1?.length || 0}
                    />
                  </CounterWrapper>
                </EditLinkContainer>
                <EditLinkContainer>
                  <InputComp
                    maxLength={200}
                    type={InputType.TEXT}
                    labelText={editLinkDescriptionLabel}
                    id="editDescription"
                    placeholder={editLinkDescriptionPlaceholder}
                    register={register}
                    error={errors.editDescription}
                    style={{ borderRadius: '18px' }}
                  />
                  <CounterWrapper>
                    <WordCounter
                      error={editDescription?.length > editDescMaxCharacters}
                      total={editDescMaxCharacters}
                      count={editDescription?.length || 0}
                    />
                  </CounterWrapper>
                </EditLinkContainer>
                <EditLinkContainer>
                  <InputComp
                    maxLength={50}
                    type={InputType.TEXT}
                    labelText={editBtnTextLabel}
                    id="editBtnText"
                    placeholder={editBtnTextPlaceholder}
                    register={register}
                    error={errors.editBtnText}
                    style={{ borderRadius: '18px' }}
                  />
                  <CounterWrapper>
                    <WordCounter
                      error={editBtnText?.length > editBtnTextMaxCharacters}
                      total={editBtnTextMaxCharacters}
                      count={editBtnText?.length || 0}
                    />
                  </CounterWrapper>
                </EditLinkContainer>
                <EditLinkContainer>
                  <InputComp
                    type={InputType.TEXT}
                    labelText={editUrlLabel}
                    id="editUrl"
                    placeholder={editUrlPlaceholder}
                    register={register}
                    error={errors.editUrl}
                    style={{ borderRadius: '18px' }}
                  />
                </EditLinkContainer>
              </EditLinkBlockWrapper>
            </BlockWrapper>
            <DividerComp />
            <StyledButtons>
              <ButtonComp
                label={cancel}
                variant="link"
                primary
                onClick={closeModal}
              />
              <ButtonComp
                label={save}
                primary
                disabled={!isValid || !file || disabledButton}
                type="submit"
                style={{ borderRadius: '14px' }}
              />
            </StyledButtons>
          </ModalContentForm>
        </EditModalContentWrapper>
      </ModalContentWrapper>
    </ModalElement>
  );
};

export default EditLinkModal;
