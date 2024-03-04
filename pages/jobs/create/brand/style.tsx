import ButtonComp from 'components/buttonComp';
import TextComp from 'components/textComp';
import { FilledButton } from 'pages/pro/components/ActionSection/style';
import styled from 'styled-components';
import { AddCardProps, BackgroundProps } from './type';

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

export const CentredDiv = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  @media screen and (max-width: 768px) {
    position: relative;
    top: 32px;
    transform: unset;
    left: 0;
    height: calc(100vh - 200px);
    overflow-y: auto;
  }
`;

export const AddCardsContainer = styled.div<AddCardProps>`
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
  ${({ centered }) => centered
    && `
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  @media screen and (max-width: 768px) {
    position: relative;
    top: 32px;
    transform: unset;
    left: 0;
    height: calc(100vh - 200px);
    overflow-y: auto;
  }
  `}
`;

export const AddCard = styled(AddCardsContainer)<AddCardProps>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  width: ${({ width }) => `${width - 32}px`};
  height: ${({ height }) => `${height - 32}px`};
  border-radius: 15.6px;
  border: 1.3px solid ${({ theme }) => theme.palette.gray[40].value};
  background: ${({ theme }) => theme.palette.gray[60].value};
  background: radial-gradient(
    163.41% 39.14% at 50% -15.73%,
    rgba(208, 126, 49, 0.25) 0%,
    #1e2020 100%
  ); // TODO: Add color
  padding: 16px;
  text-align: center;
  gap: 32px;
  h4 {
    font-weight: 300;
    color: ${({ theme }) => theme.palette.gray[10].value};
    line-height: 26px;
  }
  ${FilledButton} {
    svg:first-child path {
      stroke: inherit;
    }
    padding: 16px 24px;
    background: radial-gradient(
      75.71% 102.64% at 52.77% 142.1%,
      #54abac 0%,
      #5ff088 100%
    );
  }
  h2,
  h3 {
    font-weight: 300;
    text-align: start;
  }
  > img:first-child {
    border-radius: 8px;
  }
  @media screen and (max-width: 768px) {
    height: 450px;
  }
`;

export const ShadowedCardsContainer = styled.span`
  ${AddCard} {
    box-shadow: 0px 0px 102px 0px rgba(0, 0, 0, 0.5);
    :hover {
    box-shadow: 0px 0px 102px 0px rgba(0, 0, 0, 0.6);
    background: radial-gradient(
          163.41% 39.14% at 50% -15.73%,
          #5b3d1f 0%,
          #1e2020 100%
        )
        padding-box,
      linear-gradient(
          90deg,
          rgba(250, 161, 67, 0.5) 0%,
          rgba(84, 171, 172, 0.5) 115.39%
        )
        border-box;
    border: 1px solid transparent;
  }
  }
`;

export const SalaryContainer = styled.div`
  gap: 5.2px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

export const SalaryText = styled(TextComp)`
  font-size: 20.8px;
  line-height: 33.8px;
`;

export const WorkStyleText = styled.div`
  font-size: ${({ theme }) => theme.typography['20 regular'].fontSize.value}px;
  font-weight: ${({ theme }) => theme.typography['20 regular'].fontWeight};
  line-height: 26px;
  text-align: start;
  white-space: nowrap;
`;

export const LocationText = styled(WorkStyleText)`
  color: ${({ theme }) => theme.palette.gray[10].value};
  overflow-x: auto;
  z-index: 0;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const EmploymentTypeText = styled(LocationText)`
  color: ${({ theme }) => theme.palette.white[100].value};
  width: 100%;
  overflow-x: auto;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const LocationContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 7.8px;
  width: 100%;
`;

export const Buttons = styled.div`
   display: flex;
  position: fixed;
  bottom: -4px;
  right: 0;
  width: 100%;
  z-index: 2;
  background-color: ${({ theme }) => theme.palette.gray['80'].value};
  @media screen and (max-width: 768px) {
    background-color: ${({ theme }) => theme.palette.gray['80'].value};
    width: calc(100% - 32px);
    right: 0;
    button {
      width: 50%;
    }
    gap: 24px;
  }
  border-top: solid 1px ${({ theme }) => theme.palette.gray[40].value};
  flex-direction: column-reverse;
  padding: 16px;
  margin-top: 10px;
  gap: 16px;
  flex-direction: row;
  justify-content: end;
  button:last-child {
    padding: 12px 16px;
    width: 169px;
    :disabled {
      background: rgba(104, 225, 116, 0.15); // TODO: Add color
      color: ${({ theme }) => theme.palette.gray[80].value};
    }
  }
  button:first-child {
    @media screen and (max-width: 768px) {
      width: 50%;
    }
  }
`;
export const SkipButton = styled(ButtonComp)`
  width: 63px;
`;
