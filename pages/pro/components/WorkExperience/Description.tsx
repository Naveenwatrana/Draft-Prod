import lang from 'common/lang';
import React, { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import ButtonComp from 'components/buttonComp';
import { IOption } from 'components/MultipleInputTextArea/types';
import { useTags } from 'common/hooks/useTags';
import ProjectDescription from 'components/Description/Description';
import Divider from 'components/Divider/Divider';
import AsyncSelectInput from 'components/Select/AsyncSelect';
import DescriptionInfo from 'components/Atoms/InfoBlock/Description';
import { MyOptionType } from 'components/Select/types';
import TagSelect from 'components/Atoms/TagSelect';
import { InfoDescriptionVariant } from 'components/Atoms/InfoBlock/type';
import { SKILL_FILTER } from 'common/constants';
import {
  BackButton, Buttons, ModalSubTitle, SaveButton, SkillsInputArea,
} from './styles';
import { DescriptionProps, IExperienceDescriptionValues, descriptionSchema } from './type';
import { maxDescriptionCharacters } from '../Projects/constant';
import { CancelableTagsContainer, InputTitle } from '../Projects/SideProject/Edit/style';
const {
  profile: {
    cancel,
    save: saveBtnLabel,
    back,
    block: {
      workExperience: {
        form: { skillsAndTechnologiesUsed, roleDescription, description },
      },
    },
  },
} = lang;

const Description = ({
  save,
  cancelEdit,
  data,
  handleBack,
  onValidate,
  validated,
  isExperienceDirty,
}: DescriptionProps) => {
  const {
    formState: { isValid, isDirty, errors },
    setValue,
    watch,
    handleSubmit,
  } = useForm<IExperienceDescriptionValues>({
    resolver: yupResolver(descriptionSchema),
    mode: 'onChange',
    defaultValues: data || {},
  });
  const { loadAsyncOption } = useTags(SKILL_FILTER);
  const watchedOptions = watch('skillsAndTechnologiesUsed');
  const handleSelectChange = (selected: MyOptionType | null) => {
    if (selected && !watchedOptions?.some((option) => option.value === selected.value)) {
      setValue(
        'skillsAndTechnologiesUsed',
        [...(watchedOptions || []), { ...selected }],
        {
          shouldValidate: true,
          shouldDirty: true,
        },
      );
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
  useEffect(() => {
    if (isDirty) onValidate();
  }, [isDirty, onValidate]);
  const buttonDisabled = useMemo(() => {
    return (!isValid || !!Object.keys(errors)?.length) || !validated || (!isExperienceDirty && !validated) || !isExperienceDirty;
  }, [errors, isExperienceDirty, isValid, validated]);
  return (
    <form onSubmit={handleSubmit(save)}>
      <Divider />
      <SkillsInputArea>
        <InputTitle component="h6">{skillsAndTechnologiesUsed.label}</InputTitle>
        <ModalSubTitle>{skillsAndTechnologiesUsed.placeholder}</ModalSubTitle>
        {!!watchedOptions?.length
        && (
          <CancelableTagsContainer>
            {watchedOptions?.map((tag) => (
              <TagSelect
                key={tag.value}
                label={tag.label}
                isSelected
                withCrossIcon
                cancelSelect={() => handleCancelSelect(tag)}
              />
            ))}
          </CancelableTagsContainer>
        )}
        <div>
          <AsyncSelectInput
            loadAsyncOption={loadAsyncOption}
            labelText=""
            id="skillsAndTechnologiesUsed"
            placeHolder={skillsAndTechnologiesUsed.inputPlaceholder}
            data-cy="skillsAndTechnologiesUsedInput"
            onChange={handleSelectChange}
            disabled={watchedOptions?.length === 20}
          />
        </div>
        {watchedOptions?.length >= 20 && <DescriptionInfo variant={InfoDescriptionVariant.WARNING} content={skillsAndTechnologiesUsed.error} />}
      </SkillsInputArea>
      <Divider />
      <SkillsInputArea>
        <InputTitle component="h6">{description.label}</InputTitle>
        <ModalSubTitle>{description.placeholder}</ModalSubTitle>
        <ProjectDescription
          placeholder={description.subtitle}
          value={watch('roleDescription')}
          setValue={(e) => setValue('roleDescription', e, {
            shouldValidate: true,
            shouldDirty: true,
          })}
          height={168}
          maxCharacters={maxDescriptionCharacters}
        />
      </SkillsInputArea>
      <Divider />
      <Buttons>
        <BackButton
          label={back}
          onClick={() => handleBack(watch())}
          variant="link"
          primary
          data-cy="back"
        />
        <ButtonComp
          label={cancel}
          onClick={cancelEdit}
          variant="link"
          primary
          data-cy="cancel"
        />
        <SaveButton
          label={saveBtnLabel}
          type="submit"
          disabled={buttonDisabled}
          primary
          data-cy="saveBtn"
        />
      </Buttons>
    </form>
  );
};

export default Description;
