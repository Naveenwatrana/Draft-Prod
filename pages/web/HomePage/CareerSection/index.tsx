import { joinInUrl } from 'common/utils/network/appRouts';
import lang from 'common/lang';
import Image from 'next/image';
import Text from 'components/textComp';
import FlexBox from 'components/Atoms/Flexbox';
import {
  CareerSectionTitle, CareerSection, CareerFeatureItem, Graphics, Features, Block, CareerBg, UserBlock,
  BlockTitle, CEOBlock, CompanyBlock, CEOBlockContent, CEOBlockData, CareerFeatureBlock, Feature2, Explore2SectionBoxTitle, FeatureOne, FeatureThree,
} from './style';
import {
  Container, CreateProfileCTA, SkeletonLoader,
} from '../style';
import RiotImage from './images/riot-logo.png';
import userImage from './images/user.png';
import quoteImage from './images/quote.png';
import focusImage from './images/Focus.png';
import likeImage from './images/Like.png';
import regularImage from './images/Regular.png';

const { careerSection } = lang.homePage;

const CareerSections = () => {
  return (
    <CareerSection id="connect">
      <Container>
        <CareerSectionTitle component="h2">
          {careerSection.title}
        </CareerSectionTitle>
        <Graphics>
          <Features>
            <CareerFeatureBlock>
              <Image src={likeImage.src} width={likeImage.width} height={likeImage.height} alt={likeImage.src} />
              <FeatureOne>
                <Explore2SectionBoxTitle component="h4">{careerSection.feature1Title}</Explore2SectionBoxTitle>
                <CareerFeatureItem component="p">{careerSection.feature1SubTitle}</CareerFeatureItem>
                <CreateProfileCTA href={joinInUrl}>{careerSection.feature1CTA}</CreateProfileCTA>
              </FeatureOne>
            </CareerFeatureBlock>

            <CareerFeatureBlock noBg>
              <Image src={focusImage.src} width={focusImage.width} height={focusImage.height} alt={focusImage.src} />
              <div>
                <Explore2SectionBoxTitle component="h4">{careerSection.feature2Title}</Explore2SectionBoxTitle>
                <CareerFeatureItem component="p">{careerSection.feature2SubTitle}</CareerFeatureItem>
              </div>
            </CareerFeatureBlock>

            <CareerFeatureBlock noBg>
              <Image src={regularImage.src} width={regularImage.width} height={regularImage.height} alt={regularImage.src} />
              <FeatureThree>
                <Explore2SectionBoxTitle component="h4">{careerSection.feature3Title}</Explore2SectionBoxTitle>
                <CareerFeatureItem component="p">{careerSection.feature3SubTitle}</CareerFeatureItem>
                <FlexBox justify="center">
                  <CreateProfileCTA href={joinInUrl}>{careerSection.feature1CTA}</CreateProfileCTA>
                </FlexBox>
              </FeatureThree>
            </CareerFeatureBlock>
          </Features>
          <Feature2>
            <CompanyBlock>
              <Image src={RiotImage.src} width={RiotImage.width} height={RiotImage.height} alt={RiotImage.src} />
              <Text>Riot Games</Text>
            </CompanyBlock>
            <UserBlock>
              <Image src={userImage.src} width={userImage.width} height={userImage.height} alt={userImage.src} />
              <div>
                <BlockTitle component="h4">{careerSection.feature4Title}</BlockTitle>
                <CareerFeatureItem component="p">{careerSection.feature4SubTitle}</CareerFeatureItem>
              </div>
            </UserBlock>

            <Block>
              <BlockTitle component="h4">{careerSection.feature5Title}</BlockTitle>
              <SkeletonLoader />
              <SkeletonLoader small />
            </Block>

            <CEOBlock>
              <BlockTitle component="h4">{careerSection.feature6Title}</BlockTitle>
              <CEOBlockContent>
                <Image src={quoteImage.src} width={quoteImage.width} height={quoteImage.height} alt={quoteImage.src} />
                <CEOBlockData>
                  <SkeletonLoader />
                  <SkeletonLoader />
                  <SkeletonLoader small />
                </CEOBlockData>
              </CEOBlockContent>
            </CEOBlock>
            <CareerBg />
          </Feature2>
        </Graphics>
      </Container>
    </CareerSection>

  );
};

export default CareerSections;
