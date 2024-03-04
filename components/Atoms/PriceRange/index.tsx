import React from 'react';
import { formatNumberToCurrency } from 'common/utils/helpers';
import lang from 'common/lang';
import { ErrorText } from 'components/inputComp/styles';
import { PriceRangeProps } from './type';
import {
  Container, Input, InputContainer, Label,
} from './style';
const {
  jobs: { usd, minRange, maxRange },
} = lang;
const PriceRange = ({
  range, onRangeChange, error, dataCys, maxDigits = 6,
}: PriceRangeProps) => {
  const handleFromInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => onRangeChange([((Number(e.target.value.replace(/\D/g, '').slice(0, maxDigits)))), range[1]]);
  const handleToInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => onRangeChange([range[0], (Number(e.target.value.replace(/\D/g, '').slice(0, maxDigits)))]);

  return (
    <Container error={!!error}>
      <Label>{usd}</Label>
      <InputContainer>
        <Input
          value={range[0] ? formatNumberToCurrency(range[0]) : ''}
          onChange={handleFromInputChange}
          placeholder={minRange}
          data-cy={dataCys[0]}
        />
        <span>-</span>
        <Input
          value={range[1] ? formatNumberToCurrency(range[1]) : ''}
          onChange={handleToInputChange}
          placeholder={maxRange}
          data-cy={dataCys[1]}
        />
      </InputContainer>
      {error && <ErrorText>{error.message}</ErrorText>}
    </Container>
  );
};

export default PriceRange;
