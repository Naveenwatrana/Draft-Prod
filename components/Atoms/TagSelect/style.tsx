import styled from 'styled-components';
import { StyledTagProps } from './type';

export const StyledTag = styled.div<StyledTagProps>`
  border: solid 1px
    ${({ isSelected }) => !isSelected ? '#54ABAC80' : 'transparent'}; // TODO: Add Color
  background-color: ${({ isSelected }) => isSelected ? '#54ABAC' : 'transparent'}; // TODO: Add Color
  color: ${({ theme, isSelected, cancelable }) => !isSelected || cancelable
    ? theme.palette.white[100].value
    : theme.palette.gray[80].value};
  cursor: pointer;
  padding: 0 10px;
  gap: 8px;
  border-radius: 8px;
  display: flex;
  width: max-content;
  align-items: center;
  height: 40px;
  font-size: ${({ theme }) => theme.typography['14 semibold'].fontSize.value}px;
  font-weight: ${({ theme }) => theme.typography['14 semibold'].fontWeight};
  line-height: 16px;
  -webkit-tap-highlight-color: transparent;
  ${({ cancelable }) => cancelable
  && `
    border: 1px solid rgba(84, 171, 172, 0.70); // TODO: Add Color
    background-color: rgba(84, 171, 172, 0.70); // TODO: Add Color
    `
}
`;
