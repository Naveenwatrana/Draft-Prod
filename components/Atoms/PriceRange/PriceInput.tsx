import React from 'react';
import lang from 'common/lang';
import { ErrorText } from 'components/inputComp/styles';
import { formatNumberToCurrency } from 'common/utils/helpers';
import { InputType } from 'components/inputComp/types';
import { PriceInputProps } from './type';
import {
  Container,
  Input,
  InputContainer,
  Label,
  InputLabel,
  PriceInputContainer,
} from './style';
const {
  jobs: { usd, minRange },
} = lang;
const PriceInput = ({
  onChange,
  label,
  id,
  error,
  placeholder,
  value,
  maxDigits = 6,
}: PriceInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const removeAlphabetsFromInput = e.target.value.replace(/[^\d]/g, '');
    const restrictedToMaxLength = removeAlphabetsFromInput.slice(0, maxDigits);
    return onChange(Number(restrictedToMaxLength));
  };
  return (
    <PriceInputContainer>
      <InputLabel>{label}</InputLabel>
      <Container error={!!error}>
        <Label>{usd}</Label>
        <InputContainer>
          <Input
            value={value ? formatNumberToCurrency(value) : ''}
            onChange={handleChange}
            placeholder={placeholder || minRange}
            type={InputType.TEXT}
            data-cy={`price-input-${label}`}
            id={id}
          />
        </InputContainer>
        {error && <ErrorText>{error.message}</ErrorText>}
      </Container>
    </PriceInputContainer>
  );
};

export default PriceInput;
