import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import lang from 'common/lang';
import ButtonComp from 'components/buttonComp';
import TagSelect from 'components/Atoms/TagSelect';
import { useEffect, useMemo, useState } from 'react';
import { IOption } from 'components/MultipleInputTextArea/types';
import { useTags } from 'common/hooks/useTags';
import { MyOptionType } from 'components/Select/types';
import AsyncSelectInput from 'components/Select/AsyncSelect';
import Divider from 'components/Divider/Divider';
import DescriptionInfo from 'components/Atoms/InfoBlock/Description';
import ProjectDescription from 'components/Description/Description';
import { IProjectPicture } from 'pages/pro/types';
import ImageUploadProjects from 'components/ImageUpload/ImageUploadProjects';
import { Buttons, SaveButton } from 'components/Atoms/ResumeFormButtonsContainer/styles';
import { InfoDescriptionVariant } from 'components/Atoms/InfoBlock/type';
import { IImage } from 'components/ImageUpload/types';
import { SKILL_FILTER } from 'common/constants';
import {
  DescriptionProps,
  IDescriptionProjectValues,
  descriptionSchema,
} from './types';
import {
  AddSkillsButton,
  BackButton,
  InputTitle,
  Label,
  ModalSubTitle,
  SkillsInputArea,
  TagsContainer,
} from './style';
import { ITagResponse } from '../../types';
import { maxDescriptionCharacters } from '../../constant';
import { AddMediaLabelContainer } from '../../styles';

const {
  profile: {
    cancel, back, save: saveButtonLabel, addSkills,
  },
  projects: {
    form: { skillsAndTechnologiesUsed, description, skillsAndTechnologiesUsedUnassociated },
    addMediaLabel,
    fileSpecification,
  },
  onBoarding: { image },
} = lang;
const Description = ({
  data, cancelEdit, onBack, save, validated, onValidate, isProjectDirty,
}: DescriptionProps) => {
  const {
    formState: { isValid, isDirty, errors },
    setValue,
    watch,
    handleSubmit,
  } = useForm<IDescriptionProjectValues>({
    resolver: yupResolver(descriptionSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      ...data,
    },
  });
  const [selectedTags, setSelectedTags] = useState<IOption[]>([]);
  const [selectedSearchedTags, setSelectedSearchedTags] = useState<IOption[]>(
    [],
  );
  const [tagsSelectShow, setTagsSelectShow] = useState<boolean>(false);
  const [maxTagError, setMaxTagError] = useState<boolean>(false);
  useEffect(() => {
    if (!data?.providedSkillsAndTechnologiesUsed?.tags?.length) {
      setTagsSelectShow(true);
    }
  }, [data]);
  const watchedOptions = watch('skillsAndTechnologiesUsed');
  const toggleSelect = (tag: ITagResponse) => {
    const selectedOptions = watchedOptions?.some(
      (selectedTag) => selectedTag.value === tag.id,
    )
      ? watchedOptions?.filter((selectedTag) => selectedTag.value !== tag.id)
      : [...(watchedOptions || []), { value: tag.id, label: tag.tag }];
    setValue('skillsAndTechnologiesUsed', selectedOptions, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };
  useEffect(() => {
    setMaxTagError(selectedSearchedTags.length + (data?.providedSkillsAndTechnologiesUsed?.tags?.length || 0) >= 20);
  }, [data, selectedSearchedTags]);
  const { loadAsyncOption } = useTags(SKILL_FILTER);
  const handleProvidedCancelTag = (tag: ITagResponse) => {
    setSelectedTags(
      selectedTags.filter(
        (selectedTag) => selectedTag.value !== tag.id,
      ),
    );
  };
  const handleCancelSelect = (tag: IOption) => {
    setSelectedSearchedTags(
      selectedSearchedTags.filter(
        (selectedTag) => selectedTag.value !== tag.value,
      ),
    );
    setValue(
      'skillsAndTechnologiesUsed',
      watchedOptions?.filter((selectedTag) => selectedTag.value !== tag.value),
      {
        shouldValidate: true,
        shouldDirty: true,
      },
    );
  };
  const handleSelectChange = (selected: MyOptionType | null) => {
    const providedSelectedTag = data?.providedSkillsAndTechnologiesUsed?.tags?.find((tag) => Number(tag.id) === Number(selected?.value));
    if (providedSelectedTag && !watchedOptions?.some((option) => Number(option.value) === Number(selected?.value))) {
      toggleSelect(providedSelectedTag);
    } else if (selected && !watchedOptions?.some((option) => Number(option.value) === Number(selected.value))) {
      setSelectedSearchedTags([...selectedSearchedTags, { ...selected }]);
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

  const isAssociated = useMemo(
    () => !!data?.providedSkillsAndTechnologiesUsed?.tags?.length,
    [data],
  );

  useEffect(() => {
    if (isDirty) onValidate();
  }, [isDirty, onValidate]);

  useEffect(() => {
    if (data?.skillsAndTechnologiesUsed?.length && (data?.providedSkillsAndTechnologiesUsed?.tags?.length || 0) < 20) {
      setSelectedSearchedTags(
        (watchedOptions || [])?.filter((option) => !data.providedSkillsAndTechnologiesUsed?.tags?.some(
          (tag) => Number(tag.id) === Number(option.value),
        )),
      );
    }
  }, [data, watchedOptions]);

  const buttonDisabled = useMemo(() => {
    return (!isValid || !!Object.keys(errors)?.length) || !validated || (!isProjectDirty && !validated) || !isProjectDirty;
  }, [errors, isProjectDirty, isValid, validated]);

  return (
    <form onSubmit={handleSubmit(save)}>
      <Divider />
      <SkillsInputArea>
        <InputTitle component="h6">{skillsAndTechnologiesUsed.label}</InputTitle>
        <ModalSubTitle>{isAssociated ? skillsAndTechnologiesUsed.placeholder : skillsAndTechnologiesUsedUnassociated.placeholder}</ModalSubTitle>
        {(isAssociated || !!selectedSearchedTags?.length) && (
          <>
            <div>
              <TagsContainer>
                {data?.providedSkillsAndTechnologiesUsed?.tags?.map((tag) => (
                  <TagSelect
                    key={tag.id}
                    label={tag.tag}
                    isSelected={
                      !!watchedOptions?.some(
                        (selectedTag) => selectedTag.value === tag.id,
                      )
                    }
                    toggleSelect={() => toggleSelect(tag)}
                    cancelSelect={() => handleProvidedCancelTag(tag)}
                  />
                ))}
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
            </div>
            {!tagsSelectShow && !maxTagError
          && (
            <AddSkillsButton
              label={addSkills}
              onClick={() => setTagsSelectShow(true)}
              variant="link"
              primary
              data-cy="backEditProject"
            />
          )}
          </>
        )}
        {tagsSelectShow && (
          <>
            <AsyncSelectInput
              loadAsyncOption={loadAsyncOption}
              labelText={isAssociated ? addSkills : ''}
              id="skillsAndTechnologiesUsed"
              placeHolder={skillsAndTechnologiesUsed.inputPlaceholder}
              data-cy="skillsAndTechnologiesUsedInput"
              onChange={handleSelectChange}
              disabled={maxTagError}
            />
            {!maxTagError && isAssociated && <DescriptionInfo content={skillsAndTechnologiesUsed.infoDescription} /> }
          </>
        )}
        {maxTagError && (
          <DescriptionInfo
            variant={InfoDescriptionVariant.WARNING}
            content={isAssociated ? skillsAndTechnologiesUsed.warningDescriptionForAssociated : skillsAndTechnologiesUsed.warningDescription}
          />
        )}
      </SkillsInputArea>
      <Divider />
      <SkillsInputArea>
        <InputTitle component="h6">{description.label}</InputTitle>
        <ModalSubTitle>{description.subtitle}</ModalSubTitle>
        <ProjectDescription
          placeholder={description.placeholder}
          value={watch('description') || ''}
          setValue={(e) => setValue('description', e, {
            shouldValidate: true,
            shouldDirty: true,
          })}
          height={180}
          maxCharacters={maxDescriptionCharacters}
        />
      </SkillsInputArea>
      <div>
        <AddMediaLabelContainer>
          <Label component="h6">{addMediaLabel}</Label>
          <Label component="h6">{fileSpecification}</Label>
        </AddMediaLabelContainer>
        <ImageUploadProjects
          updateValue={(files: IProjectPicture[], fieldName) => setValue(fieldName as keyof IDescriptionProjectValues, files, {
            shouldValidate: true,
            shouldDirty: true,
          })}
          labelText={image.imageInputLabel}
          info={image.imageInputInfo}
          persistedImages={watch('image') as IImage[]}
          savedImages={data?.savedImages}
          setDeletedImages={(e) => setValue('deletedImages', e, {
            shouldValidate: true,
            shouldDirty: true,
          })}
        />
      </div>
      <Divider />
      <Buttons>
        <BackButton
          label={back}
          onClick={() => onBack(watch())}
          variant="link"
          primary
          data-cy="backEditProject"
        />
        <ButtonComp
          label={cancel}
          onClick={cancelEdit}
          variant="link"
          primary
          data-cy="cancelEditProject"
        />
        <SaveButton
          label={saveButtonLabel}
          type="submit"
          disabled={buttonDisabled}
          primary
          data-cy="saveEditProject"
        />
      </Buttons>
    </form>
  );
};

export default Description;
