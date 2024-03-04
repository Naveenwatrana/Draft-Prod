import styled from 'styled-components';
import { StyledFilterProps } from './types';

export const FiltersContainer = styled.p`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  z-index: 1;
  max-width: 372px;
  flex-wrap: wrap;
`;

export const Filter = styled.span<StyledFilterProps>`
  display: flex;
  align-items: center;
  -webkit-tap-highlight-color: transparent;
  color: ${({ theme, active }) => !active
    ? theme.palette.white['100'].value
    : theme.palette.gray['80'].value};
  padding: 12px;
  gap: 8px;
  background: ${({ active, activeColor }) => active ? activeColor : 'transparent'};
  border-radius: 8px;
  border: 1px solid rgba(84, 171, 172, 0.50); // TODO: Add color
  font-weight: ${({ theme }) => theme.typography['12 semibold'].fontWeight};
  font-size: ${({ theme }) => theme.typography['12 semibold'].fontSize.value}px;
  cursor: pointer;
  > svg {
    transform: rotate(${({ active }) => (!active ? 45 : 0)}deg);
    > * {
      stroke: ${({ theme, active }) => active ? theme.palette.gray['40'].value : theme.palette.white['100'].value};
      stroke-width: 1px;
    }
  }
`;
