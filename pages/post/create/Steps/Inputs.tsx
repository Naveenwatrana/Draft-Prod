import lang from 'common/lang';
import React from 'react';
import { StyledDivider } from 'components/Divider/styles';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import { MyOptionType } from 'components/Select/types';
import AsyncSelectInput from 'components/Select/AsyncSelect';
import { useTags } from 'common/hooks/useTags';
import TagSelect from 'components/Atoms/TagSelect';
import { WordCounterWrapper } from 'components/inputComp/styles';
import WordCounter from 'components/WordCounter/WordCounter';
import { CAPTION_MAX_LENGTH, TAGS_MAX_LENGTH } from 'common/constants';
import HashtagInput from 'components/CardCreationWizard/components/HashtagInput';
import {
  CaptionContainer,
  InputSubText,
  InputTitle,
  InputsContainer,
  TopicsContainer,
  TagSelectDiv,
} from './style';
import { ICreatePost } from '../type';

const {
  posts: {
    input: { caption, topics },
  },
} = lang;
type Props<T extends FieldValues> = {
  register: UseFormRegister<T>;
  values: T;
  onInputChange: (
    key: keyof ICreatePost,
    value: ICreatePost[keyof ICreatePost],
  ) => void;
  description?: {
    caption: {
      title: string;
      subtext: string;
      placeholder: string;
    };
    topics: {
      title: string;
      subtext: string;
      placeholder: string;
    };
  },
}
const Inputs = <T extends FieldValues, >({
  register,
  values,
  onInputChange,
  description = {
    caption,
    topics,
  },
}: Props<T>) => {
  const handleCancelableSelect = (
    selected: MyOptionType | null,
    options: MyOptionType[],
    key: keyof ICreatePost,
  ) => {
    if (
      selected
      && !options?.some((option) => option.value === selected.value)
    ) {
      onInputChange(key, [...(options || []), { ...selected }]);
    }
  };
  const handleCancelSelect = (
    tag: MyOptionType,
    options: MyOptionType[],
    key: keyof ICreatePost,
  ) => onInputChange(
    key,
    options?.filter((selectedTag) => selectedTag.value !== tag.value),
  );
  const { loadAsyncOption } = useTags();
  return (
    <InputsContainer>
      <CaptionContainer>
        <InputTitle>{description.caption.title}</InputTitle>
        <InputSubText>{description.caption.subtext}</InputSubText>
        <HashtagInput
          value={values?.caption || ''}
          onChange={(value: string) => {
            onInputChange('caption', value.trim());
          }}
          placeHolder={values?.caption?.length === 0 ? description.caption.placeholder : undefined}
          limit={CAPTION_MAX_LENGTH}
        />
      </CaptionContainer>
      <StyledDivider />
      <TopicsContainer>
        <InputTitle>{description.topics.title}</InputTitle>
        <InputSubText>{description.topics.subtext}</InputSubText>
        {!!values.tags?.length && (
          <TagSelectDiv>
            {values.tags?.map((tag: MyOptionType) => (
              <TagSelect
                key={tag.value}
                label={tag.label}
                isSelected
                withCrossIcon
                cancelSelect={() => handleCancelSelect(tag, values.tags, 'tags')}
              />
            ))}
          </TagSelectDiv>
        )}
        <AsyncSelectInput
          loadAsyncOption={loadAsyncOption}
          labelText=""
          id="tags"
          height={89}
          color="#282629"
          borderColor="#39363B"
          placeHolder={topics.placeholder}
          onChange={(value) => handleCancelableSelect(value, values.tags, 'tags')}
          data-cy="skillsAndTechnologiesUsedInput"
          disabled={values.tags?.length >= TAGS_MAX_LENGTH}
        />
        <WordCounterWrapper>
          <WordCounter error={values.tags?.length > TAGS_MAX_LENGTH} total={TAGS_MAX_LENGTH} count={values.tags?.length || 0} />
        </WordCounterWrapper>
      </TopicsContainer>
    </InputsContainer>
  );
};

export default Inputs;
