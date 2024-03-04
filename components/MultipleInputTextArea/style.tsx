import TextComp from 'components/textComp';
import Select from 'react-select';
import styled from 'styled-components';

type ReactSelectTextAreaProps = {
  error?: boolean;
}

export const TextArea = styled.span`
  font-family: ${({ theme }) => theme.defaultFont};
  font-size: ${({ theme }) => theme.typography['16 regular'].fontSize.value}px;
  font-weight: ${({ theme }) => theme.typography['16 regular'].fontWeight};
  background: ${({ theme }) => theme.palette.gray['60'].value};
  border: none;
  min-height: 60px;
  color: ${({ theme }) => theme.palette.white['100'].value};
  resize: none;
  border-radius: 8px;
  width: calc(100% - 24px);
  padding: 12px;
`;

export const ReactSelectTextArea = styled(Select)<ReactSelectTextAreaProps>`
  font-family: ${({ theme }) => theme.defaultFont};
  font-size: ${({ theme }) => theme.typography['16 regular'].fontSize.value}px;
  font-weight: ${({ theme }) => theme.typography['16 regular'].fontWeight};
  background: ${({ theme }) => theme.palette.gray[50].value} !important;
  cursor: pointer;
  border: none;
  min-height: 128px;
  border: 1px solid ${({ theme }) => theme.palette.gray[40].value};
  color: ${({ theme }) => theme.palette.white['100'].value};
  resize: none;
  border-radius: 8px;
  padding: 12px;

  ${({ error, theme }) => error && `
    border: solid 1px ${theme.palette.red['100'].value} !important;
    margin-bottom: 0 !important; 
  `}

  .select__control,
  .select__menu {
    background: ${({ theme }) => theme.palette.gray[50].value} !important;
    border: none;
    outline: none;
    box-shadow: none;
  }
  .select__menu {
    background-color: #000 !important;
    cursor: pointer;
    left: 0;
    visibility: ${({ isLoading }) => isLoading && 'hidden'};
  }
  .select__control:hover {
    box-shadow: none;
    border: none;
  }
  .select__control {
    padding-bottom: 20px;
  }
  .select__indicators,
  .select__multi-value__remove {
    display: none;
  }
  .select__multi-value__label {
    padding: 0px;
    font-weight: 600;
    font-size: 12px;
    line-height: 18px;
    color: ${({ theme }) => theme.palette.white['100'].value};
  }
  .select__multi-value {
    padding: 8px;
    background-color: ${({ theme }) => theme.palette.violet['80'].value};
    border-radius: 4px;
  }
  .select__input {
    color: ${({ theme }) => theme.palette.white['100'].value} !important;
  }
  .select__option,
  .select__option:active {
    background: none;
    cursor: pointer;
  }
  .select__placeholder {
    color: ${({ theme }) => theme.palette.gray['20'].value};
  }
  .select__menu {
    visibility: ${({ options }) => options?.length === 0 && 'hidden'};
  }
`;

export const ErrorText = styled.span`
  color: ${({ theme }) => theme.palette.red['100'].value};
  font-size: ${({ theme }) => theme.typography['12 regular'].fontSize.value}px;
  font-family: ${({ theme }) => theme.defaultFont};
  text-align: end;
  font-weight: ${({ theme }) => theme.typography['14 regular'].fontWeight};
  display: inline-block;
  position: absolute;
  top: 0;
`;

export const CountContainer = styled.span`
  position: relative;
`;

export const Label = styled(TextComp)`
  margin-bottom: 4px;
`;
