import React from 'react';
import { joinInUrl, signUpUrl } from 'common/utils/network/appRouts';
import MeltwaterCard from 'pages/workspace/common/Feed/MeltwaterCardStatic';
import lang from 'common/lang';
import ArticleCard from 'pages/feed/NewCards/ArticleCards';
import PostCard from 'pages/feed/NewCards/PostCards';
import JobCards from 'pages/feed/NewCards/JobCards';
import UserCards from 'pages/feed/NewCards/UserCard';
import { MeltwaterCardType } from 'pages/workspace/common/Feed/types';
import { IFeedData } from 'pages/feed/types';
import {
  Banner,
  BannerCardContainer,
  BannerCards,
  BannerSubTitle,
  BannerText,
  BannerTitle,
  CTALink,
  Container,
  ExploreBg,
  HeroSection,
  HighlightedText,
} from './style';
import ProfileSection from './ProfileSection';
import CareerSections from './CareerSection';
import ConnectSections from './ContentSection';
import Explore from './Explore';
import Footer from './Footer';
import {
  cards, meltwaterCard, mockJob, userBartek, userDanBrown, videoCard,
} from './data';
import HomeHeader from './Header';

const {
  banner, bannerTextDescription, startForFree, banner2, banner3,
} = lang.homePage;

const HomePage = () => {
  return (
    <div>
      <HeroSection>
        <Container className="App">
          <HomeHeader />
          <Banner>
            <BannerText>
              <BannerTitle component="h1">
                {banner}
                {' '}
                <br />
                {banner2}
                <HighlightedText>{banner3}</HighlightedText>
              </BannerTitle>
              <BannerSubTitle component="p">{bannerTextDescription}</BannerSubTitle>
              <CTALink href={joinInUrl}>{startForFree}</CTALink>
            </BannerText>
            <BannerCardContainer>
              <BannerCards style={{ transform: 'translateY(140px)' }}>
                <JobCards
                  data={mockJob as unknown as IFeedData}
                  clickable={false}
                />
                <UserCards
                  data={userBartek}
                />
              </BannerCards>
              <BannerCards>
                {cards.slice(0, 1).map((card) => (
                  <ArticleCard
                    data={card as unknown as IFeedData}
                    key={card.id}
                    clickable={false}
                  />
                ))}
                <PostCard
                  data={videoCard as unknown as IFeedData}
                  key={videoCard.id}
                  postCard
                  clickable={false}
                />
              </BannerCards>
              <BannerCards style={{ transform: 'translateY(140px)' }}>
                <UserCards
                  data={userDanBrown}
                />
                <MeltwaterCard
                  {...meltwaterCard}
                  cardType={MeltwaterCardType.horizontal}
                  clickable={false}
                />
              </BannerCards>
            </BannerCardContainer>
            <ExploreBg />
          </Banner>

        </Container>
      </HeroSection>
      <ProfileSection />
      <CareerSections />
      <ConnectSections />
      <Explore />
      <Footer />
    </div>
  );
};

export default HomePage;
