import styled from 'styled-components';
import Text from 'components/textComp';
import { CreateProfileCTA, Explore2SectionBox } from '../style';
import Bg from './images/career-bg.png';

export const Block = styled.div`
  display: flex;
  height: 52px;
  align-items: flex-start;
  flex-direction: column;
  gap: 9px;
  flex-shrink: 0;
  border-radius: 17px;
  border: 1px solid #282629;
  background: #1F1D20;
  box-shadow: 0px 0px 28.153px 0px #000;
  width: 217px;
  padding: 14px;
  gap: 4px;
  transform: translate(42px, 0px);
`;
export const UserBlock = styled(Block)`
  height: 65px;
  transform: translate(0px, 0px);
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;
export const CEOBlockContent = styled.div`
  display: flex;
  width: 100%;
  gap: 8px;
  align-items: center;
`;
export const CEOBlockData = styled(CEOBlockContent)`
  flex-direction: column;
  align-items: flex-start;
`;
export const CEOBlock = styled(Block)`
  transform: translate(0px, 0px);
  height: 68px;
`;
export const BlockTitle = styled(Text)`
  font-size: 16px;
`;

export const CareerSection = styled.div`
  padding: 100px 0 0;
  display: flex;
  justify-content: center;
  box-shadow: 0px -120px 45px 60px ${({ theme }) => theme.palette.gray[80].value};
  position: relative;
  background-color: #080808;
  @media (max-width: 910px) {
    box-shadow: none;
  }
`;
export const CareerSectionTitle = styled(Text)`
  font-size: 40px;
  width: 457px;
  font-family: ${({ theme }) => theme.homePageFont};
  margin: 0 auto 60px;
  @media (max-width: 910px) {
    width: 300px;
    font-size: 34px;
    margin: 0 auto;
    text-align: center;
  }
`;
export const CareerSectionSubTitle = styled(Text)``;
export const CareerFeatureItem = styled(Text)`
`;
export const Graphics = styled.div`
  display: flex;
  width: 957px;
  margin: 0 auto;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 910px) {
    flex-direction: column-reverse;
  }
`;
export const Features = styled.div`
  width: 300px;
  ${Explore2SectionBox} {
    margin-bottom: 0px;
    padding: 20px;
  }
  ${Block} {
    margin-bottom: 24px;
    position: relative;
    z-index: 1;
  }
  @media (max-width: 910px) {
    width: auto;
  }
`;
export const Feature2 = styled(Features)`
  @media (max-width: 910px) {
    margin-top: 50px;
    margin-left: 50px;
    transform: scale(0.7);
  }
`;

export const CareerBg = styled.div`
  background-image: url(${Bg.src});
  border-radius: 263.98px;
  position: absolute;
  width: 548px;
  height: 475px;
  z-index: 0;
  top: 260px;
  margin-left: -204px;
  @media (max-width: 910px) {
    top: -72px;
  }
`;
export const CompanyBlock = styled.div`
  position: absolute;
  transform: translate(-150px,122px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;
export const CareerFeatureBlock = styled(Explore2SectionBox)`
  display: flex;
  gap: 16px;
  @media (max-width: 910px) {
    background: none;
  }
  & img {
    margin-top: 8px;
  }
`;

export const Explore2SectionBoxTitle = styled(Text)`
  margin-bottom: 24px;
  font-size: 24px;
`;
export const FeatureOne = styled.div`
  ${CreateProfileCTA} {
    @media (max-width: 910px) {
      display: none;
    }
  }
`;
export const FeatureThree = styled.div`
${CreateProfileCTA} {
  margin-left: -20px;
  @media (min-width: 910px) {
    display: none;
  }
}
`;
