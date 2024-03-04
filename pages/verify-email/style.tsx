import styled from 'styled-components';

export const LinkExpiredWrapper = styled.div`
  color: ${({ theme }) => theme.palette.white[100].value};
  background-color: ${({ theme }) => theme.palette.gray[80].value};
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  button:last-child {
    margin-top: 8px;
  }
`;

export const LinkExpiredContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  max-width: 393px;
`;
