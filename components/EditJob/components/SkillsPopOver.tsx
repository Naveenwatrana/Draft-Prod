import React, { useState } from 'react';
import lang from 'common/lang';
import { DividerComp } from 'components/Divider/styles';
import ButtonComp from 'components/buttonComp';
import { PublishButton } from 'pages/jobs/details/styles';
import { IconWrapper } from 'components/Atoms/IconWrapper';
import ChevronLeft from 'components/Icons/LeftChevron';
import { ITag, JobDetailData } from 'pages/jobs/details/types';
import {
  ButtonContainer,
  ButtonTypography,
  RemoveSkill, Skill, SkillName, SkillSlider, SkillSliderSection, SliderMarkerData, SliderMarkerDataOption, SliderPlaceHolderContainer,
} from 'pages/jobs/create/details/style';
import { useTags } from 'common/hooks/useTags';
import { SKILL_FILTER } from 'common/constants';
import { theme } from 'common/theme';
import SliderRanger from 'pages/jobs/components/SliderRanger';
import { SkillsContainer } from 'components/Molecules/SkillsYouHave/styles';
import TrashIcon from 'components/Icons/TrashIcon';
import AsyncSelectInput from 'components/Select/AsyncSelect';
import { IOption } from 'components/MultipleInputTextArea/types';
import AddIcon from 'components/Icons/AddIcon';
import {
  Buttons,
  FormElement,
  FormElementHeading,
  ModalContent, ModalContentHeader, ModalText,
} from '../styles';

const {
  jobs: {
    createJobSteps: { details: { skillPopup } },
  },
} = lang;

type SkillsPopOverProps = {
  onBack: (jobData?: JobDetailData) => void;
  jobData: JobDetailData;
};

const SkillsPopOver = ({ onBack, jobData } : SkillsPopOverProps) => {
  const maxSkills = 10;
  const [jobDetail, setJobDetail] = useState<JobDetailData>(jobData);
  const [showSkillInput, setShowSkillInput] = useState(false);
  const { loadAsyncOption } = useTags(SKILL_FILTER);

  const handleCancelSelect = (tag: ITag) => {
    const skills = jobDetail.skills?.filter((selectedTag) => selectedTag.id !== tag.id);
    setJobDetail({ ...jobDetail, skills });
  };

  const handleSelectChange = (tag: IOption | null) => {
    if (tag && !jobDetail.skills?.some((option) => option.id.toString() === tag.value)) {
      const skill = {
        id: tag.value, tag: tag.label, pivot: { importance_scale: 4 }, type: SKILL_FILTER,
      };
      const skills = [...jobDetail.skills, skill];
      setJobDetail({ ...jobDetail, skills });
    }
  };

  const handlePriorityChange = (tag: ITag, value: number[]) => {
    if (tag) {
      const watchData = jobDetail.skills || [];
      watchData.forEach((elem, i) => {
        if (elem.id === tag.id) {
          watchData[i].pivot = { importance_scale: value[0] || 4 };
        }
      });
      setJobDetail({ ...jobDetail, skills: watchData });
    }
  };
  const disabledButton = !jobDetail.skills?.length;
  return (
    <ModalContent>
      <ModalContentHeader>
        <IconWrapper onClick={() => onBack()}>
          <ChevronLeft />
        </IconWrapper>
        Skills
      </ModalContentHeader>
      <DividerComp />
      <FormElementHeading>
        Skills and technologies
      </FormElementHeading>
      <ModalText>
        {skillPopup.skillPopupContentOne}
      </ModalText>
      <ModalText>
        {skillPopup.skillPopupContentTwo}
      </ModalText>
      <SliderPlaceHolderContainer>
        <SliderRanger
          showThumb={false}
          rangeStyle={{
            width: '88%',
          }}
        />
        <SliderMarkerData>
          {skillPopup.skillSliderTitels.map((val) => (
            <SliderMarkerDataOption key={val}>
              {val}
            </SliderMarkerDataOption>
          ))}
        </SliderMarkerData>
      </SliderPlaceHolderContainer>
      <ModalText>
        {skillPopup.skillPopupContentThree}
      </ModalText>
      <FormElement>
        {!!jobDetail.skills?.length && (
          <SkillsContainer>
            {jobDetail.skills?.map((tag) => (
              <Skill key={tag.id}>
                <SkillSliderSection>
                  <SkillName>{tag.tag}</SkillName>
                  <SkillSlider>
                    <SliderRanger
                      showThumb={true}
                      val={[tag.pivot?.importance_scale || 4]}
                      onChange={(values) => { handlePriorityChange(tag, values); }}
                    />
                  </SkillSlider>
                </SkillSliderSection>
                <RemoveSkill>
                  <TrashIcon color={theme.palette.white[100].value} size={16} onClick={() => handleCancelSelect(tag)} />
                </RemoveSkill>
              </Skill>
            ))}
          </SkillsContainer>
        )}
        {showSkillInput && (
          <AsyncSelectInput
            loadAsyncOption={loadAsyncOption}
            labelText=""
            id="skillsAndTechnologiesUsed"
            placeHolder={skillPopup.inputPlaceholder}
            onChange={handleSelectChange}
            data-cy="skillsAndTechnologiesUsedInput"
            disabled={jobDetail.skills?.length >= maxSkills}
          />
        )}
      </FormElement>
      {(!showSkillInput) && (!jobDetail.skills?.length || jobDetail.skills?.length < maxSkills) && (
        <ButtonContainer
          onClick={() => {
            setShowSkillInput(true);
          }}
          data-cy="addSkillButton"
        >
          <AddIcon />
          <ButtonTypography>{skillPopup.addSkill}</ButtonTypography>
        </ButtonContainer>
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

export default SkillsPopOver;
