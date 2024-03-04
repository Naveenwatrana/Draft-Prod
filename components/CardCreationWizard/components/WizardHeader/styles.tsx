import styled from 'styled-components';

export const Container = styled.div`
    padding: 16px;
    height: 26px;
    border-radius: 12px 12px 0 0;
    border-bottom: 1px solid ${({ theme }) => theme.palette.gray[40].value};
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${({ theme }) => theme.palette.white[100].value};
    @media (max-width: 768px) {
        width: calc(100% - 58px);
    }
`;
export const CancelButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    & > svg > path {
        transition: 0.3s;
    }
    &:hover > svg > path {
        stroke: ${({ theme }) => theme.palette.green[100].value};
    }
`;
