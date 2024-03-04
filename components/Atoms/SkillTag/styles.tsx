import styled from 'styled-components';
import { SkillTagProps } from './types';

export const SkillTag = styled.span<SkillTagProps>`
    border: solid 1px rgba(84, 171, 172, 0.50); // TODO: Add Color
    cursor: ${({ clickable }) => clickable && 'pointer'} ;
    padding: 8px 10px;
    border-radius: 8px;
    font-size: ${({ theme }) => theme.typography['14 semibold'].fontSize.value}px;
    font-weight: ${({ theme }) => theme.typography['14 semibold'].fontWeight};
    line-height: ${({ theme }) => theme.typography['14 semibold'].lineHeights.value}px;
    background-color: ${({ selected }) => selected ? 'rgba(84, 171, 172, 0.40)' : 'transparent'};
    color: ${({ theme }) => theme.palette.white[100].value};
    cursor: pointer;
`;
