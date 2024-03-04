import TextComp from 'components/textComp';
import { ErrorOption } from 'react-hook-form';
import styled from 'styled-components';

type FileInputWrapperProp = {
    error?: ErrorOption;
    picture?: boolean;
}

export const FileInputWrapper = styled.div<FileInputWrapperProp>`
    height: 450px;
    border-radius: 0 0 12px 12px;
    margin-top: -5px;
    background-color: ${(props) => props.theme.palette.gray['60'].value};
    ${(props) => props.error ? `border: 1px dashed ${props.theme.palette.red['100'].value}` : ''}
    ${(props) => props.picture ? `border: 1px dashed ${props.theme.palette.gray['30'].value}` : ''}
`;

export const FormHeader = styled(TextComp)`
    background: black;
    padding: 10px;
    border-radius: 12px 12px 0 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;
