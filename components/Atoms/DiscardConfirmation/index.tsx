import ModalElement from 'components/Modal/Modal';
import React, { useRef } from 'react';
import useOutsideAlerter from 'common/hooks/useOutsideAlerter';
import lang from 'common/lang';
import { DividerComp } from 'components/Divider/styles';
import ButtonComp from 'components/buttonComp';
import { DiscardModalProps } from '../../../pages/post/components/uploadMedia/type';
import { Buttons, Container, TitleContainer } from './style';
const {
  posts: {
    discardModal: { title: discardModalTitle, subtitle: discardModalSubtitle },
  },
  buttonText: { discard: discardModalText, cancel: discardModalCancel },
} = lang;
const DiscardConfirmation = ({
  closeModal, isOpen, onDiscard, title, subtitle, cancel, discard,
}: DiscardModalProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  useOutsideAlerter({
    ref: wrapperRef,
    outSideClick: closeModal,
  });
  return (
    <ModalElement isOpen={isOpen} closeModal={closeModal}>
      <Container ref={wrapperRef}>
        <TitleContainer>
          <div>{title || discardModalTitle}</div>
          <div>{subtitle || discardModalSubtitle}</div>
        </TitleContainer>
        <DividerComp />
        <Buttons>
          <ButtonComp label={cancel || discardModalCancel} variant="link" onClick={closeModal} data-testid="cancelDiscardButton" />
          <ButtonComp label={discard || discardModalText} onClick={onDiscard} data-testid="deleteDiscardButton" />
        </Buttons>
      </Container>
    </ModalElement>
  );
};

export default DiscardConfirmation;
