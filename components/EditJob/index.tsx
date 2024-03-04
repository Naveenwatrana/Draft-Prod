import ModalElement from 'components/Modal/Modal';
import React, { useState } from 'react';
import { JobDetailData } from 'pages/jobs/details/types';
import { EDIT_JOB_VIEW_TYPE } from './types';
import EditJobPopOver from './components/EditJobPopOver';
import RolePopOver from './components/RolePopOver';
import SalaryPopOver from './components/SalaryPopOver';
import ExperiencePopOver from './components/ExperiencePopOver';
import LocationPopOver from './components/LoctionPopOver';
import LanguagePopOver from './components/LanguagePopOver';
import SkillsPopOver from './components/SkillsPopOver';
import WhoYouArePopOver from './components/WhoYouArePopOver';
import WhatWillYouDoPopOver from './components/WhatWillYouDoPopOver';

type EditJobProps = {
  jobDetailData: JobDetailData;
  onClose: () => void;
  handleJobEdit: (jobData: JobDetailData) => void;
  dataView?:string;
};

const EditJob = ({
  jobDetailData, onClose, handleJobEdit, dataView,
} : EditJobProps) => {
  const [view, setView] = useState(dataView || EDIT_JOB_VIEW_TYPE.MAIN);
  const [jobData, setJobData] = useState(jobDetailData);

  const handleBack = (data?: JobDetailData) => {
    if (data) {
      setJobData(data);
    }
    setView(EDIT_JOB_VIEW_TYPE.MAIN);
  };

  return (
    <ModalElement isOpen={true} shouldCloseOnOverlayClick>
      {view === EDIT_JOB_VIEW_TYPE.MAIN && (
        <EditJobPopOver jobData={jobData} onClose={onClose} handleJobEdit={handleJobEdit} changeView={(value: EDIT_JOB_VIEW_TYPE) => { setView(value); }} />
      )}
      {view === EDIT_JOB_VIEW_TYPE.ROLE && <RolePopOver jobData={jobData} onBack={handleBack} />}
      {view === EDIT_JOB_VIEW_TYPE.SALARY && <SalaryPopOver jobData={jobData} onBack={handleBack} />}
      {view === EDIT_JOB_VIEW_TYPE.SKILLS && <SkillsPopOver jobData={jobData} onBack={handleBack} />}
      {view === EDIT_JOB_VIEW_TYPE.EXPERIENCE && <ExperiencePopOver jobData={jobData} onBack={handleBack} />}
      {view === EDIT_JOB_VIEW_TYPE.LOCATION && <LocationPopOver jobData={jobData} onBack={handleBack} />}
      {view === EDIT_JOB_VIEW_TYPE.LANGUAGES && <LanguagePopOver jobData={jobData} onBack={handleBack} />}
      {view === EDIT_JOB_VIEW_TYPE.WHOYOUARE && (
        <WhoYouArePopOver jobData={jobData} onClose={onClose} handleJobEdit={handleJobEdit} />
      )}
      {view === EDIT_JOB_VIEW_TYPE.WHATWILLYOUDO && (
        <WhatWillYouDoPopOver jobData={jobData} onClose={onClose} handleJobEdit={handleJobEdit} />
      )}
    </ModalElement>
  );
};

export default EditJob;
