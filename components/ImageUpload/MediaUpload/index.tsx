import React, { useState } from 'react';
import { SUPPORTED_IMAGE_VIDEO_FORMATS } from 'common/constants';
import { InputType } from 'components/input/types';
import { useDropzone } from 'react-dropzone';
import lang from 'common/lang';
import FileUploadIcon from 'components/Icons/FileUploadIcon';
import FileSpecification from 'components/SpecificationModal/FileSpecification';
import { useIsMobile } from 'common/hooks/useIsMobile';
import ButtonComp from 'components/buttonComp';
import { DividerComp } from 'components/Divider/styles';
import {
  Container,
  InputContainer,
  SelectTextContainer,
  SelectSubText,
  SelectText,
  Content,
  InfoText,
  ErrorToast,
  FileSpecificationText,
  FooterContainer,
} from './style';
import { MediaUploadProps } from '../types';
const {
  onBoarding: {
    image: {
      imageError,
      upload: {
        select, dropFile, fileInfo, aspectRatio,
      },
    },
  },
  fileSpecificationModal,
} = lang;
const MediaUpload = ({
  onDrop,
  onChange,
  error,
  errorMessage,
  accept,
  showAspectRatioInfo,
  showFileSpecification = true,
  ...props
}: MediaUploadProps) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: accept || SUPPORTED_IMAGE_VIDEO_FORMATS,
    onDrop,
  });
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  return (
    <Container>
      {isOpen && <FileSpecification isOpen={isOpen} closeModal={() => setIsOpen(false)} />}
      {error && <ErrorToast>{errorMessage || imageError}</ErrorToast>}
      <InputContainer {...isMobile ? {} : getRootProps()} error={error}>
        <FileUploadIcon />
        <Content>
          <SelectTextContainer>
            <SelectText>{select}</SelectText>
            {!isMobile && <SelectSubText>{dropFile}</SelectSubText>}
          </SelectTextContainer>
        </Content>
        <div>
          {fileInfo.map((information) => (
            <InfoText key={information}>{information}</InfoText>
          ))}
        </div>
        {showAspectRatioInfo
        && (
          <FooterContainer>
            <DividerComp />
            <InfoText>
              {aspectRatio}
            </InfoText>
          </FooterContainer>
        )}
        {isMobile ? (
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <ButtonComp label="Upload" />
          </div>
        )
          : (
            <input
              id="image"
              multiple
              type={InputType.FILE}
              data-cy="image-upload"
              {...props}
              {...getInputProps({ onChange })}
            />
          )}
      </InputContainer>
      {showFileSpecification
      && (
        <FileSpecificationText onClick={() => setIsOpen(true)}>
          {fileSpecificationModal.title}
        </FileSpecificationText>
      )}
    </Container>
  );
};

export default MediaUpload;
