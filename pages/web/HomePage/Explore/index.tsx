import { IFeedData } from 'pages/feed/types';
import ArticleCard from 'pages/feed/NewCards/ArticleCards';
import { joinInUrl } from 'common/utils/network/appRouts';
import lang from 'common/lang';
import {
  Background,
  Card1,
  Card2,
  ExploreSection, ExploreSectionSubTitle, ExploreSectionText, ExploreSectionTitle, ExploreBg,
} from './style';
import { CTALink, Container } from '../style';
import bgImage from './images/bg.png';

const { exploreSection } = lang.homePage;
const card1 = {
  title: 'America\'s offices are emptier than at any point in at least four decades, reflecting years of overbuilding and shifting work habits',
  id: 4,
  date: '2 days ago',
  published_date: '2 days ago',
  comments_count: 32,
  upvotes_count: 1300,
  preview_image: 'https://draftfl.akamaized.net/barry-allen/1706684314399_coverimage__1__png.png',
  creator: {
    name: 'The Wall Street Journal',
    cards: [
      {
        fields: {
          media: 'https://draftfl.akamaized.net/the-draft/1694694563623_img_82_png.png',
        },
      },
    ],
  },
};
const card2 = {
  title: 'New York Wants More Electric Ubers. Everyone Is Mad',
  id: 5,
  date: '2 days ago',
  published_date: '2 days ago',
  comments_count: 32,
  upvotes_count: 1300,
  creator: {
    name: 'Wired',
    cards: [
      {
        fields: {
          media: 'https://draftfl.akamaized.net/the-draft/1694694563623_img_82_png.png',
        },
      },
    ],
  },
  preview_image: 'https://draftfl.akamaized.net/barry-allen/1706685105060_coverimage__2__png.png',
};
const Explore = () => {
  return (
    <ExploreSection id="explore">
      <Container>
        <ExploreBg style={{ right: '20px' }} />
        <ExploreBg style={{ left: '20px' }} />
        <ExploreSectionText>
          <ExploreSectionTitle component="h2">
            {exploreSection.title}
          </ExploreSectionTitle>
          <ExploreSectionSubTitle component="p">
            {exploreSection.subTitle}
          </ExploreSectionSubTitle>
          <CTALink href={joinInUrl}>{exploreSection.exploreNow}</CTALink>
        </ExploreSectionText>
        <Background src={bgImage.src} alt={bgImage.src} width={bgImage.width} height={bgImage.height} />
        <div>
          <Card1>
            <ArticleCard
              data={card1 as unknown as IFeedData}
              postCard
              width={302}
              height={256}
              clickable={false}
            />
          </Card1>
          <Card2>
            <ArticleCard
              data={card2 as unknown as IFeedData}
              postCard
              width={252}
              height={270}
              clickable={false}
            />
          </Card2>
        </div>
      </Container>
    </ExploreSection>
  );
};

export default Explore;
