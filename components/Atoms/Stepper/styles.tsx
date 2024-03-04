import styled from 'styled-components';
import { StepProp } from './types';

export const StepsContainer = styled.span`
  display: flex;
  align-items: center;
  width: 75%;
  justify-content: center;
  gap: 24px;
  @media screen and (max-width: 1023px) {
    display: none;
  }
`;

export const Step = styled.span<StepProp>`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.palette.gray['30'].value};
  span:first-child {
    background-color: ${({ theme, active }) => active && theme.palette.white['100'].value};
    color: ${({ theme, active }) => active && theme.palette.gray['60'].value};
  }
  span:last-child {
    color: ${({ theme, active }) => active && theme.palette.white['100'].value};
  }
`;

export const StepsCount = styled.span`
  font-size: ${({ theme }) => theme.typography['14 regular'].fontSize.value}px;
  font-weight: ${({ theme }) => theme.typography['14 regular'].fontWeight};
  border-radius: 40px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: solid 1px ${({ theme }) => theme.palette.gray['50'].value};
`;

export const StepName = styled.span`
  font-size: ${({ theme }) => theme.typography['16 semibold'].fontSize.value}px;
  font-weight: ${({ theme }) => theme.typography['16 semibold'].fontWeight};
`;
