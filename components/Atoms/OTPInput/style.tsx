import { ErrorText } from 'components/inputComp/styles';
import styled from 'styled-components';
import { InputProps } from './type';

export const Container = styled.div`
  width: 100%;
  ${ErrorText} {
    display: block;
  }
  > div {
    gap: 10px;
  }
`;

export const StyledInput = styled.input<InputProps>`
  border-radius: 8px;
  border: 1px solid ${({ theme, error }) => error ? theme.palette.red[100].value : theme.palette.gray[40].value};
  background: ${({ theme }) => theme.palette.gray[50].value};
  padding: 12px 0;
  flex: 1 0 0;
  height: 91px;
  color: ${({ theme, error }) => error ? theme.palette.red[100].value : theme.palette.gray[10].value};
  text-align: center;
  font-weight: ${({ theme }) => theme.typography['32 semibold'].fontWeight};
  font-size: ${({ theme }) => theme.typography['32 semibold'].fontSize.value}px;
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &[type='number'] {
    appearance: textfield;
  }
  @media (max-width: 1023px) {
    height: 60px;
  }
`;
