import React, { useRef } from 'react';
import ModalElement from 'components/Modal/Modal';
import useOutsideAlerter from 'common/hooks/useOutsideAlerter';
import { UploadMediaProps } from './type';
import { Container } from './style';
import UploadMediaContent from '.';

const UploadMediaModal = ({ isOpen, closeModal, onSubmit }: UploadMediaProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  useOutsideAlerter({
    ref: wrapperRef,
    outSideClick: closeModal,
  });
  return (
    <ModalElement isOpen={isOpen} closeModal={closeModal}>
      <Container ref={wrapperRef}>
        <UploadMediaContent onAdd={onSubmit} />
      </Container>
    </ModalElement>
  );
};

export default UploadMediaModal;
