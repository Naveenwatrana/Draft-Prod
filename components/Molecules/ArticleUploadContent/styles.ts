import TextComp from 'components/textComp';
import styled from 'styled-components';

export const UploadContentLabel = styled(TextComp)`
    font-size: ${({ theme }) => theme.typography['16 regular'].fontSize.value}px;
    font-weight: ${({ theme }) => theme.typography['16 regular'].fontWeight};
    color: ${({ theme }) => theme.palette.gray['30'].value};
`;
export const LabelBrowse = styled(UploadContentLabel)`
    color: ${({ theme }) => theme.palette.white['100'].value};
`;
export const UploadContentInfo = styled(UploadContentLabel)`
    font-size: ${({ theme }) => theme.typography['12 regular'].fontSize.value}px;
    font-weight: ${({ theme }) => theme.typography['12 regular'].fontWeight};
    color: #A69DAB;
`;
export const UploadContentInfo1 = styled(UploadContentInfo)`
margin-top: 40px; 
`;
export const UploadFileSize = styled(UploadContentInfo)`
    margin-top: 40px;
    font-size: ${({ theme }) => theme.typography['12 regular'].fontSize.value}px;
    font-weight: ${({ theme }) => theme.typography['12 regular'].fontWeight};
    width: 259px;
    color: #A69DAB;
`;
export const FileInputInfo = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;
export const CloseIconButton = styled.button`
    margin-top: 3px;
    margin-left: 10px;
    cursor: pointer;
    background: none;
    border: none;
`;

export const FileInputLabel = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    gap: 10px;
    text-align: center;
`;
