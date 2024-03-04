import styled from 'styled-components';

export type ContainerProps = {
  isMobile: boolean;
  isAuthor?: boolean;
};
export const Container = styled.div<ContainerProps>`
  background: ${({ theme }) => theme.palette.gray[80].value};
  display: flex;
  max-width: 1164px;
  gap: 24px;
  margin: 0 auto;
  width: 100%;
  height: ${({ isMobile }) => (isMobile ? 'auto' : 'calc(100vh - 152px)')};
  justify-content: center;
  flex-direction: ${({ isMobile }) => (isMobile ? 'column' : 'row')};
  padding: ${({ isMobile, isAuthor }) => ((isMobile || !isAuthor) ? '20px 0 50px' : '190px 93px 50px')};
  
  @media screen and (max-width: 1023px) {
    min-height: calc(100vh - 160px);
  }
`;

export const LeftContainer = styled.div<ContainerProps>`
  max-width: 400px;
  display: flex;
  flex-direction: column;
  max-height: 100vh;
  padding: ${({ isMobile }) => isMobile ? '0 16px' : '0px'};
  min-width: ${({ isMobile }) => isMobile ? 'auto' : '372px'};
  overflow-y: auto;
  h6 {
    color: rgba(255, 255, 255, 0.5);
    text-transform: uppercase;
    margin-bottom: 8px;
    margin-top: 2px;
  }
  h3 {
    margin: 24px 0;
  }
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const MainContainer = styled.div`
display: flex;
flex-direction: column;
@media screen and (min-width: 1023px) {
  max-height: calc(100vh - 76px);
  min-width: 600px;
  padding-bottom: 18px;
  overflow-y: auto;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
}
gap: 32px;
padding: 0px 16px 0;
@media screen and (min-width: 1023px) {
  padding-right: 115px;
  margin-left: 0;
}
`;
