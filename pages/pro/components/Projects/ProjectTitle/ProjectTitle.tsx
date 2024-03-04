import Input from 'components/input/SimpleInput';
import { InputType } from 'components/input/types';
import WordCounter from 'components/WordCounter/WordCounter';
import lang from 'common/lang';
import { ChangeEvent, useState } from 'react';
import { ProjectHeading, WordCounterWrapper } from 'pages/pro/components/Projects/ProjectTitle/styles';
import { ProjectTitleProps } from 'pages/pro/components/Projects/types';

const { projects } = lang;

const ProjectTitle = ({ value, setValue, maxCharacters }: ProjectTitleProps) => {
  const [, setError] = useState<boolean>(false);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val?.length > maxCharacters) {
      setError(true);
    } else {
      setError(false);
      setValue(val);
    }
  };
  return (
    <ProjectHeading>
      <Input
        placeholder={projects.titlePlaceholder}
        labelText={projects.titleLabel}
        id="title"
        type={InputType.TEXT}
        value={value}
        onChange={handleChange}
        data-cy="projectTitle"
      />
      <WordCounterWrapper>
        <WordCounter total={maxCharacters} count={value?.length || 0} />
      </WordCounterWrapper>
    </ProjectHeading>
  );
};

export default ProjectTitle;
