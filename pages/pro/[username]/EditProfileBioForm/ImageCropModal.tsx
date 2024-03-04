import Loader from 'components/Loader/Loader';
import ModalElement from 'components/Modal/Modal';
import { ModalContentForm, ModalContentWrapper } from 'components/Modal/style';
import React, { useState } from 'react';
import { DividerComp } from 'components/Divider/styles';
import ButtonComp from 'components/buttonComp';
import { SaveButton, Buttons } from 'components/Atoms/ResumeFormButtonsContainer/styles';
import ImageCropper from 'components/CardCreationWizard/components/CardWorkArea/ImageCropper';
import { getFileFromUrl } from 'components/CardCreationWizard/components/CardFields/CoverCardFields/util';
import lang from 'common/lang';
import { ModalHeading, ImgCropContainer, Container } from './style';
import { ICropProfileImageFields } from './type';

type IFile = {
  file: File;
  img: string;
}
const {
  ImageCropModal: {
    cropModalHeading,
  },
} = lang;
const ImageCropModal = ({ closeForm, uploadedFile, uploadCropImage }: ICropProfileImageFields) => {
  const [isLoading, setIsLoading] = useState(false);
  const [croppedImage, setCroppedImage] = useState<IFile>();
  const handleEditImage = async (img :string) => {
    const file = await getFileFromUrl(img);
    setCroppedImage({ file, img });
  };

  return (
    <ModalElement isOpen={true} centered position={2}>
      {isLoading && <Loader />}
      <ModalContentWrapper>
        <ModalContentForm
          onSubmit={(e) => {
            e.preventDefault();
            uploadCropImage(croppedImage);
          }}
        >
          <Container>
            <ModalHeading>
              {cropModalHeading}
            </ModalHeading>
            <ImgCropContainer>
              <ImageCropper cropImgWidth={400} cropImageHeight={400} handleEditImage={handleEditImage} imageUrl={uploadedFile} />
            </ImgCropContainer>
            <DividerComp style={{ marginTop: '80px' }} />
          </Container>
          <Buttons>
            <ButtonComp
              label="Cancel"
              onClick={() => {
                closeForm();
              }}
              variant="link"
            />
            <SaveButton
              label="Upload"
              type="submit"
              primary
            />
          </Buttons>
        </ModalContentForm>
      </ModalContentWrapper>
    </ModalElement>
  );
};

export default ImageCropModal;
