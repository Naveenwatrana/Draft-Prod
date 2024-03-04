import { TextComp } from 'components/textComp';
import styled from 'styled-components';

export const UploadContentLabel = styled(TextComp)`
    font-size: ${({ theme }) => theme.typography['16 regular'].fontSize.value}px;
    line-height: ${({ theme }) => theme.typography['16 regular'].lineHeights.value}px;
    font-weight: 300;
    color: #A69DAB; // TODO: colors to be added in theme
`;

export const UploadContentInfo = styled(TextComp)`
    font-weight: 300;
    font-size: ${({ theme }) => theme.typography['12 regular'].fontSize.value}px;
    line-height: ${({ theme }) => theme.typography['12 regular'].lineHeights.value}px;
    text-align: center;
`;
