import Input from 'components/input/SimpleInput';
import { InputType } from 'components/input/types';
import { ChangeEvent, useState } from 'react';
import WordCounter from 'components/WordCounter/WordCounter';
import { InputWordCountContainer, WordCounterWrapper } from './styles';
import { InputWordCountProps } from './types';

const InputWordCount = ({
  value,
  setValue,
  maxCharacters,
  minCharacters = 0,
  placeholder = '',
  label = '',
  type = InputType.TEXT,
}: InputWordCountProps) => {
  const [error, setError] = useState<boolean>(false);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val?.length > maxCharacters && val?.length > minCharacters) {
      setError(true);
    } else {
      setError(false);
      setValue(val);
    }
  };
  return (
    <InputWordCountContainer>
      <Input
        placeholder={placeholder}
        labelText={label}
        id="title"
        type={type}
        value={value}
        onChange={handleChange}
        data-cy="projectTitle"
      />
      <WordCounterWrapper>
        <WordCounter total={maxCharacters} count={value?.length || 0} />
      </WordCounterWrapper>
    </InputWordCountContainer>
  );
};

export default InputWordCount;
