import ButtonComp from 'components/buttonComp';
import styled from 'styled-components';

export const Footer = styled.div`
    background-color: ${({ theme }) => theme.palette.gray[80].value};
    width: calc(100% - 32px);
    display: flex;
    height: 44px;
    padding: 16px;
    display: flex;
    justify-content: flex-end;
    border-top: 1px solid ${({ theme }) => theme.palette.gray[40].value};
`;
export const Buttons = styled.div`
    gap: 24px;
    display: flex;
`;
export const NextButton = styled(ButtonComp)`
    min-width: 169px;
`;
