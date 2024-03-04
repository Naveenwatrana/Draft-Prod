import { useTags } from 'common/hooks/useTags';
import { useState } from 'react';
import lang from 'common/lang';
import Loader from 'components/Loader/Loader';
import TagSelect from 'components/Atoms/TagSelect';
import { IOption } from 'components/MultipleInputTextArea/types';
import { TagsContainer } from 'pages/pro/components/Projects/SideProject/Edit/style';
import { MyOptionType } from 'components/Select/types';
import { TitleText } from 'components/Atoms/TitleText';
import { TagsLoaderContainer } from 'components/Atoms/TagsLoaderComponent';
import AsyncSelectInput from 'components/Select/AsyncSelect';
import { SKILL_FILTER } from 'common/constants';
import {
  SubtitleText, TextContainer,
} from './styles';

export type TagsForContentProps = {
    tagsValue?: IOption[];
    onTagChange: React.Dispatch<IOption[]>;
};

const { tags } = lang.article;

const TagsForContent = ({ tagsValue, onTagChange }: TagsForContentProps) => {
  const { tagListResult } = useTags();
  const fieldValue = {
    skills: [
      { id: '1', value: 'React', label: 'React' },
    ],
  };
  const [selectedSearchedTags, setSelectedSearchedTags] = useState<IOption[]>(
    [],
  );

  const handleSelectChange = (selected: MyOptionType | null) => {
    if (selected && !fieldValue.skills?.some((option) => option.value === selected.value)) {
      setSelectedSearchedTags([...selectedSearchedTags, { ...selected }]);
      onTagChange(
        [...(fieldValue.skills || []), { ...selected }],
      );
    }
  };
  const handleCancelSelect = (tag: IOption) => {
    setSelectedSearchedTags(
      selectedSearchedTags.filter(
        (selectedTag) => selectedTag.value !== tag.value,
      ),
    );
  };
  const { loadAsyncOption } = useTags(SKILL_FILTER);
  return (
    <TextContainer>
      <TitleText>{tags.title}</TitleText>
      <SubtitleText>{tags.subtitle}</SubtitleText>
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
        placeHolder={tags.placeholder}
        data-cy="skillsAndTechnologiesUsedInput"
        onChange={handleSelectChange}
        disabled={tagsValue?.length === 20}
      />

      <TagsLoaderContainer isLoading={tagListResult.isLoading}>
        <Loader fullScreen={false} />
      </TagsLoaderContainer>
    </TextContainer>
  );
};

export default TagsForContent;
