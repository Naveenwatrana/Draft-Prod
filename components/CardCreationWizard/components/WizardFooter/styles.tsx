import ButtonComp from 'components/buttonComp';
import styled from 'styled-components';

export const Container = styled.div`
    padding: 16px;
    height: 26px;
    border-radius: 0 0 12px 12px;
    border-top: 1px solid #38393A;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 52px;
    @media (max-width: 768px) {
        width: calc(100% - 58px);
    }
`;
export const SaveButton = styled(ButtonComp)`
    padding: 12px 96px;
    &:disabled {
        opacity: 0.15;
        background-color: ${({ theme }) => theme.palette.green[100].value};
    }
    @media (max-width: 768px) {
        padding: 12px;
        width: 100%;
    }
`;
