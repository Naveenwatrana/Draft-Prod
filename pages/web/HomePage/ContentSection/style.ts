import Text from 'components/textComp';
import styled from 'styled-components';
import { Container } from '../style';

type FlexBoxProps = {
  justify?: string;
};
export const FlexBox = styled.div<FlexBoxProps>`
  display: flex;
  gap: 6px;
  align-items: center;
  justify-content: ${({ justify }) => justify || 'flex-start'};
`;
export const ConnectBg = styled.div`
  border-radius: 263.98px;
  filter: blur(94.55000305175781px);
  position: absolute;
  width: 233px;
  height: 233px;
  flex-shrink: 0;
  z-index: 0;
  margin-left: -100px;
  opacity: 0.6;
  background: #31306B;
  opacity: 0.35;
  filter: blur(60.400001525878906px);
  margin-top: 100px;
  margin-left: 100px;
  transform: translate(250px, 145px);
`;
export const ConnectSection = styled.div`
  padding: 100px 0;
  display: flex;
  justify-content: center;
  background-color: #080808;
  min-height: 800px;
  ${Container} {
    position: relative;
    min-width: 964px;
  }
`;
export const ConnectSectionText = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  transform: translate(0, 259px);
  @media (max-width: 910px) {
    transform: translate(0, 0px);
    margin-bottom: 40px;
  }
`;
export const ConnectSectionTitle = styled(Text)`
font-size: 40px;
  font-family: ${({ theme }) => theme.homePageFont};
`;
export const ConnectSectionSubTitle = styled(Text)`
  font-size: 16px;
  color: ${({ theme }) => theme.palette.white[100].value};
  width: 250px;
  text-align: center;
  margin-top: 34px;
`;
export const Block = styled.div`
  display: flex;
  width: 108px;
  height: 107px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  position: absolute;
  z-index: 1;
  & img {
  border-radius: 16px;
  }
`;
export const Block1 = styled(Block)`
`;
export const Block2 = styled(Block)`
  font-size: 11px;
  height: 30px;
  padding: 5px 10px;
  color: #50475B;
  border-radius: 32px;
  border: 1px solid #39363B;
  background: #fff;
  width: auto;
  transform: translate(70px, -100px);
`;
export const Block3 = styled(Block)`
  transform: translate(240px, -150px);
`;
export const Block4 = styled(Block)`
  transform: translate(430px, -90px);
  background: #fff;
  border-radius: 32px;
  width: auto;
  height: auto;
  padding: 5px 10px;
`;
export const Block5 = styled(Block)`
`;
export const Block6 = styled(Block4)`
  transform: translate(725px, -70px);
`;
export const Block7 = styled(Block)`
`;
export const Block8 = styled(Block2)`
  transform: translate(810px, 170px);
`;
export const Block9 = styled(Block)`
  transform: translate(760px, 250px);
  border-radius: 13.804px;
  border: 1px solid #282629;
  background: #1E1C1F;
  box-shadow: 0px 0px 22.94px 0px #000;
  flex-direction: column;
  width: 217px;
  gap: 4px;
  align-items: flex-start;
  padding: 14px;
  justify-content: flex-start;
  height: auto;
  & p {
    margin-bottom: 10px;
  }
`;
export const Block10 = styled(Block)`
`;
export const Block11 = styled(Block9)`
  transform: translate(60px, 300px);
  font-size: 10px;
  z-index: 2;
  width: 155px;
  & p {
    margin-bottom: 0px;
  }
`;
export const Block12 = styled(Block)`
  transform: translate(0px, 60px);
  flex-direction: column;
  width: 179px;
  height: auto;
  font-size: 10px;
  & img {
    border-radius: 0;
  }
`;
export const InnerBlock = styled.div`
  background: #1E1C1F;
  margin-top: -2px;
  padding: 14px;
  & img {
    border-radius: 16px;
  }
  & > ${FlexBox} {
    flex-direction: column;
    align-items: flex-start;
  }
`;
export const Bg = styled.div`
  position: absolute;
  z-index: 0;
`;
