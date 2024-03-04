import React, { useRef, useState } from 'react';
import ImageCropper from 'components/CardCreationWizard/components/CardWorkArea/ImageCropper';
import { StyledCard } from 'components/cards/PreviewCard/styles';
import Video from 'components/VideoPlayer';
import { MuteIcnWrapper } from 'components/DefaultCard/styles';
import MuteIcon from 'components/Icons/MuteIcon';
import lang from 'common/lang';
import UploadMediaContent from 'pages/post/components/uploadMedia';
import ButtonComp from 'components/buttonComp';
import CropIcon from 'components/Icons/CropIcon';
import TrashIcon from 'components/Icons/TrashIcon';
import useOutsideAlerter from 'common/hooks/useOutsideAlerter';
import {
  CardContainer, CardWrapper, IconsContainer, UploadMediaCard,
} from './style';
import { PreviewCardProps } from './type';
const {
  posts: { crop, delete: deleteIconLabel },
} = lang;
const PreviewCard = ({
  fileEditing,
  file,
  onFileCropping,
  onEditFile,
  modalOpen,
  onInputChange,
  onFileUpload,
  onImageDelete,
  closeModal,
}: PreviewCardProps) => {
  const [mute, setMute] = useState(true);
  const wrapperRef = useRef<HTMLDivElement>(null);
  useOutsideAlerter({
    ref: wrapperRef,
    outSideClick: () => closeModal?.(),
  });
  return (
    <CardWrapper>
      <CardContainer>
        {fileEditing && file?.sourceUrl && (
          <ImageCropper
            handleEditImage={onEditFile}
            imageUrl={file.sourceUrl}
          />
        )}
        {modalOpen && onInputChange && onFileUpload && (
          <UploadMediaCard ref={wrapperRef}>
            <UploadMediaContent
              onAdd={onFileUpload}
              showFileSpecification={false}
              showAspectRatioInfo
            />
          </UploadMediaCard>
        )}
        {!fileEditing && !modalOpen && file?.id && (
          <StyledCard
            image={file.url}
          >
            {file.isVideo && file.url && (
              <Video media={file.url} mute={mute} isStopped={false} />
            )}
            {file.isVideo && (
              <MuteIcnWrapper>
                <MuteIcon active={mute} onClick={() => setMute(!mute)} />
              </MuteIcnWrapper>
            )}
            <IconsContainer>
              {!file.isVideo
              && (
                <ButtonComp
                  onClick={() => !file.isVideo && onFileCropping()}
                  label={(
                    <div>
                      <CropIcon />
                      <div>{crop}</div>
                    </div>
                  )}
                />
              )}
              <ButtonComp
                onClick={() => onImageDelete(file.id)}
                label={(
                  <div>
                    <TrashIcon variant="small" />
                    <div>{deleteIconLabel}</div>
                  </div>
                )}
              />
            </IconsContainer>
          </StyledCard>
        )}
      </CardContainer>
    </CardWrapper>
  );
};

export default PreviewCard;
