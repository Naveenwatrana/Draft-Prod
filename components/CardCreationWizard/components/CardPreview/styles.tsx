import styled from 'styled-components';

export const Container = styled.div`
    padding: 16px;
    width: calc(100% - 376px);
    height: calc(100% - 32px);
    background: ${({ theme }) => theme.palette.gray[80].value};
    display: flex;
    justify-content: center;
    align-items: center;
    border-left: 1px solid ${({ theme }) => theme.palette.gray[40].value};
    border-right: 1px solid ${({ theme }) => theme.palette.gray[40].value};
`;
