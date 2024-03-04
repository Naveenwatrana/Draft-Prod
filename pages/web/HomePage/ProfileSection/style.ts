import styled from 'styled-components';
import Text from 'components/textComp';
import { SkillTag } from 'components/Atoms/SkillTag/styles';
import { CTAButtonMute } from '../style';

export const YouSection = styled.div`
  background-color: ${({ theme }) => theme.palette.gray[80].value};
  padding: 116px 0 0;
  box-shadow: 0px -41px 130px 140px rgba(0, 0, 0 ,1);
  position: relative;
  @media (max-width: 910px) {
    padding-top: 45px;
  }
`;
export const YouSectionText = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  justify-content: space-between;
  width: 886px;
  margin: 0 auto;
  align-items: flex-start;
  @media (max-width: 910px) {
    flex-direction: column;
    justify-content: center;
    text-align: center;
    width: 100%;
  }
`;
export const YouSectionTitle = styled(Text)`
  font-size: 40px;
  width: 457px;
  font-family: ${({ theme }) => theme.homePageFont};
  @media (max-width: 910px) {
    padding: 0 30px;
    text-align: center;
    width: calc(100% - 60px);
    font-size: 34px;
    margin: 0 auto;
  }
`;
export const YouSectionSubTitle = styled(Text)`
  width: 395px;
  font-size: 16px;
  @media (max-width: 910px) {
    padding: 0 40px;
    text-align: center;
    width: auto;
  }
`;
export const YouSectionSubTitleSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  @media (max-width: 910px) {
    align-items: center;
  }
`;
type BlockProps = {
  fullSize?: boolean;
  highlight?: boolean;
  bordered?: boolean;
};
export const Block = styled.div<BlockProps>`
  border-radius: 14px;
  border: 0.9px solid ${({ theme }) => theme.palette.gray[50].value};
  background: ${({ bordered }) => bordered ? 'transparent' : '#1F1D20'};
  box-shadow: ${({ highlight }) => highlight ? '0px 0px 46.8px 0px #000' : 'none'};
  0px 0px 46.8px 0px #000;
  display: flex;
  width: ${({ fullSize }) => fullSize ? '494px' : '217px'};
  height: 140px;
  padding: 14px;
  align-items: flex-start;
  flex-direction: column;
  gap: 9px;
  flex-shrink: 0;
  grid-column: ${({ fullSize }) => fullSize ? '1 / 3' : 'auto'};
  border: ${({ bordered }) => bordered ? '1px dashed #282629' : 'none'};
`;
export const LargeBlock = styled(Block)`
  grid-row:   1 / 4;
  grid-column: 2 / 3;
  height: calc(100% - 48px);
`;

export const ImageBlock = styled(Block)`
  padding: 0;
  width: 245px;
  height: 209px;
  & img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 14px;
  }
`;
export const ImageBlockLarge = styled(ImageBlock)`
  width: 100%;
`;
export const HighlightImageBlock = styled(ImageBlock)`
  transform: rotate(-6.4deg) translate(-100px, -40px);
  height: 284px;
`;
export const UserCardBlock = styled(Block)`
  display: flex;
  width: 189px;
  height: 290px;
  transform: rotate(3.034deg) translate(50px, -30px);
  position: absolute;
  border: 1px solid var(#282629);
  background: #413B4A;
  box-shadow: 0px 0px 46.8px 0px #000;
  flex-direction: column;
  ${CTAButtonMute} {
    margin-top: 34px;
  }
`;

export const BlockContent = styled.div`
  display: flex;
  width: 100%;
  gap: 8px;
  align-items: center;
`;
export const BlockData = styled(BlockContent)`
  flex-direction: column;
  align-items: flex-start;
`;
export const BioBlock = styled(Block)`
  height: 90px;
`;
export const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
`;
export const ProfileSkeleton = styled.div`
  display: grid;
  grid-template-columns: 265px 436px;
  gap: 24px;
  width: 701px;
  margin: 70px auto 0;
  ${SkillTag} {
    font-size: 11.2px;
    padding: 8px;
  }
  @media (max-width: 910px) {
    display: none;
  }
`;
export const GraphicMobile = styled.div`
  display: none;
  width: 100%;
  height: 100%;
  margin-top: 100px;
  @media (max-width: 910px) {
    display: flex;
    justify-content: center;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      max-width: 390px;
    
    }
  }
`;
export const InstagramBlock = styled(Block)`
  display: flex;
  flex-direction: column;
  ${CTAButtonMute} {
    margin-top: 25px;
  }
`;
