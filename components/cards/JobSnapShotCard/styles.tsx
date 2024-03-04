import styled from 'styled-components';
import TextComp from 'components/textComp';

export const SnapShotText = styled(TextComp)`
    font-weight: ${({ theme }) => theme.typography['20 regular'].fontWeight};
    font-size: ${({ theme }) => theme.typography['20 regular'].fontSize.value}px;
    color: ${({ theme }) => theme.palette.white['100'].value};
    margin-bottom: 32px;
    white-space: pre-wrap;
    word-break: break-all;
    height: 380px;
    overflow-y: auto;
    ::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
`;
