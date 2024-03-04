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
    createJobSteps: { details: { whoYouArePopup } },
    addRequirementsPlaceholder,
    addRequirements,
  },
} = lang;

type WhoYouArePopOverProps = {
  jobData: JobDetailData;
  onClose: () => void;
  handleJobEdit: (jobData: JobDetailData) => void;
};

const WhoYouArePopOver = ({
  jobData, onClose, handleJobEdit,
} : WhoYouArePopOverProps) => {
  const [jobDetail, setJobDetail] = useState<JobDetailData>(jobData);

  const handleInputChange = (selected: string[]) => {
    setJobDetail({ ...jobDetail, requirements: selected });
  };
  return (
    <ModalContent>
      <ModalContentHeader>
        {whoYouArePopup.heading}
      </ModalContentHeader>
      <ModalSubText>
        {whoYouArePopup.subText}
      </ModalSubText>
      <AddMoreContainer>
        <MultiInput
          inputs={jobDetail.requirements}
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

export default WhoYouArePopOver;
