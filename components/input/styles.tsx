import TextComp from 'components/textComp';
import { FieldError } from 'react-hook-form';
import styled from 'styled-components';

type CustomInputProp = {
    error?: FieldError;
}

export const CustomInput = styled.input<CustomInputProp>`
    font-family: ${({ theme }) => theme.defaultFont};
    line-height: 24px;
    border: 2px solid transparent;
    border-radius: 8px;
    padding: 12px;
    background-color: ${(props) => props.theme.palette.gray['60'].value};
    color: ${(props) => props.error ? props.theme.palette.red['100'].value : props.theme.palette.white['100'].value};
    border-color: ${(props) => props.error && props.theme.palette.red['100'].value};
    font-weight: 400;
`;

export const Error = styled.span`
    color: ${(props) => props.theme.palette.red['100'].value};
    font-size: ${(props) => props.theme.typography['14 regular'].fontSize.value}px;
    font-family: ${({ theme }) => theme.defaultFont};
    text-align: end;
    font-weight: 400;
`;

export const CheckboxLabel = styled(TextComp)`
    font-size: ${(props) => props.theme.typography['14 regular'].fontSize.value}px;
    font-weight: 400;
`;
