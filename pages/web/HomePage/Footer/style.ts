import Text from 'components/textComp';
import styled from 'styled-components';
import FlexBox from 'components/Atoms/Flexbox';
import CurvesImage from './images/bg.png';
import { CTAButton, CreateProfileCTA } from '../style';

export const FeatureItem = styled.p`
line-height: 35px;
  &::before {
    content: '• ';
    padding-right: 6px;
  }
`;

export const Explore2Section = styled.div`
  padding: 100px 0 0;
  display: flex;
  justify-content: center;
  width: 100%;
  background-image: url('${CurvesImage.src}');
  background-size: 100%;
  background-color: #080808;
  background-repeat: no-repeat;
`;
export const Explore2SectionTitle = styled(Text)`
  font-size: 40px;
  margin-bottom: 22px;
  font-family: ${({ theme }) => theme.homePageFont};
  @media (max-width: 910px) {
    padding: 0px;
  }
`;

export const Explore2SectionBox = styled.div`
  border-radius: 16px;
  width: 332px;
  padding: 40px;
  background: #C4B0DE;
  color: #121112;
  @media (max-width: 910px) {
    width: calc(100% - 128px);
    margin: 0 24px;

  }
  ${CreateProfileCTA} {
      margin-top: 24px;
      display: inline-block;
      width: auto;
      border: 1px solid #837694;
      color: #121112;
      font-weight: 500;
    }
  
`;
export const Explore2SectionText = styled.div`
  width: 100%;
  text-align: center;
  margin-bottom: 82px;
`;

export const Explore2SectionSubTitle = styled(Text)`
  font-size: 16px;
  width: 665px;
  margin: 0 auto;
  @media (max-width: 910px) {
    width: calc(100% - 20px);
    padding: 0 10px;
  }
`;
export const Explore2SectionBoxes = styled.div`
  display: flex;
  gap: 40px;
  @media (max-width: 910px) {
    flex-direction: column;
    align-items: center;
  }
`;
export const Explore2SectionBoxTitle = styled(Text)`
  margin-bottom: 24px;
  font-size: 24px;
  color: #121112;
`;
export const JobCard = styled.div`
  position: absolute;
  transform: translate(700px, -100px) rotate(-15deg);
  @media (max-width: 910px) {
    display: none;
  }
`;
export const UserCard = styled.div`
position: absolute;
transform: translate(-200px, 0px) rotate(15deg);
@media (max-width: 910px) {
  display: none;
}
`;
export const CallToAction = styled.div`
  width: 100%;
  margin-bottom: 100px;
  ${FlexBox} {
    flex-direction: column;
    align-items: center;
  };
  ${CTAButton} {
    width: auto;
  }
`;
export const CTAText = styled(Text)`
  font-size: 40px;
  margin-top: 200px;
  text-align: center;
  margin-bottom: 34px;
  @media (max-width: 910px) {
    margin-top: 82px;
  }
`;
