import TextComp from 'components/textComp';
import styled from 'styled-components';

export type ContainerProps = {
    active?: boolean;
    width?: string;
    height?: string;
};
export const Container = styled.div<ContainerProps>`
    width: ${({ width }) => width};
    border: 1px solid ${({ theme }) => theme.palette.gray[50].value};
    padding: 62px 22px;
    display: flex;
    border-radius: 8px;
    height: ${({ height }) => height};
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media (max-width: 1160px) {
        width: ${({ width }) => width};
        float: left;
        padding-top: 0;
        padding-bottom: 0;
    }
`;

export const AddCardText = styled(TextComp)<ContainerProps>`
    color: ${({ active, theme }) => (active ? theme.palette.green[100].value : '#515253')}; // TODO: use theme
    font-weight: ${({ theme }) => theme.typography['16 semibold'].fontWeight};
    font-size: ${({ theme }) => theme.typography['16 semibold'].fontSize.value}px;
    margin-top: 26px;
`;
export const Button = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    width: 100%;
    &:hover {
        color: ${({ theme }) => theme.palette.green[100].value};
    }
    &:disabled {
        cursor: auto;
    }
`;
