import Text from 'components/textComp';
import Link from 'next/link';
import styled from 'styled-components';
import CurvesImage from './images/bg.png';

export const CTAButtonMute = styled(Link)`
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.05);
  color: ${({ theme }) => theme.palette.white[100].value};
  padding: 8px 0;
  width: 100%;
  text-align: center;
`;
export type SkeletonLoaderProps = {
  small?: boolean;
  height?: number;
  bottom?: number;
};

export const ConnectSectionText = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  transform: translate(0, 259px);
`;
export const SkeletonLoader = styled.div<SkeletonLoaderProps>`
  border-radius: 4px;
  background: ${({ theme }) => theme.palette.gray[50].value};
  height: ${({ height }) => height ? `${height}px` : '10px'};
  width: ${({ small }) => small ? '50%' : '100%'};
  margin-bottom: ${({ bottom }) => bottom ? `${bottom}px` : '0px'};
`;
export const HeroSectionBg = styled.div`
`;

export const Explore2SectionBoxTitle = styled(Text)`
  margin-bottom: 24px;
  font-size: 24px;
  font-family: ${({ theme }) => theme.homePageFont};
`;
export const HeroSection = styled.div`
  background-image: url('${CurvesImage.src}');
  background-size: 100%;
  background-repeat: no-repeat;
  background-color: #080808;
  height: 1300px;
  overflow: hidden;
  background-position: center -100px;
  @media (max-width: 910px) {
    height: 1200px;
  }

`;
export const HighlightedText = styled.span`
  color: #FAFFB0;
  margin-left: 15px;
`;
export const Container = styled.div`
  max-width: 1180px;
  margin: 0 auto;
`;
export const MobileContainer = styled.div`
  width: calc(100% - 40px);
  padding: 0 20px;
  img {
    width: 100%;
    height: auto;
    @media (max-width: 910px) {
      max-width: 384px;
    }
  }
  ${ConnectSectionText} {
   transform: translateY(0px); 
   margin-bottom: 42px;
  }
`;

export const ExploreBg = styled.div`
  border-radius: 263.98px;
  background: #31306B;
  filter: blur(94.55000305175781px);
  position: absolute;
  width: 263.98px;
  height: 263.98px;
  flex-shrink: 0;
  z-index: 0;
  top: 400px;
`;
export const BannerTitle = styled(Text)`
  width: 775px;
  text-align: center;
  margin: 0 auto 0;
  font-size: 54px;
  font-family: ${({ theme }) => theme.homePageFont};
  @media (max-width: 910px) {
    width: auto;
    padding: 0 40px;
    font-size: 34px;
  }
`;
export const BannerSubTitle = styled(Text)`
  width: 535px;
  font-size: 20px;
  margin: 24px auto;
  color: ${({ theme }) => theme.palette.gray[10].value};
  @media (max-width: 910px) {
    width: auto;
    padding: 0 40px;
  
  }
`;
export const CTAButton = styled.button`
  background-color: ${({ theme }) => theme.palette.green[80].value};
  color: ${({ theme }) => theme.palette.gray[60].value};
  border-radius: 8px;
  padding: 8px 16px;
  width: 83px;
  font-weight: 500;
  border: none;
`;
export const CTALink = styled(Link)`
  background-color: ${({ theme }) => theme.palette.green[80].value};
  color: ${({ theme }) => theme.palette.gray[60].value};
  border-radius: 8px;
  padding: 8px 16px;
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
  margin-top: 100px;
  z-index: 1;
  ${CTAButton} {
    display: inline-block;
  }
  @media (max-width: 910px) {
    margin-top: 10px;
  }
`;
export const BannerCardContainer = styled.div`
  margin: 0 auto;
  width: 1036px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  @media (max-width: 910px) {
    margin-left: calc((-1036px + 100%)/2);
    transform: translateY(-140px) scale(0.7);
  }
`;
export const BannerCards = styled.div`
  gap: 24px;
  margin-top: 40px;
  & > div {
    margin-bottom: 24px;
  }
`;
export const CreateProfileCTA = styled(Link)`
  border: 1px solid ${({ theme }) => theme.palette.green[80].value};
  border-radius: 16px;
  padding: 10px 16px;
  width: 109px;
  font-size: 14px;
`;

export type Explore2SectionBoxProps = {
  noBg?: boolean;
};

export const Explore2SectionBox = styled.div<Explore2SectionBoxProps>`
  border-radius: 16px;
  width: 332px;
  padding: 40px;
  background: ${({ theme, noBg }) => noBg ? 'transparent' : `linear-gradient(137deg, #292753 -24.15%, #212040 82.03%), var(--background-job-light, ${theme.palette.violet[90].value})`};
  ${CreateProfileCTA} {
    margin-top: 24px;
    display: inline-block;
    width: auto;
  }
`;
export const CreateProfileCTAMobile = styled(Link)`
  border: 1px solid ${({ theme }) => theme.palette.green[80].value};
  border-radius: 16px;
  padding: 10px 16px;
  font-size: 14px;
  display: none;
  @media (max-width: 910px) {
    display: block;
  }
`;
export const HubSpotFormModal = styled.div`
  position: fixed;
  top: 10%;
  background: #3498db;
  width: 600px;
  margin: 0 20%;
  padding: 30px;
  z-index: 10;
  border-radius: 10px;
  box-shadow: 0 0 40px 20px rgba(0, 0, 0, 0.4);
  transition: 0.3s;
  display: block;
`;
