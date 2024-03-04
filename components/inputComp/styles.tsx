import styled, { css } from 'styled-components';

export const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const CustomLabel = styled.label`
    display: flex;
    flex-direction: column;
    gap: 2px;
    color: ${({ theme }) => theme.palette.white['100'].value};
    font-family: ${({ theme }) => theme.defaultFont};
    margin-bottom: 3px;
`;

export const LabelText = styled.span`
    font-size: ${({ theme }) => theme.typography['12 semibold'].fontSize.value}px;
    font-weight: ${({ theme }) => theme.typography['12 semibold'].fontWeight};
    line-height: ${({ theme }) => theme.typography['12 semibold'].lineHeights.value}px;
    color: ${({ theme }) => theme.palette.white['100'].value};
    margin-bottom: 2px;
`;

const inputStyleError = css`
    border-color: ${({ theme }) => theme.palette.red['100'].value} !important;
    color:  ${({ theme }) => theme.palette.red['100'].value} !important;
`;
export type InputProps = {
    error?: boolean;
};
export const CustomInput = styled.input<InputProps>`
    text-overflow: ellipsis;
    font-size: ${({ theme }) => theme.typography['16 regular'].fontSize.value}px;
    line-height: ${({ theme }) => theme.typography['16 regular'].lineHeights.value}px;
    border: 2px solid ${({ error, theme }) => error ? theme.palette.red[100].value : 'transparent'};
    border-radius: 8px;
    padding: 12px;
    word-wrap: break-word;
    word-break: break-all;
    background: ${({ theme }) => theme.palette.gray[50].value};
    color: ${({ theme }) => theme.palette.gray[50].value};
    font-family: ${({ theme }) => theme.defaultFont};
    color: ${({ theme }) => theme.palette.white['100'].value};
    font-weight: ${({ theme }) => theme.typography['16 regular'].fontWeight};

    &:focus {
        outline-color: ${({ theme }) => theme.palette.gray['30'].value};
    }

    border: 1px solid ${({ theme }) => theme.palette.gray[40].value};
    &[disabled] {
        color: ${({ theme }) => theme.palette.gray[50].value};
        background: transparent;
        border: 1px solid ${({ theme }) => theme.palette.gray[50].value};
    }

    ${({ error }: any) => error && inputStyleError};
`;

export const ErrorText = styled.span`
    color: ${({ theme }) => theme.palette.red['100'].value};
    font-size: ${({ theme }) => theme.typography['12 regular'].fontSize.value}px;
    font-family: ${({ theme }) => theme.defaultFont};
    text-align: end;
    font-weight: ${({ theme }) => theme.typography['14 regular'].fontWeight};
`;

export const TextArea = styled.textarea<{large: boolean}>`
    font-family: ${({ theme }) => theme.defaultFont};    
    font-size: ${({ theme }) => theme.typography['16 regular'].fontSize.value}px;
    font-weight: ${({ theme }) => theme.typography['16 regular'].fontWeight};
    background: ${({ theme }) => theme.palette.gray[50].value};
    border: none;
    min-height: ${({ large }) => large ? '263px' : 'auto'};
    color: ${({ theme }) => theme.palette.white['100'].value};
    resize: none;
    border-radius: 8px;
    width: calc(100% - 24px);
    padding: 12px;
`;

export const Checkmark = styled.span<{error: boolean}>`
    position: absolute;
    top: 0;
    left: 0;
    height: 20px;
    width: 20px;
    background-color: transparent;
    border-radius: 8px;
    border: 1px solid ${({ theme, error }) => error ? theme.palette.red['100'].value : theme.palette.green['80'].value};

    &:after {
        content: "";
        position: absolute;
        left: 0px;
        top: 0px;
        width: 18px;
        height: 18px;
        border: solid ${({ theme }) => theme.palette.gray['80'].value};
        border-width: 1px;
        border-radius: 8px;
        display: none;
    }
`;

export const CheckBoxWrapper = styled.div`
    display: flex;
    align-items: center;
`;

export const CheckBoxContainer = styled.label`
    padding-left: 30px;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    &:hover input ~ ${Checkmark} {
        border: 1px solid ${({ theme }) => theme.palette.green['80'].value};
        border-radius: 8px;
    }

    input:checked ~ ${Checkmark} {
        background-color: ${({ theme }) => theme.palette.green['80'].value};
        border-radius: 8px;
    }

    input:checked ~ ${Checkmark}:after {
        display: block;
    }
`;

export const CheckBox = styled.input`
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
`;

export const InputWordCountContainer = styled.div`
    width: 100%;
    position: relative;
`;

export const WordCounterWrapper = styled.div`
    display: flex;
    position: absolute;
    right: 0;
    justify-content: end;
    margin-top: 8px;
    @media screen and (max-width: 768px) {
      display: none;
    }
`;
