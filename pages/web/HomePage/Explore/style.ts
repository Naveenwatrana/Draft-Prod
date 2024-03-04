import Text from 'components/textComp';
import Image from 'next/image';
import styled from 'styled-components';
import { CTAButton, Container } from '../style';

export const ExploreSection = styled.div`
  padding: 100px 0;
  display: flex;
  justify-content: center;
  position: relative;
  background-color: #080808;
  ${Container} {
    position: relative;
    z-index: 1;
    padding-bottom: 0;
  }
`;

export const ExploreSectionText = styled.div`
  width: 100%;
  text-align: center;
  margin-bottom: 82px;
  ${CTAButton} {
    display: inline-block;
    margin-top: 24px;
    width: auto;
  }
  @media (max-width: 910px) {
    padding: 0 20px;
    width: auto;
  }
`;
export const ExploreSectionTitle = styled(Text)`
font-size: 40px;
font-family: ${({ theme }) => theme.homePageFont};
@media (max-width: 910px) {
  padding: 0px;
}
`;

export const ExploreSectionSubTitle = styled(Text)`
  font-size: 16px;
  margin: 34px auto;
  width: 483px;
  @media (max-width: 910px) {
    padding: 0;
    width: 100%;
  }
`;

export const ExploreBg = styled.div`
  border-radius: 263.98px;
  background: #31306B;
  filter: blur(94.55000305175781px);
  position: absolute;
  width: 263.98px;
  height: 263.98px;
  flex-shrink: 0;
  z-index: 0;
  top: 400px;
  @media (max-width: 910px) {
    height: 200px;
    opacity: 0.35;
    top: 500px;
  }
`;
export const Background = styled(Image)`
  @media (max-width: 910px) {
    height: 200px;
    width: 100%;
  }
`;
export const Card1 = styled.div`
  position: absolute;
  transform: translate(-150px, -570px);
  border-radius: 13px;
  background: #1F1D20;
  box-shadow: 0px 0px 25.6px 0px rgba(0, 0, 0, 0.00), 0px 0px 27.648px 0px #000;
  @media (max-width: 910px) {
    transform: translate(-30px, -320px) scale(0.6);
  }
`;

export const Card2 = styled(Card1)`
  transform: translate(600px, -370px);
  @media (max-width: 910px) {
    transform: translate(120px, -200px) scale(0.6);
  }
`;
