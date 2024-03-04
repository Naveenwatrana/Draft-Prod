import ButtonComp from 'components/buttonComp';
import TextComp from 'components/textComp';
import WordCounter from 'components/WordCounter/WordCounter';
import styled from 'styled-components';

export const Disclaimer = styled(TextComp)`
    background-color: ${({ theme }) => theme.palette.violet['80'].value};
    padding: 10px;
    text-align: center;
    margin: 24px 0 15px;
    border-radius: 8px;
`;

export const BioForm = styled.form`
    display: flex;
    flex-direction: column;
    flex: 2;
    gap: 16px;
    margin-top: 20px;
`;

export const Counter = styled(WordCounter)`
    align-self: flex-end;
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
