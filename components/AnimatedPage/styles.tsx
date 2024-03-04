import Image from 'next/image';
import styled from 'styled-components';
import { CarouselContainerDesktop } from './CarouselDesktop/styles';
type CarouselContainerProps = {
  inContentView: boolean;
}

export const ArticleContainer = styled.div`
  min-height: 100vh;
`;

export const ArticleContainerRelative = styled.div`
  position: relative;
  display: flex;
  min-height: 100vh;
  @media (max-width: 1024px) {
    flex-direction: column;
  }
  `;

export const AnimatedPageContainer = styled.div`
  overflow: hidden;
  min-height: calc(100vh - 66px);
  padding: 0 20px;
  margin: 0 auto;
  margin-bottom: 66px;
  diplay: flex;
  @media (min-width: 1200px) {
    width: calc(100vw - 21px);
  }
  
`;

export const CarouselContainer = styled.div<CarouselContainerProps>`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  
  justify-content: center;
  position: absolute;
  top: 0;
  width: 100%;
  ${({ inContentView }) => inContentView
  && `
  right: 0;
  bottom: 0;
  ${CarouselContainerDesktop} {
    width: 100%;
    bottom: 0;
    position: absolute;
  }
  `}
  
  .slick-slider {
    height: 500px;
    width: 100%;
    background-size: cover;
    border-radius: 12px;
    overflow: hidden;
  }

  .slick-active {
    width: 300px !important;
    margin-right: 16px;
  }
`;

export const HR = styled.hr`
  width: 100%;
  border: 1px solid #2b2c2d;
  margin: 24px 0;
`;
export const H1 = styled.h1`
  margin-top: 24px;
  margin-bottom: 24px;
  overflow-wrap: break-word;

`;
export const ImageComponent = styled(Image)`
  object-fit: cover;
  border-radius: 24px;
`;

export const TagsContainer = styled.div`
  padding-top: 24px;
  display: flex;
  gap: 12px;
`;

export const Tags = styled.span`
  background-color: ${({ theme }) => theme.palette.gray[50].value};
  width: auto !important;
  padding: 4px 8px;
  border-radius: 16px;
  cursor: pointer;
`;
