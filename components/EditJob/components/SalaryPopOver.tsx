import React, { useState } from 'react';
import lang from 'common/lang';
import { DividerComp } from 'components/Divider/styles';
import ButtonComp from 'components/buttonComp';
import { PublishButton } from 'pages/jobs/details/styles';
import { IconWrapper } from 'components/Atoms/IconWrapper';
import ChevronLeft from 'components/Icons/LeftChevron';
import { JobDetailData } from 'pages/jobs/details/types';
import PriceRange from 'components/Atoms/PriceRange';
import {
  Buttons,
  FormElement, FormElementHeading, ModalContent, ModalContentHeader, ModalText,
} from '../styles';

const {
  jobs: {
    createJobSteps: { details: { whoYouArePopup } },
    salaryRangeInvalid,
  },
} = lang;

type SalaryPopOverProps = {
  onBack: (jobData?: JobDetailData) => void;
  jobData: JobDetailData;
};

const SalaryPopOver = ({ onBack, jobData } : SalaryPopOverProps) => {
  const [jobDetail, setJobDetail] = useState<JobDetailData>(jobData);
  const disabledButton = !jobDetail.salaryFrom || !jobDetail.salaryTo
  || (jobDetail.salaryFrom > jobDetail.salaryTo) || (jobDetail.oteFrom && jobDetail.oteTo && (jobDetail.oteFrom > jobDetail.oteTo));
  return (
    <ModalContent>
      <ModalContentHeader>
        <IconWrapper onClick={() => onBack()}>
          <ChevronLeft />
        </IconWrapper>
        Salary
      </ModalContentHeader>
      <DividerComp />
      <FormElement>
        <FormElementHeading>
          {whoYouArePopup.basicSalary}
        </FormElementHeading>
        <ModalText>
          {whoYouArePopup.basicSalaryContent}
        </ModalText>
        <PriceRange
          range={[jobDetail.salaryFrom, jobDetail.salaryTo]}
          onRangeChange={(rangeToUpdate) => {
            setJobDetail({ ...jobDetail, salaryFrom: rangeToUpdate[0], salaryTo: rangeToUpdate[1] });
          }}
          dataCys={['salaryFrom', 'salaryTo']}
          error={(jobDetail.salaryFrom && jobDetail.salaryTo && jobDetail.salaryFrom > jobDetail.salaryTo) ? { message: salaryRangeInvalid, type: 'error' } : undefined}
        />
      </FormElement>
      <DividerComp />
      <FormElement>
        <FormElementHeading>
          {whoYouArePopup.targetEarningHeading}
        </FormElementHeading>
        <ModalText>
          {whoYouArePopup.targetEarningContent}
        </ModalText>
        <PriceRange
          range={[jobDetail.oteFrom, jobDetail.oteTo]}
          onRangeChange={(rangeToUpdate) => {
            setJobDetail({ ...jobDetail, oteFrom: rangeToUpdate[0], oteTo: rangeToUpdate[1] });
          }}
          dataCys={['oteFrom', 'oteTo']}
          error={(jobDetail.oteFrom && jobDetail.oteTo && jobDetail.oteFrom > jobDetail.oteTo) ? { message: salaryRangeInvalid, type: 'error' } : undefined}
        />
      </FormElement>
      <DividerComp />
      <Buttons>
        <ButtonComp
          label="Cancel"
          variant="link"
          onClick={() => onBack()}
        />
        <PublishButton disabled={disabledButton || false} primary={true} onClick={() => onBack(jobDetail)} label="Confirm" />
      </Buttons>
    </ModalContent>
  );
};

export default SalaryPopOver;
