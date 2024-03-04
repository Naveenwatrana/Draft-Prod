import ModalElement from 'components/Modal/Modal';
import React, { useRef } from 'react';
import useOutsideAlerter from 'common/hooks/useOutsideAlerter';
import lang from 'common/lang';
import CropIcon from 'components/Icons/CropIcon';
import ReorderIcon from 'components/Icons/ReorderIcon';
import TrashIcon from 'components/Icons/TrashIcon';
import CancelIcon from 'components/Icons/CrossIcon';
import {
  Button, ButtonsContainer, Container, StyledButtonLabel, TitleContainer,
} from './style';
import { EditModalProps } from '../uploadMedia/type';
const {
  posts: {
    crop,
    options,
    remove,
    reorderLabel,
  },
} = lang;
const EditModal = ({
  closeModal,
  isOpen,
  onCrop,
  onDelete,
  onReorder,
}: EditModalProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  useOutsideAlerter({
    ref: wrapperRef,
    outSideClick: closeModal,
  });
  return (
    <ModalElement isOpen={isOpen} closeModal={closeModal}>
      <Container ref={wrapperRef}>
        <TitleContainer>
          <div>{options}</div>
          <CancelIcon onClick={closeModal} />
        </TitleContainer>
        <ButtonsContainer>
          <Button onClick={onCrop}>
            <CropIcon />
            <StyledButtonLabel>{crop}</StyledButtonLabel>
          </Button>
          <Button onClick={onReorder}>
            <ReorderIcon />
            <StyledButtonLabel>{reorderLabel}</StyledButtonLabel>
          </Button>
          <Button onClick={onDelete}>
            <TrashIcon variant="small" />
            <StyledButtonLabel>{remove}</StyledButtonLabel>
          </Button>
        </ButtonsContainer>
      </Container>
    </ModalElement>
  );
};

export default EditModal;
