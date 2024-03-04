import WordCounter from 'components/WordCounter/WordCounter';
import styled from 'styled-components';

export const TextArea = styled.textarea`
    font-family: ${({ theme }) => theme.defaultFont};    
    font-size: ${({ theme }) => theme.typography['16 regular'].fontSize.value}px;
    font-weight: ${({ theme }) => theme.typography['16 regular'].fontWeight};
    background: ${(props) => props.theme.palette.gray['60'].value};
    color: ${(props) => props.theme.palette.white['100'].value};
    line-height: 24px;
    border: 2px solid transparent;
    border-radius: 8px;
    padding: 12px;
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
