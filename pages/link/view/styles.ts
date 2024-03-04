import styled from 'styled-components';

export const Content = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: hidden;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    padding: 20px;
  }
`;
export const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 616px;
`;

export const ImageComponent = styled.img`
  object-fit: cover;
  border-radius: 24px;
  margin-bottom: 24px;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;
export const WebsiteLink = styled.div`
  font-size: 14px;
  line-height: 20px;
  background-color: ${({ theme }) => theme.palette.gray[50].value};
  margin-top: 24px;
  display: flex;
  width: calc(100% - 32px);
  padding: 16px;
  border-radius: 12px;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;
export const Title = styled.h1`
  word-break: auto-phrase;
  overflow-wrap: break-word;
  font-weight: ${({ theme }) => theme.typography['32 semibold'].fontWeight};
  font-size: ${({ theme }) => theme.typography['32 semibold'].fontSize.value}px;
`;
