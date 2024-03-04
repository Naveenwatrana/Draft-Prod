import ButtonComp from 'components/buttonComp';
import { FilledButton } from 'pages/pro/components/ActionSection/style';
import styled from 'styled-components';
import { ClippedUserName } from '../Navbar/style';
import { BackgroundProps } from './type';

export const OnBoardingDetailsContainer = styled.div`
  justify-content: flex-start;
  display: flex;
  width: 50%;
  padding: 6rem 80px 0px 80px;
  max-width: calc(50% - 160px);
  align-items: center;
  flex-direction: column;
  overflow-y: auto;
  max-height: calc(100vh - 214px);
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
  
  @media (max-width : 991px) {
    width: 100%;
    max-width: 100%;
    max-height: calc(100vh - 246px);
    padding: 0 0 44px 0;
  }
`;

export const Header = styled.div`
  display: flex;
  gap: 24px;
  flex-direction: column;
  padding: 20px;
  @media (max-width : 1023px) {
    h2 {
      font-size: ${({ theme }) => theme.typography['20 semibold'].fontSize.value}px;
    };
    width: unset;
    padding:0;
    height: 100vh;
  }
`;

export const DescriptionText = styled.div`
  color: ${({ theme }) => theme.palette.gray[10].value};
  font-size: ${({ theme }) => theme.typography['16 regular'].fontSize.value}px;
  font-weight: ${({ theme }) => theme.typography['16 regular'].fontWeight};
  line-height: ${({ theme }) => theme.typography['16 regular'].lineHeights.value}px;
`;

export const FormContainer = styled.div`
  gap: 16px;
  display: flex;
  flex-direction: column;
`;

export const InputCompWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 1023px) {
    max-height: calc(100vh - 76px);
    min-width: 600px;
    padding-bottom: 18px;

    ::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  gap: 32px;
  padding: 8px 16px 0;
  @media screen and (min-width: 1023px) {
    //padding-right: 115px; 
  }
`;

export const ResumeDetailsContainer = styled(DetailsContainer)`
  padding-top: 24px;
  @media screen and (max-width: 1023px) {
    margin-left: 0;
  }
`;

export const FiltersContainer = styled.span`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 16px;
  z-index:1;
  flex-wrap: wrap;
  @media screen and (max-width: 1023px) {
    max-width: 372px;
  }
`;
export const CardPairContainer = styled.div`
  display: flex;
  gap: 32px;
  flex-direction: column;
`;

export const ImagesContainer = styled.div`
  display: flex;
  width: 100%;
  width: min-content;
  gap: 32px;
  ${CardPairContainer}:first-child {
    margin-top: 64px;
  }
  ${CardPairContainer}:last-child {
    margin-top: -64px;
  }
`;

export const ImageContainer = styled.div<BackgroundProps>`
  display: flex;
  gap: 40px;
  justify-content: center;
  min-width: 100%;
  overflow-x: hidden;
  gap: 420px;
  height: max-content;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
  @media screen and (max-width: 1023px) {
    display: none;
  }
  opacity: ${({ focused }) => (focused ? 0.8 : 0.15)};
`;

export const CentredDiv = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  @media screen and (max-width: 768px) {
    position: relative;
  }
`;

export const AddCard = styled(CentredDiv)`
  width: 308px;
  height: 564px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 15.6px;
  border: 1.3px solid ${({ theme }) => theme.palette.gray[40].value};
  background: ${({ theme }) => theme.palette.gray[60].value};
  box-shadow: 0px 0px 102px 0px rgba(0, 0, 0, 0.5);
  :hover {
    box-shadow: 0px 0px 102px 0px rgba(0, 0, 0, 0.6);
    background: radial-gradient(
      163.41% 39.14% at 50% -15.73%,
      #303e3e 0%,
      #1e2020 100%
    ); // TODO: Add color
  }
  padding: 32px;
  text-align: center;
  gap: 24px;
  h4 {
    font-weight: 300;
    color: ${({ theme }) => theme.palette.gray[10].value};
    line-height: 26px;
  }
  ${FilledButton} {
    svg:first-child path {
      stroke: inherit;
    }
  }
`;

export const UserName = styled(ClippedUserName)`
  font-size: ${({ theme }) => theme.typography['16 semibold'].fontSize.value}px;
  font-weight: ${({ theme }) => theme.typography['16 semibold'].fontWeight};
  line-height: ${({ theme }) => theme.typography['16 semibold'].lineHeights.value}px;
  color: ${({ theme }) => theme.palette.white[100].value};
  position: absolute;
  left: 16px;
  bottom: 16px;
`;

export const SkipButton = styled(ButtonComp)`
  width: 176px;
`;
