import HomeHeader from 'pages/web/HomePage/Header';
import { NavigationType } from 'pages/web/HomePage/Header/types';
import CommonFooter from 'pages/web/HomePage/Footer/CommonFooter';
import HeroBanner from './HeroBanner';
import { Container, Wrapper } from './style';
import DraftFeatures from './DraftFeatures';
import Sections from './Sections';

const BusinessPage = () => {
  return (
    <Wrapper>
      <HomeHeader activeMenu={NavigationType.FOR_BUSINESS} />
      <HeroBanner />
      <DraftFeatures />
      <Sections />
      <Container>
        <CommonFooter email="membership@thedraft.io" />
      </Container>
    </Wrapper>
  );
};

export default BusinessPage;
