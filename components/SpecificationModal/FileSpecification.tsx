import React from 'react';
import ModalElement from 'components/Modal/Modal';
import ButtonComp from 'components/buttonComp';
import lang from 'common/lang';
import {
  Buttons,
  FileSpecificationContainer, FileSpecificationDd, Divider, Dl, FileSpecificationDt, FileSpecificationTitle,
} from './styles';
import { FileSpecificationProps } from './types';

const {
  fileSpecificationModal: {
    title,
    images,
    imagesExtension,
    imagesSize,
    imagesDimension,
    videos,
    videosExtension,
    videosSize,
    videosLength,
    videosEncoding,
    videosDimension,
  },
} = lang;
const { close } = lang.buttonText;

const FileSpecification = ({
  isOpen,
  closeModal,
}: FileSpecificationProps) => {
  return (
    <ModalElement isOpen={isOpen} centered position={2} closeModal={closeModal}>
      <FileSpecificationContainer>
        <FileSpecificationTitle>{title}</FileSpecificationTitle>
        <Dl>
          <FileSpecificationDt>{images}</FileSpecificationDt>
          <FileSpecificationDd>{imagesExtension}</FileSpecificationDd>
          <FileSpecificationDd>{imagesSize}</FileSpecificationDd>
          <FileSpecificationDd>{imagesDimension}</FileSpecificationDd>
          <FileSpecificationDt>{videos}</FileSpecificationDt>
          <FileSpecificationDd>{videosExtension}</FileSpecificationDd>
          <FileSpecificationDd>{videosSize}</FileSpecificationDd>

          <FileSpecificationDd>{videosLength}</FileSpecificationDd>
          <FileSpecificationDd>{videosEncoding}</FileSpecificationDd>
          <FileSpecificationDd>{videosDimension}</FileSpecificationDd>
        </Dl>
        <Divider />
        <Buttons>
          <ButtonComp
            onClick={closeModal}
            primary
            variant="link"
            label={close}
          />
        </Buttons>
      </FileSpecificationContainer>
    </ModalElement>
  );
};

export default FileSpecification;
