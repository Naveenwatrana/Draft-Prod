import styled from 'styled-components';

export const Container = styled.div`
  background-color: #121112; // TODO: Add Color
  width: 100%;
  height: 100vh;
`;

export const IconWrapper = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid #282629; // TODO: Add Color
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: ${({ theme }) => theme.palette.gray['40'].value};
  }
`;

export const ContentContainer = styled.div`
  margin-top: 66px;
`;
