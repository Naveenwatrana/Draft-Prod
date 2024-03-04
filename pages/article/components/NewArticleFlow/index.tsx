import lang from 'common/lang';
import { ArticleTextEditor, Buttons } from 'pages/article/create/style';
import Button from 'components/buttonComp';
import { IOption } from 'components/MultipleInputTextArea/types';
import React, {
  KeyboardEvent, useMemo, useRef, useState,
} from 'react';
import ViewUploadedImage from 'components/Atoms/ViewUploadImage';
import ImageUpload from 'components/ImageUpload/ImageUpload';
import StoryPreview from 'components/Molecules/StoryPreview';
import DiscardModal from 'components/DiscardModal';
import Inputs from 'pages/post/create/Steps/Inputs';
import ArticleStepTwo from 'pages/article/create/step2';
import { ICreatePost } from 'pages/post/create/type';
import { useRouter } from 'next/router';
import { useIsMobile } from 'common/hooks/useIsMobile';
import { FILE_SIZE_TWENTY_MB } from 'common/constants';
import { useForm } from 'react-hook-form';
import DiscardConfirmation from 'components/Atoms/DiscardConfirmation';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Container, ContentInsideWrap, Editor, EditorContainer, HeadlineField, Wrap, Wrapper,
} from './style';
import { ICreateArticle } from './types';
import { createArticleSchema } from './schema';
type CreateArticleStep1Props = {
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  isEditing: boolean;
  setStep: (title: string) => void;
  disabled: boolean;
  cancelArticle: () => void;
  tags?: IOption[];
  onTagChange: React.Dispatch<IOption[]>;
  publish: (d: ICreateArticle | ICreatePost) => void;
  image?: string;
  articleTitle?: string;
}
const {
  article: {
    next, cancel, imageUpload, discard,
    editText: { placeholderTitle },
  },
} = lang;
const { discardModal, input } = lang.article;
const { caption, topics } = input;

const CreateArticleStep1 = ({
  value, onChange, isEditing, setStep, disabled, cancelArticle, publish, onTagChange,
  tags: tagsValue, image, articleTitle,
}: CreateArticleStep1Props) => {
  const [headlineText, setHeadlineText] = useState(false);
  const [createStep, setCreateStep] = useState(1);
  const [deleteCardAlert, setDeleteCardAlert] = useState(false);
  const [error, setError] = useState(false);
  const [file, setFile] = useState(image);
  const articleHeading = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const isMobile = useIsMobile();
  const [isDiscardModalShowing, setIsDiscardModalShowing] = useState<boolean>(false);

  const {
    register,
    watch,
    setValue,
    formState: { isValid },
  } = useForm<ICreateArticle | ICreatePost>({
    resolver: yupResolver(createArticleSchema),
    defaultValues: {
      title: articleTitle ?? '',
      content: '',
      media: [],
      tags: [],
    },
  });
  const publish1 = () => {
    publish(watch());
  };
  const updateContent = (val: string) => {
    setValue('content', val);
    onChange(val);
  };
  const handleKeyUp = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.code === 'Backspace' && articleHeading?.current && articleHeading.current.innerText.length === 0) {
      setHeadlineText(false);
      return;
    }
    if (articleHeading?.current && articleHeading.current.innerText.length > 0) {
      setHeadlineText(true);
    }
  };
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (articleHeading?.current && articleHeading.current.innerText.length >= 150 && e.code !== 'Backspace') {
      e.preventDefault();
      return;
    }
    if (e.code === 'Enter') {
      e.preventDefault();
    }
  };
  const onUploadLogo = async (files: File[] | null) => {
    if (files && files.length > 0) {
      if (files[0].size <= FILE_SIZE_TWENTY_MB) {
        setFile(URL.createObjectURL(files[0]));
        setValue('media', [{ file: files[0], id: '1' }]);
        setError(false);
      } else {
        setError(true);
      }
    }
  };
  const nextStep = () => {
    setCreateStep(createStep + 1);
    setValue('title', articleHeading.current?.innerText || '');
  };
  const removeImage = () => {
    setFile('');
    setValue('media', []);
  };
  const deleteCardHandler = () => {
    router.back();
  };
  const closeDeleteCardModal = () => {
    setDeleteCardAlert(false);
  };
  const discardClick = () => {
    setDeleteCardAlert(true);
  };
  const title = watch('title');
  const media = watch('media');
  const content = watch('content');
  const isNextEnabled = useMemo(
    () => !headlineText || !media || !content || content === '<p><br></p>' || media.length === 0,
    [headlineText, media, content],
  );
  const handleInputChange = (
    key: keyof ICreateArticle,
    value2: ICreateArticle[keyof ICreateArticle],
  ) => setValue(key, value2, { shouldDirty: true, shouldValidate: true });
  if (createStep === 1) {
    return (
      <Container>
        <DiscardConfirmation
          isOpen={isDiscardModalShowing}
          closeModal={() => setIsDiscardModalShowing(false)}
          onDiscard={router.back}
          title={discardModal.title}
          subtitle={discardModal.description}
        />
        <EditorContainer>
          <Editor>
            <Wrap>
              <ContentInsideWrap>
                {file && (
                  <ViewUploadedImage file={file} setFile={removeImage} />
                )}

                {!file && (
                  <ImageUpload
                    labelBrowse={isMobile ? imageUpload.imageInputLabelMobile : imageUpload.imageInputLabel}
                    labelText=""
                    info={isMobile ? '' : imageUpload.logoInputInfo}
                    onDrop={onUploadLogo}
                    height={isMobile ? '207px' : '264px'}
                    error={error}
                    errorMessage=""
                    data-cy="logoUpload"
                    info1={imageUpload.file}
                    info2={imageUpload.fileSize}
                    imageOnly
                  />
                )}
                <HeadlineField
                  ref={articleHeading}
                  onKeyDown={handleKeyDown}
                  onKeyUp={handleKeyUp}
                  role="textbox"
                  contentEditable
                  data-ph={placeholderTitle}
                >
                  {title}
                </HeadlineField>
                <ArticleTextEditor
                  isEditing={isEditing}
                  value={value}
                  onChange={updateContent}
                />
              </ContentInsideWrap>
            </Wrap>
          </Editor>
        </EditorContainer>

        <Buttons>
          {isMobile ? (
            <Button
              label={discard}
              onClick={() => setIsDiscardModalShowing(true)}
              variant="link"
              primary
              error
              data-cy={discard}
            />
          ) : (
            <Button
              label={cancel}
              onClick={cancelArticle}
              variant="link"
              primary
              data-cy={cancel}
            />
          )}
          <Button
            label={next}
            onClick={nextStep}
            primary
            data-cy={next}
            disabled={isNextEnabled}
          />
        </Buttons>
      </Container>
    );
  }
  return (
    <Container>
      <DiscardConfirmation
        isOpen={isDiscardModalShowing}
        closeModal={() => setIsDiscardModalShowing(false)}
        onDiscard={router.back}
        title={discardModal.title}
        subtitle={discardModal.description}
      />
      <EditorContainer>
        <Wrapper>
          {!isMobile && <StoryPreview title={title} image={file ? file : ''} />}
          <Inputs description={{ caption, topics }} register={register} values={watch()} onInputChange={handleInputChange} />
        </Wrapper>
      </EditorContainer>

      <DiscardModal
        isOpen={deleteCardAlert}
        closeModal={deleteCardHandler}
        cancel={closeDeleteCardModal}
        title={discardModal.title}
        description={discardModal.description}
        buttonLabel={discardModal.submitButton}
        skipButtonLabel={discardModal.cancelButton}
      />
      <ArticleStepTwo
        goBack={() => setCreateStep(createStep - 1)}
        disabled={!isValid}
        publish={publish1}
        discardClick={discardClick}
        discardMobileClick={() => setIsDiscardModalShowing(true)}
      />
    </Container>
  );
};

export default CreateArticleStep1;
