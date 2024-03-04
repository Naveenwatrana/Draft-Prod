import {
  SkillTag, SkillsContainer,
} from 'pages/pro/components/Projects/ViewProject/styles';
import { SkillTagsProps } from '../types';

const SkillTags = ({ tags }: SkillTagsProps) => {
  return (
    <SkillsContainer>
      {tags?.map((tag) => (
        <SkillTag key={`${tag.id}education`} selected={tag.selected}>
          <span>{tag.tag}</span>
        </SkillTag>
      ))}
    </SkillsContainer>
  );
};

export default SkillTags;
