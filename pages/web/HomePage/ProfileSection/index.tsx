import lang from 'common/lang';
import Image from 'next/image';
import { SkillSection, SkillTag } from 'components/Organisms/ProfileBio/style';
import { joinInUrl } from 'common/utils/network/appRouts';
import YouImage from './you-section-1.png';
import InstagramIcon from './github-icon.png';
import ProfileMobile from './profileMobile.png';
import UserImage from './user.png';
import HighlightImage from './2.png';
import EmbedCard from './embededCards.png';
import BreifCaseIcon from './breifcase.png';
import {
  BioBlock,
  Block,
  BlockContent,
  BlockData,
  Content,
  GraphicMobile,
  HighlightImageBlock,
  ImageBlock,
  ImageBlockLarge,
  InstagramBlock,
  LargeBlock,
  ProfileSkeleton,
  UserCardBlock,
  YouSection, YouSectionSubTitle, YouSectionSubTitleSection, YouSectionText, YouSectionTitle,
} from './style';
import {
  CTAButtonMute, Container, CreateProfileCTA, SkeletonLoader,
} from '../style';
import TrendsImage from './trends.png';

const { buttonText, homePage } = lang;
const { youSection } = homePage;
const tags = ['Blockchain', 'React', 'Communication', 'Web development', 'Strategic thinking', '+3'];
const ProfileSection = () => {
  return (
    <YouSection id="you">
      <Container>
        <YouSectionText>
          <YouSectionTitle component="h2">{youSection.title}</YouSectionTitle>
          <YouSectionSubTitleSection>
            <YouSectionSubTitle component="p">{youSection.subTitle}</YouSectionSubTitle>
            <YouSectionSubTitle component="p">{youSection.subTitle2}</YouSectionSubTitle>
            <CreateProfileCTA href={joinInUrl}>{youSection.createMyProfile}</CreateProfileCTA>
          </YouSectionSubTitleSection>
        </YouSectionText>
        <ProfileSkeleton>
          <div>
            <Image alt={youSection.title} src={YouImage.src} width={YouImage.width} height={YouImage.height} />
            <div style={{ marginTop: '-50px' }}>
              <SkeletonLoader height={12} bottom={10} />
              <SkeletonLoader height={12} bottom={10} />
              <SkeletonLoader height={12} bottom={10} />
              <SkeletonLoader small height={12} bottom={10} />
              <SkillSection>
                {tags.map((skill: string) => (
                  <SkillTag key={skill}>{skill}</SkillTag>
                ))}
              </SkillSection>
            </div>
          </div>
          <Content>
            <InstagramBlock highlight>
              <Image alt={youSection.myInstagram} src={InstagramIcon.src} width={InstagramIcon.width} height={InstagramIcon.height} />
              <span>{youSection.myInstagram}</span>
              <CTAButtonMute href={joinInUrl}>{youSection.letsConnect}</CTAButtonMute>
            </InstagramBlock>
            <Block>
              <span>Experience</span>
              <BlockContent>
                <Image alt={youSection.myInstagram} src={BreifCaseIcon.src} width={BreifCaseIcon.width} height={BreifCaseIcon.height} />
                <BlockData>
                  <SkeletonLoader />
                  <SkeletonLoader />
                  <SkeletonLoader small />
                </BlockData>
              </BlockContent>
              <BlockContent>
                <Image alt={youSection.myInstagram} src={BreifCaseIcon.src} width={BreifCaseIcon.width} height={BreifCaseIcon.height} />
                <BlockData>
                  <SkeletonLoader />
                  <SkeletonLoader />
                  <SkeletonLoader small />
                </BlockData>
              </BlockContent>
            </Block>
            <LargeBlock bordered>
              <UserCardBlock>
                <Image src={TrendsImage.src} height={TrendsImage.height} width={TrendsImage.width} alt={TrendsImage.src} />
                <span>Tech Trends 2024</span>
                <CTAButtonMute href={joinInUrl}>{buttonText.more}</CTAButtonMute>
              </UserCardBlock>

            </LargeBlock>
            <BioBlock fullSize>
              <span>{youSection.bioTitle}</span>
              <span>{youSection.bio}</span>
            </BioBlock>
            <Block bordered>
              <HighlightImageBlock highlight>
                <Image src={HighlightImage.src} width={HighlightImage.width} height={HighlightImage.height} alt={HighlightImage.src} />
              </HighlightImageBlock>
            </Block>
            <ImageBlock>
              <Image src={UserImage.src} width={UserImage.width} height={UserImage.height} alt={UserImage.src} />
            </ImageBlock>
            <ImageBlockLarge fullSize>
              <Image src={EmbedCard.src} width={EmbedCard.width} height={EmbedCard.height} alt={EmbedCard.src} />
            </ImageBlockLarge>
          </Content>
        </ProfileSkeleton>
        <GraphicMobile>
          <Image alt={ProfileMobile.src} src={ProfileMobile.src} width={ProfileMobile.width} height={ProfileMobile.height} />
        </GraphicMobile>
      </Container>
    </YouSection>
  );
};

export default ProfileSection;
