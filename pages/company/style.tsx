import styled from 'styled-components';
import { Card } from 'components/DefaultCard/styles';
import { StyledCarousel } from 'components/CardStack/styles';

export const CompanyPageContainer = styled.div`
  background: ${({ theme }) => theme.palette.gray[80].value};
  height: 100vh;
  @media screen and (max-width: 1023px) {
    overflow-y: auto;
    overflow-x: hidden;
  }
  align-items: center;
  display: flex;
  flex-direction: column;
  svg:last-child {
    align-self: center;
  }
`;
export const Container = styled.div`
  background: ${({ theme }) => theme.palette.gray[80].value};
  display: flex;
  max-width: 1164px;
  gap: 60px;
  margin: 0 auto;
  width: 100%;
  @media screen and (max-width: 1023px) {
    max-height: 100%;
    flex-direction: column;
    padding: 0;
    ${Card} {
      width: 100%;
    }
  }
  padding: 68px 93px 0 141px;
  min-height: calc(100vh - 118px);
`;

export const CardsContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 32px;
  padding-left: 0;
  position: relative;
  .slick-slider {
    height: 550px !important;
  }
  .slick-slider > button {
    height: 500px;
  }
  .slick-slider .slick-slide:after {
    background: transparent !important;
  }
  .slick-slider .slick-dots {
    bottom: 6px !important;
  }
  .slick-slider > button {
    height: 100px;
    top: 200px;
    width: 60px;
    :hover {
      background-color: ${({ theme }) => theme.palette.gray[50].value};
      svg {
        width: 100%;
      }
    }
    :first-child {
      border-radius: 0 12px 12px 0;
    }
    :nth-child(3) {
      border-radius: 12px 0 0 12px;
    }
  }
  .slick-dots li {
    width: 16px;
  }
  @media screen and (max-width: 1023px) {
    padding: 0;
    flex-direction: column;
    align-items: center;
    .slick-slider {
      height: 590px;
    }
  }
`;

export const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;

  .react-grid-item.react-grid-placeholder {
    background-color: ${({ theme }) => theme.palette.violet[80].value};
    border-radius: 14px;
  }
  
  @media screen and (min-width: 1023px) {
    max-height: calc(100vh - 76px);
    min-width: 708px;
    padding-bottom: 18px;
    overflow-y: auto;
    overflow-x: hidden;
    ::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  padding: 8px 16px 0;
  width: 100%;
  @media screen and (min-width: 1023px) {
    padding-right: 48px;
  }
`;

export const LogoWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  @media screen and (max-width: 1023px) {
    padding-bottom: 6rem;
  }
`;

export const InfiniteScrollComponentContainer = styled.span`
  @media screen and (max-width: 1023px) {
    .infinite-scroll-component {
      height: calc(100vh - 104px) !important;
      overflow: unset !important;
    }
  }
  width: 100%;
  ${StyledCarousel} {
    cursor: pointer;
  }
`;
