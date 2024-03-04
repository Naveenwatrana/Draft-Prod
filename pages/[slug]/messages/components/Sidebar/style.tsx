import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 412px;
  padding-bottom: 0px;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  border-right: 1px solid ${({ theme }) => theme.palette.gray[40].value};
  background: ${({ theme }) => theme.palette.gray[80].value};
  box-shadow: 0px 24px 40px 0px rgba(0, 0, 0, 0.25); // TODO: Add color

  height: calc(100vh - 66px);
  overflow-y: auto;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

  @media screen and (max-width: 1023px) {
    width: 100%;
  }
`;

export const MessageTitle = styled.div`
  display: flex;
  width: calc(100% - 48px);
  padding: 24px;
  align-items: center;
  gap: 24px;
  border-bottom: 1px solid ${({ theme }) => theme.palette.gray[40].value};
  color: ${({ theme }) => theme.palette.white[100].value};
  font-size: ${({ theme }) => theme.typography['16 semibold'].fontSize.value}px;
  font-weight: ${({ theme }) => theme.typography['16 semibold'].fontWeight};
  line-height: 26px;
`;
