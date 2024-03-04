import { DividerComp } from 'components/Divider/styles';
import { DetailsContainer } from 'pages/pro/styles';
import styled from 'styled-components';

export type ContainerProps = {
  isMobile: boolean;
};
export const Container = styled.div<ContainerProps>`
  background: ${({ theme }) => theme.palette.gray[80].value};
  display: flex;
  max-width: 1164px;
  gap: 24px;
  margin: 0 auto;
  width: 100%;
  height: ${({ isMobile }) => isMobile ? 'auto' : 'calc(100vh - 152px)'};
  justify-content: center;
  flex-direction: ${({ isMobile }) => isMobile ? 'column' : 'row'};
  padding: ${({ isMobile }) => isMobile ? '20px 0 50px' : '0'};
`;
export const DataFetchingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
  > div:last-child > ${DividerComp} {
    display: none;
  }
`;

export const MainContainer = styled(DetailsContainer)`
  padding-top: 0;
  @media screen and (max-width: 1023px) {
        margin-left: 0;
  }
`;
