import { ExploreBg } from 'pages/web/HomePage/style';
import lang from 'common/lang';
import { joinInUrl } from 'common/utils/network/appRouts';
import Image from 'next/image';
import Image1 from './images/graphic.png';
import {
  Banner, BannerSubTitle, BannerText, BannerTitle, CTAButton, GraphicText, Graphics, HeroSection, SubTitle2, Tag, Title2,
} from './style';
import { Container } from '../style';

const { heroBanner } = lang.businessPage;
const {
  banner, bannerTextDescription, getStarted, forBusiness, featureTitle, detail1, detail2,
} = heroBanner;

const HeroBanner = () => {
  return (
    <HeroSection>
      <Container className="App">
        <Banner>
          <BannerText>
            <Tag>{forBusiness}</Tag>
            <BannerTitle component="h1">{banner}</BannerTitle>
            <BannerSubTitle component="p">{bannerTextDescription}</BannerSubTitle>
            <CTAButton href={joinInUrl}>{getStarted}</CTAButton>
          </BannerText>
          <ExploreBg />
        </Banner>
        <Graphics>
          <GraphicText>
            <Title2>{featureTitle}</Title2>
            <SubTitle2>{detail1}</SubTitle2>
            <SubTitle2>{detail2}</SubTitle2>
          </GraphicText>
          <Image
            src={Image1.src}
            alt={Image1.src}
            width={Image1.width}
            height={Image1.height}
          />
        </Graphics>

      </Container>
    </HeroSection>
  );
};
export default HeroBanner;
