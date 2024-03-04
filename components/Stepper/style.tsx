import styled from 'styled-components';
import { StyledStepperProps } from './types';

export const SteppersContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  width: max-content;
`;
export const StepperContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const StepperCounter = styled.div<StyledStepperProps>`
  display: flex;
  width: 32px;
  height: 32px;
  justify-content: center;
  align-items: center;
  border-radius: 999px;
  background: ${({ active }) => active
    ? 'linear-gradient(90deg, #54ABAC -63.33%, #5FF088 100%)'
    : 'transparent'};
  color: ${({ theme }) => theme.palette.gray[80].value};
  ${({ theme, active }) => !active
    && `
    border: 1px solid ${theme.palette.gray[20].value}};
    color: ${theme.palette.gray[10].value}};
    `}
  ${({ theme, completed }) => completed
    && `
    border: none;
    color: ${theme.palette.white[100].value};
    background-color: ${theme.palette.gray[40].value}};
  `}
  font-size: ${({ theme }) => theme.typography['14 regular'].fontSize.value}px;
  font-weight: ${({ theme }) => theme.typography['14 semibold'].fontWeight};
  line-height: ${({ theme }) => theme.typography['14 regular'].lineHeights.value}px;
`;

export const StepperLabel = styled.div<StyledStepperProps>`
  font-size: ${({ theme }) => theme.typography['16 semibold'].fontSize.value}px;
  font-weight: ${({ theme }) => theme.typography['16 semibold'].fontWeight};
  line-height: ${({ theme }) => theme.typography['16 semibold'].lineHeights.value}px;
  ${({ active, theme }) => active
    ? `
    background: -webkit-linear-gradient(90deg, #54ABAC, #5FF088);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    ` : `color: ${theme.palette.gray[10].value}`}
  ${({ active }) => active
    && `
    background: -webkit-linear-gradient(90deg, #54ABAC, #5FF088);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    `}
`;

export const StyledStepperCounter = styled(StepperCounter)`
  background: ${({ active }) => active
    ? '#99E662' // TODO: Add Color
    : 'transparent'};
  color: #121112; // TODO: Add Color
  ${({ theme, active }) => !active
    && `
    border: 1px solid #2A282B; // TODO: Add Color
    color: ${theme.palette.white[100].value}};
    `}
  ${({ completed }) => completed
    && `
    border: none;
    color: #515253; // TODO: Add Color
    background-color: #2A282B; // TODO: Add Color
  `}  
  font-weight: 500;
  line-height: 20px;
`;

export const StyledStepperLabel = styled.div<StyledStepperProps>`
  font-weight: 500;
  font-size: ${({ theme }) => theme.typography['16 semibold'].fontSize.value}px;
  line-height: 20px;
  color: ${({ active, theme }) => active ? '#99E662' : theme.palette.white[100].value};
  ${({ completed }) => completed
    && `
    color: #515253; // TODO: Add Color
  `}  
`;
