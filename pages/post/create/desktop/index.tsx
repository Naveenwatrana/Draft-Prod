import lang from 'common/lang';
import CreateContentNavbar from 'components/Molecules/Content/Navbar/CreateContentNavbar';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import UploadMediaContent from 'pages/post/components/uploadMedia';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ICreateArticle } from 'pages/article/components/NewArticleFlow/types';
import ButtonComp from 'components/buttonComp';
import usePosts from 'common/hooks/usePosts';
import Loader from 'components/Loader/Loader';
import DiscardConfirmation from 'components/Atoms/DiscardConfirmation';
import { MediaUploadContainer, StyledButtons } from './style';
import { CreatePostStep, ICreatePost } from '../type';
import { createPostSchema } from '../schema';
import CaptionAndTags from '../Steps/CaptionAndTags';

const {
  buttonText: { discard, post },
  posts: { createPost: createPostLabel },
} = lang;

const DesktopCreatePost = () => {
  const router = useRouter();
  const {
    setValue, watch, register, formState: { isValid }, handleSubmit,
  } = useForm<ICreatePost | ICreateArticle>({
    resolver: yupResolver(createPostSchema),
  });
  const [isDiscardModalShowing, setIsDiscardModalShowing] = useState<boolean>(false);
  const [step, setStep] = useState<CreatePostStep>(CreatePostStep.UPLOAD_FILE);
  const handleInputChange = (
    key: keyof ICreatePost,
    value: ICreatePost[keyof ICreatePost],
  ) => setValue(key, value, { shouldDirty: true, shouldValidate: true });
  const { createPost, isLoading: postLoading } = usePosts();
  return (
    <form onSubmit={handleSubmit(createPost as SubmitHandler<ICreatePost | ICreateArticle>)}>
      {postLoading && <Loader />}
      <CreateContentNavbar handleBack={router.back} title={createPostLabel} />
      {step === CreatePostStep.UPLOAD_FILE && (
        <MediaUploadContainer>
          <UploadMediaContent
            onAdd={(file) => {
              setStep(CreatePostStep.ADD_CAPTION);
              handleInputChange('media', [file]);
            }}
          />
        </MediaUploadContainer>
      )}
      {step === CreatePostStep.ADD_CAPTION && (
        <>
          <CaptionAndTags
            onInputChange={handleInputChange}
            register={register}
            values={watch()}
          />
          <StyledButtons>
            <ButtonComp label={discard} variant="link" primary onClick={() => setIsDiscardModalShowing(true)} />
            <ButtonComp label={post} primary disabled={!isValid} type="submit" />
          </StyledButtons>
        </>
      )}
      <DiscardConfirmation isOpen={isDiscardModalShowing} closeModal={() => setIsDiscardModalShowing(false)} onDiscard={router.back} />
    </form>
  );
};

export default DesktopCreatePost;
