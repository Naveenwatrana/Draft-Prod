import ButtonComp from 'components/buttonComp';
import styled from 'styled-components';

export const EditFullNameButton = styled.div`
    margin-bottom: 24px;
`;

export const DetailGroup = styled.div`
    display:flex;
    width:100%;
    gap: 20px;
    overflow:auto;
    justify-content: center;
`;
export const EditButton = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 16px;
`;
export const ButtonWrapper = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row-reverse;
    padding: 16px 16px 0;
    justify-content: center;
    margin: 0;
    border-top: 1px solid ${({ theme }) => theme.palette.gray[40].value};
`;
export const Button = styled(ButtonComp)`
    font-weight: ${({ theme }) => theme.typography['14 semibold'].fontWeight};
    font-size: ${({ theme }) => theme.typography['14 semibold'].fontSize.value}px;
    width: 70%;
`;
export const CancelButton = styled(Button)`
    width: 20%;
`;
