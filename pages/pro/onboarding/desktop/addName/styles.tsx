import ButtonComp from 'components/buttonComp';
import styled from 'styled-components';

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    flex: 2;
    gap: 16px;
    margin-top: 20px;
`;

export const SubmitButton = styled(ButtonComp)`
    margin: auto 0 162px;
`;
