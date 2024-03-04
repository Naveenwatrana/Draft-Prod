import React, { useState } from 'react';
import SimpleInput from 'components/input/SimpleInput';
import { InputType } from 'components/inputComp/types';
import { InputProps } from './type';
const Input = ({
  input,
  onChange,
  error,
  placeholder,
}: InputProps) => {
  const [state, setState] = useState<string>(input);
  return (
    <SimpleInput
      labelText=""
      type={InputType.TEXT}
      id="institutionName"
      placeholder={placeholder}
      value={state}
      onChange={(e) => {
        setState(e.target.value);
      }}
      error={error}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
        }
      }}
      onBlur={() => onChange(state)}
    />
  );
};

export default Input;
