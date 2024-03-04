import React, { useState } from 'react';
import lang from 'common/lang';
import { DividerComp } from 'components/Divider/styles';
import ButtonComp from 'components/buttonComp';
import { PublishButton } from 'pages/jobs/details/styles';
import { IconWrapper } from 'components/Atoms/IconWrapper';
import ChevronLeft from 'components/Icons/LeftChevron';

import SelectInput from 'components/Select/Select';
import { roleTypeOptions, totalPeopleManagedOptions } from 'pages/pro/components/WorkExperience/const';
import { JobDetailData } from 'pages/jobs/details/types';
import {
  Buttons,
  FormElement, FormElementHeading, ModalContent, ModalContentHeader, ModalText,
} from '../styles';

const {
  jobs: {
    createJobSteps: { details: { whatWillYouDoPopup } },
    editJobSteps,
  },
  profile: {
    block: {
      workExperience: {
        form: { roleType },
      },
    },
  },
} = lang;

type ExperiencePopOverProps = {
  onBack: (jobData?: JobDetailData) => void;
  jobData: JobDetailData;
};

const ExperiencePopOver = ({ onBack, jobData } : ExperiencePopOverProps) => {
  const [jobDetail, setJobDetail] = useState<JobDetailData>(jobData);
  const disabledButton = !jobDetail.roleType || (jobDetail.roleType?.value === roleType.peopleManager && !jobDetail.range);
  return (
    <ModalContent>
      <ModalContentHeader>
        <IconWrapper onClick={() => onBack()}>
          <ChevronLeft />
        </IconWrapper>
        {editJobSteps.experienceHeading}
      </ModalContentHeader>
      <DividerComp />
      <FormElement>
        <FormElementHeading>
          {whatWillYouDoPopup.roleType.label}
        </FormElementHeading>
        <ModalText>
          {editJobSteps.roleTypeSubText}
        </ModalText>
        <SelectInput
          options={roleTypeOptions}
          labelText=""
          id="roleType"
          value={jobDetail.roleType?.label}
          placeHolder={whatWillYouDoPopup.roleType.placeholder}
          onChange={(e) => setJobDetail({ ...jobDetail, roleType: e, range: null })}
          data-cy="roleType"
        />
      </FormElement>
      {jobDetail.roleType?.value === roleType.peopleManager && (
        <FormElement>
          <FormElementHeading>
            {whatWillYouDoPopup.range.label}
          </FormElementHeading>
          <ModalText>
            {whatWillYouDoPopup.range.subLabel}
          </ModalText>
          <SelectInput
            options={totalPeopleManagedOptions}
            labelText=""
            id="range"
            placeHolder={whatWillYouDoPopup.range.placeholder}
            value={jobDetail.range?.value}
            data-cy="totalPeopleManagedInput"
            onChange={(e) => setJobDetail({ ...jobDetail, range: e })}
          />
        </FormElement>
      )}
      <DividerComp />
      <Buttons>
        <ButtonComp
          label="Cancel"
          variant="link"
          onClick={() => onBack()}
        />
        <PublishButton disabled={disabledButton} primary={true} onClick={() => onBack(jobDetail)} label="Confirm" />
      </Buttons>
    </ModalContent>
  );
};

export default ExperiencePopOver;
