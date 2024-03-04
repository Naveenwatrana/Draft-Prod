import React, { useState } from 'react';
import lang from 'common/lang';
import { DividerComp } from 'components/Divider/styles';
import ButtonComp from 'components/buttonComp';
import { PublishButton } from 'pages/jobs/details/styles';
import { JobDetailData } from 'pages/jobs/details/types';
import MultiInput from 'components/Atoms/MultiInput';
import { AddMoreContainer } from 'pages/jobs/create/details/style';
import {
  Buttons,
  ModalContent, ModalContentHeader, ModalSubText,
} from '../styles';

const {
  jobs: {
    createJobSteps: { details: { whatWillYouDoPopup } },
    addRequirementsPlaceholder,
    addRequirements,
  },
} = lang;

type WhatWillYouDoPopOverProps = {
  jobData: JobDetailData;
  onClose: () => void;
  handleJobEdit: (jobData: JobDetailData) => void;
};

const WhatWillYouDoPopOver = ({
  jobData, onClose, handleJobEdit,
} : WhatWillYouDoPopOverProps) => {
  const [jobDetail, setJobDetail] = useState<JobDetailData>(jobData);

  const handleInputChange = (selected: string[]) => {
    setJobDetail({ ...jobDetail, responsibilities: selected });
  };
  return (
    <ModalContent>
      <ModalContentHeader>
        {whatWillYouDoPopup.title}
      </ModalContentHeader>
      <ModalSubText>
        {whatWillYouDoPopup.subText}
      </ModalSubText>
      <AddMoreContainer>
        <MultiInput
          inputs={jobDetail.responsibilities}
          onChange={(inputsToUpdate) => handleInputChange(inputsToUpdate)}
          inputPlaceholder={addRequirementsPlaceholder}
          buttonText={addRequirements}
        />
      </AddMoreContainer>
      <DividerComp />
      <Buttons>
        <ButtonComp
          label="Cancel"
          variant="link"
          onClick={onClose}
        />
        <PublishButton disabled={jobDetail.requirements.length === 0} onClick={() => { handleJobEdit(jobDetail); }} primary={true} label="Save" />
      </Buttons>
    </ModalContent>
  );
};

export default WhatWillYouDoPopOver;
