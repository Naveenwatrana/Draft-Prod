import React, { useState } from 'react';
import lang from 'common/lang';
import { DividerComp } from 'components/Divider/styles';
import ButtonComp from 'components/buttonComp';
import { PublishButton } from 'pages/jobs/details/styles';
import { IconWrapper } from 'components/Atoms/IconWrapper';
import ChevronLeft from 'components/Icons/LeftChevron';
import AsyncSelectInput from 'components/Select/AsyncSelect';
import { JobDetailData } from 'pages/jobs/details/types';
import { CancelableTagsContainer } from 'pages/jobs/create/details/style';
import { IOption } from 'components/MultipleInputTextArea/types';
import { useTags } from 'common/hooks/useTags';
import { LANGUAGES } from 'common/constants';
import CancelIcon from 'components/Icons/CrossIcon';
import { theme } from 'common/theme';
import {
  Buttons,
  FormElement, FormElementHeading, LanguageTag, ModalContent, ModalContentHeader, ModalText,
} from '../styles';
const {
  jobs: {
    createJobSteps: { details: { whoYouArePopup } },
    editJobSteps,
  },
} = lang;

type LanguagePopOverProps = {
  onBack: (jobData?: JobDetailData) => void;
  jobData: JobDetailData;
};

const LanguagePopOver = ({ onBack, jobData } : LanguagePopOverProps) => {
  const [jobDetail, setJobDetail] = useState<JobDetailData>(jobData);
  const { loadAsyncOption } = useTags(LANGUAGES);

  const handleCancelSelect = (tag: IOption) => {
    const languages = jobDetail.languages?.filter((selectedTag) => selectedTag.value !== tag.value);
    setJobDetail({ ...jobDetail, languages });
  };

  const handleSelectChange = (selected: IOption | null) => {
    if (
      selected
      && !jobDetail.languages?.some((option) => option.value === selected.value)
    ) {
      const languages = [...(jobDetail.languages || []), { ...selected }];
      setJobDetail({ ...jobDetail, languages });
    }
  };

  return (
    <ModalContent>
      <ModalContentHeader>
        <IconWrapper onClick={() => onBack(jobDetail)}>
          <ChevronLeft />
        </IconWrapper>
        {editJobSteps.languageHeading}
      </ModalContentHeader>
      <DividerComp />
      <FormElement>
        <FormElementHeading>
          {editJobSteps.languageField}
        </FormElementHeading>
        <ModalText>
          {whoYouArePopup.languageSubText}
        </ModalText>
        {!!jobDetail.languages?.length && (
          <CancelableTagsContainer>
            {jobDetail.languages?.map((tag: IOption) => (
              <LanguageTag key={tag.value}>
                {tag.label}
                <CancelIcon
                  color={theme.palette.gray[100].value}
                  size={16}
                  variant="small"
                  onClick={(e) => {
                    e?.stopPropagation();
                    handleCancelSelect(tag);
                  }}
                  data-testid="cancelSelect"
                />
              </LanguageTag>
            ))}
          </CancelableTagsContainer>
        )}
        <AsyncSelectInput
          loadAsyncOption={loadAsyncOption}
          labelText=""
          id="languages"
          placeHolder={whoYouArePopup.inputPlaceholder}
          onChange={handleSelectChange}
          data-cy="skillsAndTechnologiesUsedInput"
          disabled={jobDetail.languages?.length === 20}
        />
      </FormElement>
      <DividerComp />
      <Buttons>
        <ButtonComp
          label="Cancel"
          variant="link"
          onClick={() => onBack(jobDetail)}
        />
        <PublishButton primary={true} onClick={() => onBack(jobDetail)} label="Confirm" />
      </Buttons>
    </ModalContent>
  );
};

export default LanguagePopOver;
