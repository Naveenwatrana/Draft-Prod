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
  height: 32px;
  border-bottom: 1px solid ${({ theme }) => theme.palette.gray['40'].value};
  svg > path {
    stroke: ${({ theme }) => theme.palette.gray[20].value};
  }
  background: ${({ theme }) => theme.palette.gray['80'].value};
  position: sticky;
  z-index: 3;
  span {
    color: ${({ theme }) => theme.palette.white[100].value};
    font-size: ${({ theme }) => theme.typography['16 semibold'].fontSize.value}px;
    font-weight: ${({ theme }) => theme.typography['16 semibold'].fontWeight};
    line-height: 26px;
  }
`;

export const IconWrapper = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.palette.gray['40'].value};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: ${({ theme }) => theme.palette.gray['40'].value};
  }
`;
