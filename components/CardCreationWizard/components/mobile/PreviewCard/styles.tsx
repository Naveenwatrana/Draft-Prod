import DefaultCard from 'components/DefaultCard';
import TextComp from 'components/textComp';
import styled from 'styled-components';

export type ContainerProps = {
    active?: boolean;
};
export const Container = styled.div<ContainerProps>`
    width: calc(100% - 44px);
    border: 1px solid ${({ active, theme }) => (active ? theme.palette.green[100].value : theme.palette.gray[50].value)};
    padding: 62px 22px;
    display: flex;
    border-radius: 8px;
    height: calc(195px - 124px);
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const AddCardText = styled(TextComp)<ContainerProps>`
    color: ${({ active, theme }) => (active ? theme.palette.green[100].value : theme.palette.gray[30].value)};
    font-weight: ${({ theme }) => theme.typography['16 semibold'].fontWeight};
    font-size: ${({ theme }) => theme.typography['16 semibold'].fontSize.value}px;
    margin-top: 26px;
`;
export const Button = styled.button`
    background: none;
    border: none;
    display: flex;
    text-align: left;
    width: 100%;
    cursor: pointer;
    margin-bottom: 24px;
    &:hover {
        color: ${({ theme }) => theme.palette.green[100].value};
    }
    &:disabled {
        cursor: auto;
    }
    @media (max-width: 1160px) {
        float: left;
        display: block;
        margin-right: 16px;
        width: auto;
    }
`;
export const Divider = styled.div`
    background-color: ${({ theme }) => theme.palette.gray[40].value};
    height: 1px;
    width: 100%;
    margin-bottom: 24px;
`;
export const CardElement = styled(DefaultCard)<ContainerProps>`
    border: 1px solid ${({ active, theme }) => (active ? theme.palette.green[100].value : theme.palette.gray[50].value)};
`;
