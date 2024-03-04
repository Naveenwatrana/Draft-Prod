import lang from 'common/lang';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { theme } from 'common/theme';
import { useTags } from 'common/hooks/useTags';
import { yupResolver } from '@hookform/resolvers/yup';
import { SKILL_FILTER } from 'common/constants';
import ButtonComp from 'components/buttonComp';
import AsyncSelectInput from 'components/Select/AsyncSelect';
import { InfoDescriptionVariant } from 'components/Atoms/InfoBlock/type';
import { IOption } from 'components/MultipleInputTextArea/types';
import { Divider } from 'components/DiscardModal/styles';
import { SaveButton } from 'pages/pro/styles';
import {
  ModalContentForm,
  ModalContentWrapper,
} from 'components/Modal/style';
import SliderRanger from 'pages/jobs/components/SliderRanger';
import TrashIcon from 'components/Icons/TrashIcon';
import AddIcon from 'components/Icons/AddIcon';
import {
  SkillPopupHeading,
  SkillPopupSubHeading,
  SkillPopupContent,
  ButtonWrapper,
  SliderPlaceHolderContainer,
  SliderMarkerData,
  SliderMarkerDataOption,
  SkillsContainer,
  Skill,
  SkillSliderSection,
  SkillName,
  SkillSlider,
  RemoveSkill,
  ButtonTypography,
  ButtonContainer,
  SkillDescriptionInfo,
  SkillsDivider,
} from './style';
import { SkillPopupProps, ISkillValues } from './type';
import { schema } from './schema';
const {
  jobs: {
    createJobSteps: {
      details: { skillPopup },
    },
  },
} = lang;

const SkillsModal = ({ onClose, data, save }: SkillPopupProps) => {
  const {
    formState: { isValid },
    setValue,
    watch,
    handleSubmit,
  } = useForm<ISkillValues>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: data || {},
  });
  const [showSkillInput, setShowSkillInput] = useState(false);
  const maxSkills = 10;
  const { loadAsyncOption } = useTags(SKILL_FILTER);
  const watchedOptions = watch('skillsAndTechnologiesUsed');
  const handleSelectChange = (selected: IOption | null) => {
    if (
      selected
      && !watchedOptions?.some((option) => option.value === selected.value)
    ) {
      setValue(
        'skillsAndTechnologiesUsed',
        [...(watchedOptions || []), { ...selected, importanceScale: 4 }],
        {
          shouldValidate: true,
          shouldDirty: true,
        },
      );
      setShowSkillInput(false);
    }
  };

  const handleCancelSelect = (tag: IOption) => {
    setValue(
      'skillsAndTechnologiesUsed',
      watchedOptions?.filter((selectedTag) => selectedTag.value !== tag.value),
      {
        shouldValidate: true,
        shouldDirty: true,
      },
    );
  };

  const handlePriorityChange = (selected: IOption | null, [firstValue]: number[]) => {
    if (selected) {
      const watchData = watchedOptions;
      watchData.forEach((elem, i) => {
        if (elem.value === selected.value) {
          watchData[i].importanceScale = firstValue;
        }
      });
      setValue(
        'skillsAndTechnologiesUsed',
        [...watchData],
        {
          shouldValidate: true,
          shouldDirty: true,
        },
      );
    }
  };

  return (
    <ModalContentWrapper>
      <ModalContentForm width={634} onSubmit={handleSubmit(save)}>
        <SkillPopupHeading>{skillPopup.skillPopupHeading}</SkillPopupHeading>
        <SkillsDivider />
        <SkillPopupSubHeading>
          {skillPopup.skillPopupSubHeading}
        </SkillPopupSubHeading>
        <SkillPopupContent>
          {skillPopup.skillPopupContentOne}
        </SkillPopupContent>
        <SkillPopupContent>
          {skillPopup.skillPopupContentTwo}
        </SkillPopupContent>
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
        <SkillPopupContent>
          {skillPopup.skillPopupContentThree}
        </SkillPopupContent>
        {!!watchedOptions?.length && (
          <SkillsContainer>
            {watchedOptions?.map((tag) => (
              <Skill key={tag.value}>
                <SkillSliderSection>
                  <SkillName>{tag.label}</SkillName>
                  <SkillSlider>
                    <SliderRanger
                      showThumb={true}
                      val={[tag.importanceScale || 0]}
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
            disabled={watch('skillsAndTechnologiesUsed')?.length === maxSkills}
          />
        )}
        {(!showSkillInput) && (!watchedOptions?.length || watchedOptions?.length < maxSkills) && (
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
        {watchedOptions?.length >= maxSkills && (
          <SkillDescriptionInfo variant={InfoDescriptionVariant.PRIMARY}>
            {skillPopup.error}
          </SkillDescriptionInfo>
        )}
        <Divider />
        <ButtonWrapper>
          <ButtonComp
            label={skillPopup.cancel}
            variant="link"
            onClick={onClose}
            data-cy="close"
          />
          <SaveButton
            label={skillPopup.save}
            disabled={!isValid}
            primary
            type="submit"
            data-cy="submit"
          />
        </ButtonWrapper>
      </ModalContentForm>
    </ModalContentWrapper>
  );
};

export default SkillsModal;
