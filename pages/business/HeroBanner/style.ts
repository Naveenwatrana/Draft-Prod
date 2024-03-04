import styled from 'styled-components';
import Text from 'components/textComp';
import Link from 'next/link';
import { ExploreBg } from 'pages/web/HomePage/style';
import CurvesImage from './images/bg.png';

export const HeroSectionBg = styled.div`
`;
export const HeroSection = styled.div`
  background-image: url('${CurvesImage.src}');
  background-size: 100%;
  background-repeat: no-repeat;
  background-color: #080808;
  background-position: center -100px;

`;
export const BannerTitle = styled(Text)`
  width: 962px;
  text-align: center;
  margin: 0 auto;
  font-size: 54px;
  @media (max-width: 910px) {
    width: auto;
    padding: 0 40px;
    font-size: 34px;
  }
`;
export const Tag = styled.p`
  background-color: #523C67;
  font-size: 14px;
  padding: 8px 16px;
  border-radius: 99px;
  font-weight: 500;
  margin-bottom: 16px;
  display: inline-block;
  margin-top: 100px;
  @media (max-width: 910px) {
    margin-top: 30px;
  }
`;
export const BannerSubTitle = styled(Text)`
  width: 535px;
  font-size: 20px;
  margin: 24px auto;
  color: ${({ theme }) => theme.palette.white[100].value};
  @media (max-width: 910px) {
    width: auto;
    padding: 0 40px;
    font-size: 16px;
  }
`;
export const CTAButton = styled(Link)`
  background-color: ${({ theme }) => theme.palette.green[80].value};
  color: ${({ theme }) => theme.palette.gray[60].value};
  border-radius: 8px;
  padding: 8px 16px;
  width: 83px;
  font-weight: 500;
`;
export const Banner = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 100px;
  align-items: center;
  box-shadow: 0px 7px 21px rgba(0, 0, 0, 0.5) inset;
  gap: 24px;
  ${CTAButton} {
    width: 95px;
  }
  ${ExploreBg} {
    width: 376.443px;
    height: 376.443px;
    flex-shrink: 0;
    border-radius: 376.443px;
    opacity: 0.7;
    top: 200px;
    background: var(--background-notification-info, #31306B);
    filter: blur(159.9499969482422px);
  }
`;
export const BannerText = styled.div`
  position: relative;
  text-align: center;
  width: 100%;
  z-index: 1;
  ${CTAButton} {
    display: inline-block;
  }
`;
export const Graphics = styled.div`
  width: 920px;
  margin: 90px auto 0;
  padding-bottom: 90px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 910px) {
    width: calc(100% - 120px);
    padding: 0 40px;
    flex-direction: column;
    margin: 60px auto 0;
    gap: 24px;
    & > img {
      width: 100%;
      height: auto;
    }
  }
`;
export const Title2 = styled(Text)`
  font-size: 40px;
  font-weight: 500;
  @media (max-width: 910px) {
    font-size: 32px;
  }
`;
export const SubTitle2 = styled(Text)`
  margin-top: 24px;
`;
export const GraphicText = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  @media (max-width: 910px) {
    width: 100%;
  }
`;
