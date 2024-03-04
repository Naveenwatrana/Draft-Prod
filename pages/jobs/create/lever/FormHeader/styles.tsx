import styled from 'styled-components';
import { StepLineProps } from 'pages/jobs/create/lever/FormHeader/types';

export const Stepper = styled.div`
    display: flex;
    margin-top: 20px;
`;

export const StepLine = styled.div<StepLineProps>`
    width: 44px;
    height: 4px;
    background-color: ${({ active, theme: { palette: { white, gray } } }) => active ? white['100'].value : gray['40'].value};
    margin: 8px;
`;

export const SubTitle = styled.h4`
    font-weight: ${({ theme }) => theme.typography['16 regular'].fontWeight};
    font-size: ${({ theme }) => theme.typography['16 regular'].fontSize.value}px;
    color: ${({ theme }) => theme.palette.white['100'].value};
    font-family: ${({ theme }) => theme.defaultFont};
`;
