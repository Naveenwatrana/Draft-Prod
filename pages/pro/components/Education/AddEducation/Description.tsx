import ButtonComp from 'components/buttonComp';
import lang from 'common/lang';
import { BackButton, Buttons, SaveButton } from 'components/Atoms/ResumeFormButtonsContainer/styles';
import ProjectDescription from 'components/Description/Description';
import { useForm } from 'react-hook-form';
import Divider from 'components/Divider/Divider';
import { useEffect, useMemo, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import TagSelect from 'components/Atoms/TagSelect';
import { IOption } from 'components/MultipleInputTextArea/types';
import { MyOptionType } from 'components/Select/types';
import AsyncSelectInput from 'components/Select/AsyncSelect';
import { useTags } from 'common/hooks/useTags';
import { maxDescriptionCharacters } from 'pages/pro/components/Projects/constant';
import { InputTitle, TagsContainer } from 'pages/pro/components/Projects/SideProject/Edit/style';
import { ModalSubTitle, SkillsInputArea } from 'pages/pro/components/WorkExperience/styles';
import DescriptionInfo from 'components/Atoms/InfoBlock/Description';
import { InfoDescriptionVariant } from 'components/Atoms/InfoBlock/type';
import { SKILL_FILTER } from 'common/constants';
import { EducationDescriptionProps, descriptionSchema, IEducationFormDescriptionFields } from './types';

const { fields } = lang.profile.education;
const { cancel, save, back } = lang.buttonText;
const defaultValues = {
  skills: [],
  description: '',
};

const EducationDescription = ({
  closeForm, handleNext, onBack, data, validated, onValidate, isEducationDirty,
}: EducationDescriptionProps) => {
  const {
    watch,
    setValue,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<IEducationFormDescriptionFields>({
    resolver: yupResolver(descriptionSchema),
    defaultValues: data || defaultValues,
  });
  const { loadAsyncOption } = useTags(SKILL_FILTER);
  const [selectedSearchedTags, setSelectedSearchedTags] = useState<IOption[]>(
    [],
  );
  useEffect(() => {
    if (data?.skills?.length) {
      setSelectedSearchedTags(data?.skills);
    }
  }, [data]);

  useEffect(() => {
    if (isDirty) onValidate();
  }, [isDirty, onValidate]);

  const fieldValue = {
    skills: watch('skills'),
    description: watch('description'),
  };

  const handleSelectChange = (selected: MyOptionType | null) => {
    if (selected && !fieldValue.skills?.some((option) => option.value === selected.value)) {
      setSelectedSearchedTags([...selectedSearchedTags, { ...selected }]);
      setValue(
        'skills',
        [...(fieldValue.skills || []), { ...selected }],
        {
          shouldValidate: true,
          shouldDirty: true,
        },
      );
    }
  };
  const handleCancelSelect = (tag: IOption) => {
    setSelectedSearchedTags(
      selectedSearchedTags.filter(
        (selectedTag) => selectedTag.value !== tag.value,
      ),
    );
    setValue(
      'skills',
      fieldValue.skills?.filter((selectedTag) => selectedTag.value !== tag.value),
      {
        shouldValidate: true,
        shouldDirty: true,
      },
    );
  };
  const buttonDisabled = useMemo(() => {
    return (!isValid || !!Object.keys(errors)?.length) || !validated || (!isEducationDirty && !validated) || !isEducationDirty;
  }, [errors, isEducationDirty, isValid, validated]);
  return (
    <form onSubmit={handleSubmit(handleNext)}>
      <SkillsInputArea>
        <InputTitle>{fields.skills.label}</InputTitle>
        <ModalSubTitle>{fields.skills.description}</ModalSubTitle>
        <TagsContainer>
          {selectedSearchedTags.map((tag) => (
            <TagSelect
              key={tag.value}
              label={tag.label}
              isSelected
              withCrossIcon
              cancelSelect={() => handleCancelSelect(tag)}
            />
          ))}
        </TagsContainer>
        <AsyncSelectInput
          loadAsyncOption={loadAsyncOption}
          labelText=""
          id="skillsAndTechnologiesUsed"
          placeHolder={fields.skills.placeholder}
          data-cy="skillsAndTechnologiesUsedInput"
          onChange={handleSelectChange}
          disabled={fieldValue.skills?.length === 20}
        />
        {fieldValue.skills?.length === 20
        && <DescriptionInfo variant={InfoDescriptionVariant.WARNING} content={fields.skills.errorMessage} />}
      </SkillsInputArea>
      <Divider />
      <div>
        <ProjectDescription
          placeholder={fields.description.placeholder}
          label={fields.description.label}
          value={fieldValue.description || ''}
          setValue={(e) => setValue('description', e, {
            shouldValidate: true,
            shouldDirty: true,
          })}
          height={180}
          maxCharacters={maxDescriptionCharacters}
        />
      </div>
      <Divider />
      <Buttons>
        <BackButton
          label={back}
          onClick={() => onBack(watch())}
          variant="link"
          primary
          data-cy="backEditEducation"
        />
        <ButtonComp label={cancel} onClick={closeForm} variant="link" />
        <SaveButton label={save} type="submit" primary disabled={buttonDisabled} />
      </Buttons>
    </form>
  );
};

export default EducationDescription;
