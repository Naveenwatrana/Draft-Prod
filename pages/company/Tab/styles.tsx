import { StyledCarousel } from 'components/CardStack/styles';
import styled from 'styled-components';
import { LogoWrapper } from '../style';

export const ContentContainer = styled.div`
  background: ${({ theme }) => theme.palette.gray[80].value};
  display: flex;
  max-width: 1164px;
  gap: 24px;
  margin: 0 auto;
  width: 100%;
  padding: 102px 93px 50px;
  flex-wrap: wrap;
  overflow: auto;
  height: calc(100vh - 152px);

  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

  justify-content: center;
  @media screen and (max-width: 1023px) {
    padding: 0;
    width: min-content;
    overflow: unset;
  }
  > div:last-child {
    width: 100%;
  }
  ${LogoWrapper} {
    margin-bottom: 50px;
  }
`;
export const InfiniteScrollComponentContainer = styled.span`
  @media screen and (max-width: 1023px) {
    .infinite-scroll-component {
      height: calc(100vh - 104px) !important;
      overflow: unset !important;
    }
  }
  ${StyledCarousel} {
    cursor: pointer;
  }
  width: 100%;
`;

export const NoContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 160px;
`;

export const NoContentText = styled.div`
    font-weight: ${(props) => props.theme.typography['24 semibold'].fontWeight};
    font-size: ${(props) => props.theme.typography['24 semibold'].fontSize.value}px;
    color: ${(props) => props.theme.palette.white['100'].value};
    margin-bottom: 10px;
`;

export const AddFirstContentText = styled.div`
    font-weight: ${(props) => props.theme.typography['16 regular'].fontWeight};
    font-size: ${(props) => props.theme.typography['16 regular'].fontSize.value}px;
    color: ${(props) => props.theme.palette.gray['10'].value};
    margin-bottom: 32px;
`;

export const NoContentIconContainer = styled.div`
    width: 70px;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    margin-bottom: 32px;
    background: ${(props) => `radial-gradient(117.15% 117.14% at 62.14% -8.57%, ${props.theme.palette.violet['80'].value} 0%, ${props.theme.palette.violet['100'].value} 100%)`};
`;

export const JobsContainer = styled.div`
  background: ${({ theme }) => theme.palette.gray[80].value};
  display: flex;
  max-width: 1164px;
  gap: 24px;
  margin: 0 auto;
  width: 100%;
  flex-wrap: wrap;
  overflow: auto;
  height: calc(100vh - 152px);

  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

  justify-content: center;
  @media screen and (max-width: 1023px) {
    padding: 0;
    width: min-content;
    overflow: unset;
  }
  ${LogoWrapper} {
    margin-bottom: 50px;
  }
  ${StyledCarousel} {
    cursor: pointer;
  }
`;
