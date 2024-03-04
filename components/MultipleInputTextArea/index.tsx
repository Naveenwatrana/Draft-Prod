import React, { useState } from 'react';
import { FieldError } from 'react-hook-form';
import { WordCounterWrapper } from 'components/Description/styles';
import WordCounter from 'components/WordCounter/WordCounter';
import {
  ReactSelectTextArea, ErrorText, Label, CountContainer,
} from './style';
import { IOption } from './types';
type MultipleInputTextAreaProps = {
  placeholder: string;
  label: string;
  options?: IOption[];
  value?: IOption[];
  onChange: React.Dispatch<IOption[]>;
  onInputChange: React.Dispatch<string>;
  isLoading?: boolean;
  error?: FieldError;
  maxWords?: number;
};
const MultipleInputTextArea = ({
  placeholder,
  label,
  options,
  value,
  onChange,
  onInputChange,
  isLoading,
  error,
  maxWords,
  ...rest
}: MultipleInputTextAreaProps) => {
  const [wordCountError, setWordCountError] = useState<boolean>(false);
  return (
    <>
      <Label component="h6">{label}</Label>
      <ReactSelectTextArea
        error={!!error?.message}
        isMulti
        value={value}
        onInputChange={onInputChange}
        onChange={(e) => {
          const updatedValue = e as IOption[];
          onChange(updatedValue);
          if (maxWords && updatedValue?.length && updatedValue.length > maxWords) {
            setWordCountError(true);
          } else {
            setWordCountError(false);
          }
        }}
        name="colors"
        options={options}
        className="basic-multi-select"
        placeholder={placeholder}
        classNamePrefix="select"
        isLoading={isLoading}
        {...rest}
      />
      <CountContainer>
        {maxWords && (
          <WordCounterWrapper>
            <WordCounter
              error={wordCountError}
              total={maxWords}
              count={value?.length || 0}
            />
          </WordCounterWrapper>
        )}
        {error && <ErrorText>{error.message}</ErrorText>}
      </CountContainer>
    </>
  );
};

export default MultipleInputTextArea;
