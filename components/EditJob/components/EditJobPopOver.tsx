import React from 'react';
import lang from 'common/lang';
import { DividerComp } from 'components/Divider/styles';
import ButtonComp from 'components/buttonComp';
import { PublishButton } from 'pages/jobs/details/styles';
import { JobDetailData } from 'pages/jobs/details/types';
import {
  Buttons,
  ChevronRight, MainMenuElement, MainMenuText, ModalContent, ModalContentHeader, ModalSubText, ModalText,
} from '../styles';
import { EDIT_JOB_DATA, EDIT_JOB_VIEW_TYPE } from '../types';

const {
  jobs: {
    editJobSteps,
  },
} = lang;

type EditJobPopOverProps = {
  jobData: JobDetailData;
  changeView: (value: EDIT_JOB_VIEW_TYPE) => void;
  onClose: () => void;
  handleJobEdit: (jobData: JobDetailData) => void;
};

const EditJobPopOver = ({
  jobData, changeView, onClose, handleJobEdit,
} : EditJobPopOverProps) => {
  return (
    <ModalContent>
      <ModalContentHeader>
        {editJobSteps.editHeading}
      </ModalContentHeader>
      <ModalSubText>
        {editJobSteps.editSubText}
      </ModalSubText>
      <DividerComp />
      {EDIT_JOB_DATA.map((item) => {
        return (
          <>
            <MainMenuElement onClick={() => { changeView(item.value); }}>
              <MainMenuText>
                {item.title}
                {item.isOptional && <ModalText>{editJobSteps.optional}</ModalText>}
              </MainMenuText>
              <ChevronRight height="11px" width="5.5px" />
            </MainMenuElement>
            <DividerComp />
          </>
        );
      })}
      <Buttons>
        <ButtonComp
          label="Cancel"
          variant="link"
          onClick={onClose}
        />
        <PublishButton onClick={() => { handleJobEdit(jobData); }} primary={true} label="Save" />
      </Buttons>
    </ModalContent>
  );
};

export default EditJobPopOver;
