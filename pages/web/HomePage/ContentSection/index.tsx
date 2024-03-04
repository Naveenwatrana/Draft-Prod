import lang from 'common/lang';
import Image from 'next/image';
import { useIsMobile } from 'common/hooks/useIsMobile';
import {
  Bg,
  Block,
  Block11,
  Block12,
  Block2,
  Block3,
  Block4,
  Block6,
  Block8,
  Block9,
  ConnectBg,
  ConnectSection, ConnectSectionSubTitle, ConnectSectionText, ConnectSectionTitle, FlexBox, InnerBlock,
} from './style';
import { Container, MobileContainer, SkeletonLoader } from '../style';
import userImage from './images/coverimage.png';
import arrowImage from './images/smallIcons.png';
import saveImage from './images/save.png';
import user2Image from './images/user2.png';
import articleImage from './images/article.png';
import user3Image from './images/user3.png';
import user4Image from './images/user4.png';
import stockXImage from './images/stockX.png';
import block12Image from './images/block12.png';
import linesImage from './images/bg.png';
import GraphicMobile from './images/graphicMobile.png';

const { connectSection } = lang.homePage;

const ConnectSections = () => {
  const isMobile = useIsMobile();
  return (
    <ConnectSection id="career">
      {isMobile && (
        <MobileContainer>
          <ConnectSectionText>
            <ConnectSectionTitle component="h2">
              {connectSection.title1}
            </ConnectSectionTitle>
            <ConnectSectionTitle component="h2">
              {connectSection.title2}
            </ConnectSectionTitle>
            <ConnectSectionSubTitle component="p">
              {connectSection.subTitle}
            </ConnectSectionSubTitle>
          </ConnectSectionText>
          <FlexBox justify="center">
            <Image src={GraphicMobile.src} alt={GraphicMobile.src} width={GraphicMobile.width} height={GraphicMobile.height} />
          </FlexBox>
        </MobileContainer>
      )}
      {!isMobile && (
        <Container>
          <Bg>
            <Image src={linesImage.src} alt={linesImage.src} width={linesImage.width} height={linesImage.height} />
          </Bg>
          <ConnectBg />
          <ConnectSectionText>
            <ConnectSectionTitle component="h2">
              {connectSection.title1}
            </ConnectSectionTitle>
            <ConnectSectionTitle component="h2">
              {connectSection.title2}
            </ConnectSectionTitle>
            <ConnectSectionSubTitle component="p">
              {connectSection.subTitle}
            </ConnectSectionSubTitle>
          </ConnectSectionText>
          <div style={{ display: 'block' }}>
            <Block style={{ transform: 'translate(-70px, -140px)' }}>
              <Image src={userImage.src} alt={userImage.src} width={userImage.width} height={userImage.height} />
            </Block>
            <Block2>
              <p>{connectSection.makeConnections}</p>
            </Block2>
            <Block3>
              <Image src={user2Image.src} alt={user2Image.src} width={user2Image.width} height={user2Image.height} />
            </Block3>
            <Block4>
              <Image src={arrowImage.src} alt={arrowImage.src} width={arrowImage.width} height={arrowImage.height} />
            </Block4>
            <Block style={{ transform: 'translate(560px, -150px)' }}>
              <Image src={articleImage.src} alt={articleImage.src} width={articleImage.width} height={articleImage.height} />
            </Block>
            <Block6>
              <Image src={saveImage.src} alt={saveImage.src} width={saveImage.width} height={saveImage.height} />
            </Block6>
            <Block style={{ transform: 'translate(810px, -30px)' }}>
              <Image src={user3Image.src} alt={user3Image.src} width={user3Image.width} height={user3Image.height} />
            </Block>
            <Block8>
              <p>{connectSection.applyForJobs}</p>
            </Block8>
            <Block9>
              <p>{connectSection.productManager}</p>
              <SkeletonLoader />
              <SkeletonLoader />
              <SkeletonLoader small />
            </Block9>
            <Block style={{ transform: 'translate(710px, 330px)' }}>
              <Image src={stockXImage.src} alt={stockXImage.src} width={stockXImage.width} height={stockXImage.height} />
            </Block>
            <Block style={{ transform: 'translate(360px, 330px)' }}>
              <Image src={user4Image.src} alt={user4Image.src} width={user4Image.width} height={user4Image.height} />
            </Block>
            <Block11>
              <p>{connectSection.block11Text}</p>
              <FlexBox>
                <Image src={user4Image.src} alt={user4Image.src} width={24} height={24} />
                <p>{connectSection.ann}</p>
              </FlexBox>
            </Block11>
            <Block12>
              <Image src={block12Image.src} alt={block12Image.src} width={block12Image.width} height={block12Image.height} />
              <InnerBlock>
                <FlexBox>
                  <Image src={stockXImage.src} alt={stockXImage.src} width={30} height={32} />
                  <p>{connectSection.block12Title}</p>
                  <SkeletonLoader />
                  <SkeletonLoader />
                  <SkeletonLoader small />
                  <FlexBox>
                    <Image src={user4Image.src} alt={user4Image.src} width={24} height={24} />
                    <p>{connectSection.ann}</p>
                  </FlexBox>
                </FlexBox>
              </InnerBlock>
            </Block12>
          </div>
        </Container>
      )}
    </ConnectSection>

  );
};

export default ConnectSections;
