import { TextComp } from 'components/textComp';
import styled from 'styled-components';

export const FormHeader = styled(TextComp)`
    background-color: black;
    padding: 10px;
    border-radius: 12px 12px 0 0;
`;
export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin: 20px 0;
    flex: 2;
    width: 100%;
`;
export const BtnWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap:16px;
    width: 100%;
    margin-bottom: 20px;
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${({ theme }) => theme.palette.gray['80'].value};
    min-height: 100vh;
    padding: 0 30px;
`;
