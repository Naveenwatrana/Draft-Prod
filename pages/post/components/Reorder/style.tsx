import styled from 'styled-components';

export const MediaContainer = styled.div`
  display: flex;
  width: calc(100% - 24px);
  padding: 12px;
  align-items: flex-start;
  gap: 16px;
  border-top: 1px solid #2a282b; // TODO: ADd Color
  background: ${({ theme }) => theme.palette.gray[80].value};
  position: fixed;
  bottom: 68px;
  overflow-x: auto;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const Container = styled.div`
    display: flex;
    gap: 12px;
`;
