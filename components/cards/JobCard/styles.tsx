import styled from 'styled-components';

export const JobContent = styled.div`
position: absolute;
top: 0;
z-index: 9;
display: flex;
flex-direction: column;
padding: 16px;
font-family: ${({ theme }) => theme.defaultFont};
`;
export const CompanyText = styled.span`
font-weight: ${({ theme }) => theme.typography['14 semibold'].fontWeight};
font-size: ${({ theme }) => theme.typography['14 semibold'].fontSize.value}px;
color: ${({ theme }) => theme.palette.white['100'].value};
margin-bottom: 32px;
`;
export const RoleText = styled.span`
    font-weight: ${({ theme }) => theme.typography['24 regular'].fontWeight};
    font-size: ${({ theme }) => theme.typography['24 regular'].fontSize.value}px;
    color: ${({ theme }) => theme.palette.white['100'].value};
    white-space: pre-wrap;
    word-break: break-word;
`;
export const LocationText = styled.span`
font-weight: ${({ theme }) => theme.typography['14 semibold'].fontWeight};
font-size: ${({ theme }) => theme.typography['14 semibold'].fontSize.value}px;
color: ${({ theme }) => theme.palette.gray['10'].value};
margin-top: 42px;
`;
export const SalaryText = styled.span`
    font-weight: ${({ theme }) => theme.typography['20 semibold'].fontWeight};
    font-size: ${({ theme }) => theme.typography['20 semibold'].fontSize.value}px;
    color: ${({ theme }) => theme.palette.white['100'].value};
    margin-top: 8px;
    white-space: pre-wrap;
    word-break: break-word;
`;
