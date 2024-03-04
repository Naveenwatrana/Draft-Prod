import { TextComp } from 'components/textComp';
import WordCounter from 'components/WordCounter/WordCounter';
import { ErrorOption } from 'react-hook-form';
import styled from 'styled-components';
import { Container } from '../../styles';

type FileInputWrapperProp = {
    error?: ErrorOption;
}

export const TextArea = styled.textarea`
    font-size: var(--sizes-font-regular);
    line-height: 24px;
    border: 2px solid transparent;
    border-radius: 8px;
    padding: 12px;
    background-color: ${(props) => props.theme.palette.gray['60'].value};
    color: ${(props) => props.theme.palette.white['100'].value};
    font-family: ${({ theme }) => theme.defaultFont};
    font-weight: 400;
`;

export const Counter = styled(WordCounter)`
    display: flex;
    justify-content: right;
    margin-bottom: 10px;
`;

export const CounterError = styled(WordCounter)`
    background-color: ${(props) => props.theme.palette.red['100'].value};
    color: white;
    padding: 10px 1px;
    border-radius: 12px 12px 0 0;
    margin: 0;
    width: 100%;
    text-align: center;
`;

export const ImageContainerHeader = styled(TextComp)`
    margin-bottom: 4px;
    font-family: ${({ theme }) => theme.defaultFont};
`;

export const FileInputWrapper = styled.div<FileInputWrapperProp>`
    margin-bottom: 4px;
    font-family: ${({ theme }) => theme.defaultFont};
    height: 276px;
    border-radius: 12px;
    background-color: ${(props) => props.theme.palette.gray['60'].value};
    border: 1px dashed ${(props) => props.error ? props.theme.palette.red['100'].value : props.theme.palette.gray['30'].value};
`;
export const PageContainer = styled(Container)`
    display: grid;
    grid-template-columns: 1fr 1fr;
    max-width: 1278px;
    width: 1278px;
    overflow-y: auto;
    overflow-x: hidden;
    height: calc(100vh - 200px);
`;

export const LeftPanel = styled.div`
    background-color: ${({ theme }) => theme.palette.gray['80'].value};
    padding: 60px;
    display: flex;
    flex-direction: column;

    @media screen and (max-width: 1024px) {
        padding: 0 100px;
    }
`;

export const RightPanel = styled.div`
    background-color: ${({ theme: { palette: { gray } } }) => gray['60'].value};
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 60px;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    flex: 2;
    gap: 16px;
    margin-top: 20px;
`;
