import React from 'react';
import { ToastContainer } from 'react-toastify';
import Divider from 'components/Divider/Divider';
import {
  ButtonGroupDeleteModal,
  DeleteModalContainer,
  EditName,
  SkipButton,
  SubmitButton,
  DynamicTag,
} from './style';
import { DeleteType } from '../components/WorkExperience/type';
type DeleteModalProps = {
  onClose: () => void;
  onDelete: () => void;
  deleteType: DeleteType;
  dynamicContent: string;
};

const DeleteModal = ({
  onClose,
  onDelete,
  deleteType,
  dynamicContent,
}: DeleteModalProps) => {
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
      <EditName component="h2">{deleteType.title}</EditName>
      <EditName component="h4">
        {deleteType.description1}
        <DynamicTag>{dynamicContent}</DynamicTag>
        {deleteType.description2}
      </EditName>
      <Divider />
      <ButtonGroupDeleteModal>
        <SubmitButton
          primary
          label={deleteType.submitButton}
          data-cy="deleteBlock"
          onClick={onDelete}
        />
        <SkipButton
          primary
          variant="link"
          label={deleteType.cancelButton}
          onClick={onClose}
          data-cy="deleteCancel"
        />
      </ButtonGroupDeleteModal>
    </DeleteModalContainer>
  );
};

export default DeleteModal;
