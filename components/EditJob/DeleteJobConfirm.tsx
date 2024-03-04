import ModalElement from 'components/Modal/Modal';
import lang from 'common/lang';

import React from 'react';
import ButtonComp from 'components/buttonComp';
import { DividerComp } from 'components/Divider/styles';
import { ErrorButton } from 'components/Molecules/JobNavbarCompact/style';
import { Buttons, ModalContent, ModalContentHeader } from './styles';
const { jobs } = lang;
type DeleteJobConfirmProps = {
  onClose: () => void;
  handleJobDelete: () => void;
};

const DeleteJobConfirm = ({
  onClose, handleJobDelete,
} : DeleteJobConfirmProps) => {
  return (
    <ModalElement isOpen={true} shouldCloseOnOverlayClick>
      <ModalContent width={500}>
        <ModalContentHeader>
          {jobs.deleteJob}
        </ModalContentHeader>
        {jobs.deleteSubText}
        <DividerComp />
        <Buttons>
          <ButtonComp
            label="Cancel"
            variant="link"
            onClick={onClose}
          />
          <ErrorButton onClick={handleJobDelete}>
            Yes, Delete
          </ErrorButton>
        </Buttons>
      </ModalContent>
    </ModalElement>
  );
};

export default DeleteJobConfirm;
