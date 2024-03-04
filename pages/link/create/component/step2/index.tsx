import LinkPreview from 'components/Molecules/LinkPreview';
import { useIsMobile } from 'common/hooks/useIsMobile';
import Inputs from 'pages/post/create/Steps/Inputs';
import lang from 'common/lang';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from 'components/buttonComp';
import { useForm } from 'react-hook-form';
import { ICreateArticle } from 'pages/article/components/NewArticleFlow/types';
import { ICreatePost } from 'pages/post/create/type';
import { FILE_SIZE_TWENTY_MB } from 'common/constants';
import { IImage } from 'components/ImageUpload/types';
import Loader from 'components/Loader/Loader';
import { useCallback, useState } from 'react';
import { useAppSelector } from 'common/hooks/state';
import { selectCurrentCompany } from 'pages/account/authSlice';
import { useRouter } from 'next/router';
import DiscardConfirmation from 'components/Atoms/DiscardConfirmation';
import {
  InnerContainer, Wrapper, DiscardButton, Buttons,
} from './style';
import { createShareLinkSchema } from '../../schema';
import useShareLink from '../../useShareLink';

export type CreateShareLinkStep2Props = {
  image: string;
  title: string;
  goBack: () => void;
  websiteLink: string;
  websiteLabel: string;
};
const {
  cancel, discard, back, share, next,
} = lang.buttonText;
const {
  linkPosts: {
    discardModal: { title: discardModalTitle, subtitle: discardModalSubtitle },
  },
} = lang;

const { input } = lang.article;
const { topics } = input;
const { caption } = lang.linkPosts.input;
const CreateShareLinkStep2 = ({
  image, title, goBack, websiteLink, websiteLabel,
}: CreateShareLinkStep2Props) => {
  const {
    register,
    watch,
    setValue,
    formState: { isValid },
  } = useForm<ICreateArticle | ICreatePost>({
    resolver: yupResolver(createShareLinkSchema),
  });
  const isMobile = useIsMobile();
  const [file, setFile] = useState('');
  const { createShareLinkApi, isLoading } = useShareLink();
  const [mobileSteps, setMobileSteps] = useState(1);
  const [error, setError] = useState(false);
  const currentCompany = useAppSelector(selectCurrentCompany);
  const [isDiscardModalShowing, setIsDiscardModalShowing] = useState<boolean>(false);
  const router = useRouter();

  const handleInputChange = (
    key: keyof ICreateArticle,
    value2: ICreateArticle[keyof ICreateArticle],
  ) => setValue(key, value2, { shouldDirty: true, shouldValidate: true });

  const onUploadLogo = async (files: File[] | null) => {
    if (files && files.length > 0) {
      if (files[0].size <= FILE_SIZE_TWENTY_MB) {
        setFile(URL.createObjectURL(files[0]));
        setValue('media', [{ file: files[0], id: '1' }], { shouldDirty: true, shouldValidate: true });
        setError(false);
      } else {
        setError(true);
      }
    }
  };
  const moveToStep2 = () => {
    setMobileSteps(2);
  };
  const handleCreateLink = async () => {
    const values = watch();
    const companyDetails = {
      user_name: currentCompany?.username,
    };
    const body = {
      link: websiteLink,
      og_image: image || (values.media as IImage[])[0].file,
      og_title: title || (values as ICreateArticle).title,
      og_description: values.caption,
      description: values.caption,
      topic: values.tags.map((tag) => tag.value).join(','),
      website_name: websiteLabel,
      ...(currentCompany ? companyDetails : {}),
    };
    await createShareLinkApi(body, !image);
  };
  const removeImage = () => {
    setFile('');
    setValue('media', [], { shouldDirty: true, shouldValidate: true });
  };
  const setTitle = (titleValue: string) => {
    setValue('title', titleValue, { shouldDirty: true, shouldValidate: true });
  };
  const description = watch('caption');
  const tags = watch('tags');
  const titleFieldValue = watch('title');
  const fileFieldValue = watch('media');
  const isShareEnable = useCallback(() => {
    if (image !== '' && titleFieldValue !== '' && description !== '' && tags?.length > 0) {
      return false;
    }
    return !isValid;
  }, [isValid, image, titleFieldValue, description, tags]);
  const isShareEnableMobileStep1 = useCallback(() => {
    if (image !== '' && titleFieldValue !== '') {
      return false;
    }
    return fileFieldValue?.length === 0 || titleFieldValue === '';
  }, [image, titleFieldValue, fileFieldValue]);
  return (
    <InnerContainer>
      {isLoading && <Loader />}
      {isMobile && (
        <Wrapper>
          {mobileSteps === 1 && (
            <LinkPreview
              error={error}
              onUploadLogo={onUploadLogo}
              title={title}
              image={image ? image : ''}
              websiteLink={websiteLabel}
              file={file}
              removeImage={removeImage}
              setTitle={setTitle}
            />
          )}
          {mobileSteps === 2 && (
            <Inputs description={{ caption, topics }} register={register} values={watch()} onInputChange={handleInputChange} />
          )}
        </Wrapper>
      )}
      {!isMobile && (
        <Wrapper>
          <LinkPreview
            error={error}
            onUploadLogo={onUploadLogo}
            title={title}
            image={image ? image : ''}
            websiteLink={websiteLabel}
            file={file}
            removeImage={removeImage}
            setTitle={setTitle}
          />
          <Inputs description={{ caption, topics }} register={register} values={watch()} onInputChange={handleInputChange} />
        </Wrapper>
      )}

      <Buttons>
        {isMobile ? (
          <Button
            label={discard}
            onClick={() => setIsDiscardModalShowing(true)}
            variant="link"
            primary
            data-cy={discard}
            error
          />
        ) : (
          <Button
            label={back}
            onClick={goBack}
            variant="link"
            primary
            data-cy="backButton"
          />
        )}
        <div>
          {!isMobile && (
            <DiscardButton
              label={discard}
              onClick={() => setIsDiscardModalShowing(true)}
              variant="link"
              primary
              data-cy={discard}
              error
            />
          )}
          {isMobile && mobileSteps === 2 && (
            <Button
              label={share}
              onClick={handleCreateLink}
              primary
              disabled={isShareEnable()}
              data-cy={share}
            />
          )}
          {isMobile && mobileSteps === 1 && (
            <Button
              label={next}
              onClick={moveToStep2}
              primary
              disabled={isShareEnableMobileStep1()}
              data-cy={next}
            />
          )}
          {!isMobile && (
            <Button
              label={share}
              onClick={handleCreateLink}
              primary
              disabled={isShareEnable()}
              data-cy={share}
            />
          )}
        </div>
      </Buttons>

      <DiscardConfirmation
        isOpen={isDiscardModalShowing}
        closeModal={() => setIsDiscardModalShowing(false)}
        onDiscard={router.back}
        title={discardModalTitle}
        subtitle={discardModalSubtitle}
      />
    </InnerContainer>
  );
};

export default CreateShareLinkStep2;
