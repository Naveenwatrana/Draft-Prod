import { businessPageUrl, joinInUrl } from 'common/utils/network/appRouts';
import lang from 'common/lang';
import { IFeedData } from 'pages/feed/types';
import JobCards from 'pages/feed/NewCards/JobCards';
import FlexBox from 'components/Atoms/Flexbox';
import UserCards from 'pages/feed/NewCards/UserCard';
import {
  CTALink, Container, CreateProfileCTA,
} from '../style';
import {
  CTAText,
  CallToAction,
  Explore2Section, Explore2SectionBoxTitle, Explore2SectionBoxes, Explore2SectionSubTitle,
  Explore2SectionText, Explore2SectionTitle, FeatureItem, JobCard, UserCard, Explore2SectionBox,
} from './style';
import userImage from './images/user.png';
import CommonFooter from './CommonFooter';

const {
  exploreSection2, roomForEveryone, footer, startForFree,
} = lang.homePage;
const { forTalent, forBusiness } = roomForEveryone;

const mockJob = {
  matches: {
    base_salary_match: true,
    location_type: true,
    location: true,
    skills: true,
  },
  salary_from: 100000,
  salary_to: 200000,
  location_type: 'Hybrid',
  location: 'New York, NY',
  user_matched_skills_count: 8,
  job_skills_count: 12,
  match_score: 87,
  company: {
    logo: 'https://draftfl.akamaized.net/roblox/1694756107380_img_88_jpeg.jpeg',
    name: 'Roblox',
  },
  title: 'Software Engineer',
  created_at: '2024-01-10T18:30:00.000Z',
};
const mockUser = {
  name: 'Kasie J. Lewis',
  matches: {
    base_salary_match: true,
    location_type: true,
    location: true,
    skills: true,
  },
  salary_from: 100000,
  salary_to: 200000,
  location_type: 'Hybrid',
  location: 'New York, NY',
  user_matched_skills_count: 8,
  job_skills_count: 12,
  match_score: 87,
  company: {
    logo: 'https://draftfl.akamaized.net/roblox/1694756107380_img_88_jpeg.jpeg',
    name: 'Roblox',
  },
  title: 'Software Engineer',
  created_at: '2024-01-10T18:30:00.000Z',
};
const talentFeatures = [
  {
    id: 1,
    title: forTalent.feature1,
  },
  {
    id: 2,
    title: forTalent.feature2,
  },
  {
    id: 3,
    title: forTalent.feature3,
  },
  {
    id: 4,
    title: forTalent.feature4,
  },
];
const businessFeatures = [
  {
    id: 1,
    title: forBusiness.feature1,
  },
  {
    id: 2,
    title: forBusiness.feature2,
  },
  {
    id: 3,
    title: forBusiness.feature3,
  },
  {
    id: 4,
    title: forBusiness.feature4,
  },
];

const Footer = () => {
  return (
    <Explore2Section>
      <Container>
        <Explore2SectionText>
          <Explore2SectionTitle component="h2">
            {exploreSection2.title}
          </Explore2SectionTitle>
          <Explore2SectionSubTitle component="p">
            {exploreSection2.subTitle}
          </Explore2SectionSubTitle>
        </Explore2SectionText>
        <Explore2SectionBoxes>
          <Explore2SectionBox>
            <Explore2SectionBoxTitle component="h4">{forTalent.title}</Explore2SectionBoxTitle>
            {talentFeatures.map((feature) => (
              <FeatureItem key={feature.id}>{feature.title}</FeatureItem>
            ))}
            <CreateProfileCTA href={joinInUrl}>{forTalent.cta}</CreateProfileCTA>
          </Explore2SectionBox>
          <Explore2SectionBox>
            <Explore2SectionBoxTitle component="h4">{forBusiness.title}</Explore2SectionBoxTitle>
            {businessFeatures.map((feature) => (
              <FeatureItem key={feature.id}>{feature.title}</FeatureItem>
            ))}
            <CreateProfileCTA href={businessPageUrl}>{forBusiness.cta}</CreateProfileCTA>
          </Explore2SectionBox>
        </Explore2SectionBoxes>
        <JobCard>
          <JobCards
            clickable={false}
            data={mockJob as unknown as IFeedData}
          />
        </JobCard>
        <UserCard>
          <UserCards
            data={{
              UserImage: userImage.src,
              username: 'Kasie J. Lewis',
              location: 'Jacksonville, FL ',
              bio: 'Passionate marketer with a flair for creativity, helping brands soar to new heights through strategic campaigns. #MarketingGuru"',
              tags: ['Leadership', 'Copywriting', 'Marketing', 'Strategy', 'Content Marketing', '3+'],
            }}
          />
        </UserCard>
        <CallToAction>
          <FlexBox>
            <CTAText component="h5">{footer.signUpNow}</CTAText>
            <CTALink href={joinInUrl}>{startForFree}</CTALink>
          </FlexBox>
        </CallToAction>
        <CommonFooter />
      </Container>
    </Explore2Section>

  );
};

export default Footer;
