import React from 'react';
import { ToastContainer } from 'react-toastify';
import Divider from 'components/Divider/Divider';
import lang from 'common/lang';
import {
  ButtonGroupDeleteModal,
  DeleteModalContainer,
  EditName,
  SkipButton,
  SubmitButton,
} from './style';
type DeleteModalProps = {
    onClose: () => void;
    onDelete: () => void;
}
const {
  profile: {
    block: {
      delete: {
        messageTitle, description, submitButton, cancelButton,
      },
    },
  },
} = lang;
const DeleteModal = ({ onClose, onDelete }: DeleteModalProps) => {
  return (
    <DeleteModalContainer>
      <ToastContainer
        position="top-center"
        hideProgressBar
        style={{
          width: '100%',
          maxWidth: '906px',
        }}
      />
      <EditName component="h2">{messageTitle}</EditName>
      <EditName component="h4">{description}</EditName>
      <Divider />
      <ButtonGroupDeleteModal>
        <SubmitButton primary label={submitButton} data-cy="deleteBlock" onClick={onDelete} />
        <SkipButton
          primary
          variant="link"
          label={cancelButton}
          onClick={onClose}
          data-cy="deleteCancel"
        />
      </ButtonGroupDeleteModal>
    </DeleteModalContainer>
  );
};

export default DeleteModal;
