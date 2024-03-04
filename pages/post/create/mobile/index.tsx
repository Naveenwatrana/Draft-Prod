import CreateContentNavbar from 'components/Molecules/Content/Navbar/CreateContentNavbar';
import { useRouter } from 'next/router';
import React, { useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import SliderCard from 'components/ProfileCard/Card';
import lang from 'common/lang';
import UploadMediaContent from 'pages/post/components/uploadMedia';
import UploadMediaModal from 'pages/post/components/uploadMedia/Modal';
import ButtonComp from 'components/buttonComp';
import useAddPost from 'common/hooks/useAddPost';
import DiscardConfirmation from 'components/Atoms/DiscardConfirmation';
import usePosts from 'common/hooks/usePosts';
import Loader from 'components/Loader/Loader';
import PencilIcon from 'components/Icons/PencilIcon';
import {
  CreatableContainer,
  StyledImage,
  VideoContainer,
} from 'components/CardCreationWizard/components/Cards/Post/style';
import Video from 'components/VideoPlayer';
import { MuteIcnWrapper } from 'components/DefaultCard/styles';
import MuteIcon from 'components/Icons/MuteIcon';
import EditModal from 'pages/post/components/EditModal';
import ImageCropperMobile from 'components/CardCreationWizard/components/CardWorkArea/ImageCropper/mobile/ImageCropperMobile';
import ReorderModal from 'pages/post/components/Reorder';
import { ICreateArticle } from 'pages/article/components/NewArticleFlow/types';
import { CreatePostStep, ICreatePost } from '../type';
import { createPostSchema } from '../schema';
import { CardsWrapper, Container, EditButton } from './style';
import { MediaUploadContainer, StyledButtons } from '../desktop/style';
import Inputs from '../Steps/Inputs';
const {
  buttonText: { discard, post, next },
  posts: { createPost: createPostLabel },
} = lang;

const MobileCreatePost = () => {
  const router = useRouter();
  const {
    setValue,
    watch,
    handleSubmit,
    register,
    formState: { isValid },
  } = useForm<ICreatePost | ICreateArticle>({
    resolver: yupResolver(createPostSchema),
  });
  const values = watch();
  const { media } = values;
  const handleInputChange = (
    key: keyof ICreatePost,
    value: ICreatePost[keyof ICreatePost],
  ) => setValue(key, value, { shouldDirty: true, shouldValidate: true });
  const {
    currentImage,
    handleEditImage,
    files,
    setCurrentImage,
    modalOpen,
    closeModal,
    editImage,
    handleFileUpload,
    handleImageDelete,
    reOrderFiles,
    setEditImage,
    handleImageCropping,
  } = useAddPost(values as ICreatePost, handleInputChange);
  const [step, setStep] = useState<CreatePostStep>(CreatePostStep.UPLOAD_FILE);
  const [isDiscardModalShowing, setIsDiscardModalShowing] = useState<boolean>(false);
  const [isReorderModalShowing, setIsReorderModalShowing] = useState<boolean>(false);
  const [isEditModalShowing, setIsEditModalShowing] = useState<boolean>(false);
  const { createPost, isLoading: postLoading } = usePosts();
  const disabledButton = useMemo(() => {
    if (step === CreatePostStep.UPLOAD_FILE) return !files?.length;
    return !isValid;
  }, [files?.length, isValid, step]);
  const [mute, setMute] = useState(true);
  const cards = useMemo(
    () => [
      ...files.map((file) => file.isVideo ? (
        <VideoContainer key={file.id}>
          <Video media={file.url} mute={true} isStopped={false} />
          <MuteIcnWrapper>
            <MuteIcon active={mute} onClick={() => setMute(!mute)} />
          </MuteIcnWrapper>
        </VideoContainer>
      ) : (
        <StyledImage
          src={file.url}
          key={file.id}
          alt="image"
          width={440}
          height={780}
          loading="lazy"
        />
      )),
      <CreatableContainer key="create">
        <UploadMediaContent
          showFileSpecification={false}
          onAdd={handleFileUpload}
        />
      </CreatableContainer>,
    ],
    [files, handleFileUpload, mute],
  );
  const closeReorderModal = () => setIsReorderModalShowing(false);
  const closeEditModal = () => setIsEditModalShowing(false);
  const openEditModal = () => setIsEditModalShowing(true);
  return (
    <form onSubmit={handleSubmit(createPost as SubmitHandler<ICreatePost | ICreateArticle>)}>
      {postLoading && <Loader />}
      <CreateContentNavbar title={createPostLabel} handleBack={router.back} />
      <Container>
        {step === CreatePostStep.UPLOAD_FILE && (
          <>
            {step === CreatePostStep.UPLOAD_FILE && !media?.length && (
              <MediaUploadContainer>
                <UploadMediaContent
                  onAdd={(file) => {
                    handleInputChange('media', [file]);
                    handleFileUpload(file);
                  }}
                />
              </MediaUploadContainer>
            )}
            {editImage && currentImage?.sourceUrl ? (
              <ImageCropperMobile
                handleEditImage={handleEditImage}
                imageUrl={currentImage.sourceUrl}
                onCancel={() => setEditImage(false)}
              />
            ) : (
              <CardsWrapper>
                {currentImage
                && (
                  <EditButton onClick={openEditModal}>
                    <PencilIcon />
                  </EditButton>
                )}
                {media?.length && (
                  <SliderCard
                    slides={cards}
                    getCurrentSlideNumber={(index) => setCurrentImage(files[index])}
                  />
                )}
              </CardsWrapper>
            )}
          </>
        )}
        {step === CreatePostStep.ADD_CAPTION && (
          <Inputs
            register={register}
            values={watch()}
            onInputChange={handleInputChange}
          />
        )}
        {!!media?.length && (
          <StyledButtons>
            <ButtonComp
              label={discard}
              variant="link"
              primary
              onClick={() => setIsDiscardModalShowing(true)}
            />
            <ButtonComp
              label={step === CreatePostStep.ADD_CAPTION ? post : next}
              primary
              disabled={disabledButton}
              type="submit"
              onClick={() => setStep(CreatePostStep.ADD_CAPTION)}
            />
          </StyledButtons>
        )}
        <UploadMediaModal
          isOpen={modalOpen}
          closeModal={closeModal}
          onSubmit={handleFileUpload}
        />
        <DiscardConfirmation
          isOpen={isDiscardModalShowing}
          closeModal={() => setIsDiscardModalShowing(false)}
          onDiscard={router.back}
        />
        {isReorderModalShowing
        && (
          <ReorderModal
            isOpen={isReorderModalShowing}
            onReorder={reOrderFiles}
            media={files}
            closeModal={closeReorderModal}
          />
        )}
        <EditModal
          onCrop={() => {
            handleImageCropping();
            closeEditModal();
          }}
          onReorder={() => {
            setIsReorderModalShowing(true);
            closeEditModal();
          }}
          onDelete={() => {
            handleImageDelete(currentImage.id);
            setCurrentImage(files[0]);
            closeEditModal();
          }}
          isOpen={isEditModalShowing}
          closeModal={closeEditModal}
        />
      </Container>
    </form>
  );
};

export default MobileCreatePost;
