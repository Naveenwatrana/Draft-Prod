import cs from 'classnames';
import WordCounter from 'components/WordCounter/WordCounter';
import { ChangeEvent, useState } from 'react';
import {
  FieldLabel,
  Label, ProjectHeading, Textarea, WordCounterWrapper,
} from 'components/Description/styles';
import TextComp from 'components/textComp';
import { DescriptionProps } from './types';

const Description = ({
  maxCharacters, value, setValue, noLabel = true, placeholder, height, label,
}: DescriptionProps) => {
  const [error, setError] = useState<boolean>(false);
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    if (maxCharacters && val.length > maxCharacters) {
      setValue(val.slice(0, maxCharacters));
      setError(true);
    } else {
      setError(false);
      setValue(val);
    }
  };
  return (
    <ProjectHeading>
      <Label htmlFor="description">
        {!noLabel
        && <TextComp component="div" className="semibold12"><FieldLabel>{label ? label : 'Description'}</FieldLabel></TextComp>}
        {label && <TextComp component="div"><FieldLabel>{label ? label : 'Description'}</FieldLabel></TextComp>}
        <Textarea placeholder={placeholder} id="description" value={value} onChange={handleChange} className={cs('regular16')} height={height}></Textarea>
      </Label>
      {maxCharacters && (
        <WordCounterWrapper>
          <WordCounter error={error} total={maxCharacters} count={value?.length || 0} />
        </WordCounterWrapper>
      )}
    </ProjectHeading>
  );
};

export default Description;
