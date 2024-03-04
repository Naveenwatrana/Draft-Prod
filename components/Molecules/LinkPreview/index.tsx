import lang from 'common/lang';
import { KeyboardEvent, useRef, useState } from 'react';
import { useIsMobile } from 'common/hooks/useIsMobile';
import ViewLinkUploadedImage from 'components/Atoms/ViewUploadImage/ViewLinkPreviewImage';
import ImageUpload from 'components/ImageUpload/ImageUpload';
import {
  Container, Heading, StoryImg, StoryText, Content, StoryTitle,
} from './style';
import { LinkPreviewProps } from './types';

const WebsiteLink = ({ link }: { link: string }) => (
  <>
    <span>{link}</span>
    <br />
    <br />
  </>
);
const { linkPreview, addLinkTitle } = lang.linkPosts;
const { imageUpload } = lang.article;

const LinkPreview = ({
  title, image, websiteLink, onUploadLogo, error, file, removeImage, setTitle,
}: LinkPreviewProps) => {
  const [linkImage, setLinkImage] = useState<string>(image);
  const linkTitle = useRef<HTMLDivElement | null>(null);
  const isMobile = useIsMobile();
  const onImageLoadError = () => {
    setLinkImage('');
  };
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (linkTitle?.current && linkTitle.current.innerText.length >= 130 && e.code !== 'Backspace') {
      e.preventDefault();
      return;
    }
    if (e.code === 'Enter') {
      e.preventDefault();
    }
  };
  const handleBlurTitleField = () => {
    if (linkTitle.current) {
      setTitle(linkTitle.current.innerText);
    }
  };
  return (
    <Container>
      <Heading component="h4">{linkPreview}</Heading>
      <Content>
        {linkImage && <StoryImg onError={onImageLoadError} width={440} height={288} src={linkImage} alt={linkPreview} />}
        {file && <ViewLinkUploadedImage file={file} setFile={removeImage} />}
        {(!linkImage && !file)
                  && (
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
                      styles={{
                        container: {
                          borderRadius: '12px 12px 0 0',
                        },
                      }}
                    />
                  )}
        <StoryText>
          {websiteLink && <WebsiteLink link={websiteLink} />}
          <StoryTitle
            ref={linkTitle}
            dangerouslySetInnerHTML={{ __html: title }}
            contentEditable
            onKeyDown={handleKeyDown}
            data-ph={addLinkTitle}
            onKeyUp={handleBlurTitleField}
          />
        </StoryText>
      </Content>
    </Container>
  );
};

export default LinkPreview;
