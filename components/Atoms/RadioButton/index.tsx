import React from 'react';
import CheckboxIcon from 'components/Icons/CheckboxIcon';
import TextComp from 'components/textComp';
import { RadioButtonContainer } from './style';
import { RadioButtonProps } from './types';

const RadioButton = ({
  label, onCheck, checked, name,
}: RadioButtonProps) => {
  return (
    <RadioButtonContainer htmlFor={label + name} data-cy={label + name}>
      <input
        type="radio"
        id={label + name}
        data-testid={`radio-button-${label}${name}`}
        name={name}
        value={label + name}
        onChange={(e) => onCheck(e.target.checked)}
      />

      <CheckboxIcon checked={!!checked} />
      <TextComp>{label}</TextComp>
    </RadioButtonContainer>
  );
};

export default RadioButton;
