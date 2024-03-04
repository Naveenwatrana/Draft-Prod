import TextComp from 'components/textComp';
import styled from 'styled-components';

export const JobContent = styled.div`
    position: absolute;
    top: 0;
    z-index: 9;
    display: flex;
    flex-direction: column;
    padding: 16px;
`;

export const CompanyText = styled(TextComp)`
    font-weight: ${({ theme }) => theme.typography['14 semibold'].fontWeight};
    font-size: ${({ theme }) => theme.typography['14 semibold'].fontSize.value}px;
    color: ${({ theme }) => theme.palette.white['100'].value};
    margin-bottom: 32px;
    white-space: pre-wrap;
    word-break: break-word;
`;
