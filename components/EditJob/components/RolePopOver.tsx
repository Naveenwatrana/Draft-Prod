import React, { useState } from 'react';
import lang from 'common/lang';
import { DividerComp } from 'components/Divider/styles';
import ButtonComp from 'components/buttonComp';
import { PublishButton } from 'pages/jobs/details/styles';
import { IconWrapper } from 'components/Atoms/IconWrapper';
import ChevronLeft from 'components/Icons/LeftChevron';
import AsyncSelectInput from 'components/Select/AsyncSelect';
import { useFunctionalRoles } from 'common/hooks/useFunctionalRoles';

import {
  CustomLabel,
  InputWrapper,
  TextArea,
} from 'components/inputComp/styles';
import { FindRoleTxt } from 'pages/jobs/create/role/style';
import FindRolePopup from 'pages/jobs/create/role/FindRolePopup';
import { MyOptionType } from 'components/Select/types';
import SelectInput from 'components/Select/Select';
import { employmentTypeOptions } from 'pages/pro/components/WorkExperience/const';
import { JobDetailData } from 'pages/jobs/details/types';
import {
  Buttons,
  FormElement,
  FormElementHeading,
  ModalContent,
  ModalContentHeader,
  ModalText,
} from '../styles';

const {
  jobs: {
    createJobSteps: { role, details: { whoYouArePopup } },
    editJobSteps,
  },
} = lang;

type RolePopOverProps = {
  onBack: (jobData?: JobDetailData) => void;
  jobData: JobDetailData;
};

const RolePopOver = ({ onBack, jobData } : RolePopOverProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [jobDetail, setJobDetail] = useState<JobDetailData>(jobData);
  const { loadAsyncOption: loadAsyncFunctionalRoles } = useFunctionalRoles();
  const disabledButton = !jobDetail.title || jobDetail.title === '' || !jobDetail.role || !jobDetail.employmentType;
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <ModalContent>
      <ModalContentHeader>
        <IconWrapper onClick={() => onBack()}>
          <ChevronLeft />
        </IconWrapper>
        {editJobSteps.roleHeading}
      </ModalContentHeader>
      <DividerComp />
      <FormElement>
        <FormElementHeading>
          {editJobSteps.jobTitle}
        </FormElementHeading>
        <ModalText>
          {editJobSteps.jobTitleSubText}
        </ModalText>
        <InputWrapper>
          <CustomLabel>
            <TextArea
              id="role"
              value={jobDetail.title}
              onChange={(e) => setJobDetail({ ...jobDetail, title: e.target.value })}
              placeholder={role.placeholder}
              large={false}
              maxLength={50}
            />
          </CustomLabel>
        </InputWrapper>
      </FormElement>
      <FormElement>
        <FormElementHeading>
          {role.roleType.label}
        </FormElementHeading>
        <ModalText>
          {editJobSteps.roleSubText}
        </ModalText>
        <InputWrapper>
          <AsyncSelectInput
            loadAsyncOption={loadAsyncFunctionalRoles}
            labelText=""
            id="roleType"
            placeHolder={role.roleType.placeholder}
            value={{ ...jobDetail.role, label: jobDetail.role?.name || '', value: jobDetail.role?.id || '' }}
            data-cy="roleTypeInput"
            onChange={(selected: MyOptionType | null) => setJobDetail({ ...jobDetail, role: { id: selected?.value || '0', name: selected?.label || '' } })}
          />
          <FindRoleTxt onClick={handleOpen}>{role.findRoleTxt}</FindRoleTxt>
          <FindRolePopup isOpen={open} onClose={handleClose} />
        </InputWrapper>
      </FormElement>
      <FormElement>
        <FormElementHeading>
          {whoYouArePopup.employmentTypeLabel}
        </FormElementHeading>
        <SelectInput
          options={employmentTypeOptions}
          id="employmentType"
          placeHolder={whoYouArePopup.inputPlaceholder}
          value={jobDetail.employmentType?.label}
          onChange={(e) => setJobDetail({ ...jobDetail, employmentType: e })}
          data-cy="employmentType"
        />
      </FormElement>
      <DividerComp />
      <Buttons>
        <ButtonComp
          label="Cancel"
          variant="link"
          onClick={() => onBack()}
        />
        <PublishButton disabled={disabledButton} primary={true} label="Confirm" onClick={() => onBack(jobDetail)} />
      </Buttons>
    </ModalContent>
  );
};

export default RolePopOver;
