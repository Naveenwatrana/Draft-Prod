import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.palette.gray[80].value};
`;

export const NavContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px;
  svg > path {
    stroke: ${({ theme }) => theme.palette.gray[20].value};
  }
  span {
    color: ${({ theme }) => theme.palette.gray[20].value};
    font-size: 12px;
    text-transform: lowercase;
  }
`;
