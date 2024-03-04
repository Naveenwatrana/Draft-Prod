import ButtonComp from 'components/buttonComp';
import TextComp from 'components/textComp';
import WordCounter from 'components/WordCounter/WordCounter';
import styled from 'styled-components';

export const ImageStepForm = styled.form`
    display: flex;
    flex-direction: column;
    flex: 2;
    gap: 16px;
    margin-top: 20px;
`;

export const Counter = styled(WordCounter)`
    align-self: flex-end;
`;

export const FileInputWrapper = styled.div<{error: boolean}>`
    height: 276px;
    border-radius: 12px;
    background-color: ${({ theme }) => theme.palette.gray['60'].value};
    border: 1px dashed ${({ theme, error }) => error ? theme.palette.red['100'].value : theme.palette.gray['30'].value};
    border-top: ${({ error }) => error && 'none'}
`;

export const ErrorText = styled(TextComp)`
    color: ${({ theme }) => theme.palette.white['100'].value};
    background-color: ${({ theme }) => theme.palette.red['100'].value};
    padding: 10px 1px;
    border-radius: 12px 12px 0 0;
    margin: 0;
    width: 100%;
    text-align: center;
`;

export const UploadWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 2;
    gap: 10px;
`;

export const UploadLabel = styled(TextComp)`
    font-size: ${({ theme }) => theme.typography['12 semibold'].fontSize.value}px;
    font-weight: ${({ theme }) => theme.typography['12 semibold'].fontWeight};
    line-height: ${({ theme }) => theme.typography['12 semibold'].lineHeights.value}px;
    margin-bottom: -10px;
`;

export const FileInput = styled.input`
    display: none;
`;

export const ButtonGroup = styled.div`
    display: flex;
`;

export const SubmitButton = styled(ButtonComp)`
    flex-grow: 2;
`;

export const SkipButton = styled(ButtonComp)`
    color: ${({ theme }) => theme.palette.green['80'].value};
    background: none;
    margin-right: 36px;
    box-shadow: none;
`;
