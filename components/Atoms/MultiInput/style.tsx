import styled from 'styled-components';
import { InputContainerProps } from './type';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: flex-start;
  width: 670px;
  touch-action: pan-y;
  > div:first-child {
    width: 100%;
  }
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

export const InputContainer = styled.div<InputContainerProps>`
  gap: 16px;
  display: flex;
  width: 100%;
  > div:first-child {
    width: 100%;
  }
  align-items: center;
  svg {
    cursor: move;
  }
  > svg:last-child {
    ${({ hidden }) => hidden ? 'opacity: 0' : 'cursor: pointer'}
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  width: max-content !important;
`;

export const ButtonTypography = styled.div`
  color: ${({ theme }) => theme.palette.green[80].value};
  font-size: ${({ theme }) => theme.typography['14 semibold'].fontSize.value}px;
  font-weight: ${({ theme }) => theme.typography['14 semibold'].fontWeight};
`;
