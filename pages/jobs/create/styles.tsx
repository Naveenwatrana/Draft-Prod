import styled from 'styled-components';
import { ContainerProps, RightPanelProps } from './types';

export const InputField = styled.div`
    margin-top: 24px;
`;
export const WordCounterWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
`;
export const ButtonWrapper = styled.div`
    display: flex;
    margin-top: 60px;
    margin-bottom: 20px;
    @media screen and (max-width: 1024px) {
        justify-content: center;
        flex-direction: column;
        gap: 28px;
    }
`;
export const ButtonWrapperPreview = styled(ButtonWrapper)`
    gap: 28px;
    width: 300px;
    margin-top: 24px;
`;
export const BackButton = styled.button`
    display: flex;
    align-items: center;
    margin-top: 60px;
    margin-bottom: 24px;
    background: none;
    border: none;
    cursor: pointer;
`;
export const BackButtonText = styled.div`
    margin-left: 10px;
    color: ${({ theme }) => theme.palette.gray['30'].value};
    font-size: ${({ theme }) => theme.typography['12 regular'].value}px;
    text-transform: lowercase;
    &:hover {
        color: ${({ theme }) => theme.palette.gray['10'].value};
    }
`;
export const LeftPanel = styled.div`
    background-color: ${({ theme }) => theme.palette.gray['80'].value};
    padding: 0 200px;
    display: flex;
    flex-direction: column;
    margin: 60px 0;

    @media screen and (max-width: 1024px) {
        width: 80%;
        margin: 0 auto;
        padding: 20px 0 0;
    }
`;
export const Container = styled.div<ContainerProps>`
    display: grid;
    grid-template-columns: ${({ isDesktopView }) => isDesktopView ? '1fr 1fr' : '1fr'};
    background-color: ${({ theme }) => theme.palette.gray['80'].value};
    min-height: 100vh;

    @media screen and (max-width: 1024px) {
        grid-template-columns: 1fr;
    }
`;

export const RightPanel = styled.div<RightPanelProps>`
    background-color: ${({ theme: { palette: { gray } }, isDesktopView }) => isDesktopView ? gray['60'].value : gray['80'].value};
    display: flex;
    align-items: center;
    flex-direction: column;
    position: relative;
`;
export const CardContainer = styled.div`
    display: flex;  
    align-items: center;
    height: 100vh;
    position: fixed;
    @media screen and (max-width: 1024px) {
        flex-direction: column;
        justify-content: center;
        position: inherit;
        height: auto;
    }
`;
export const Disclaimer = styled.p`
    background-color: ${({ theme }) => theme.palette.violet['80'].value};
    font-family: ${({ theme }) => theme.defaultFont};
    font-size: ${({ theme }) => theme.typography['12 regular'].fontSize.value}px;
    font-weight: ${({ theme }) => theme.typography['12 regular'].fontWeight};
    color: ${({ theme }) => theme.palette.white['100'].value};
    padding: 10px;
    text-align: center;
    margin: 4px 0;
    border-radius: 8px;
`;

export const MobileContainer = styled.div`
  background-color: ${({ theme }) => theme.palette.gray['80'].value};
  height: max-content;
  min-height: calc(100vh - 70px);
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const MobileCreateJobBody = styled.div`
  background-color: ${({ theme }) => theme.palette.gray['80'].value};
  border-bottom: 1px solid ${({ theme }) => theme.palette.gray['50'].value};
  margin: 0;
  flex: 1;
`;

export const MobileCreateJobPageText = styled.span`
  font-size: ${({ theme }) => theme.typography['16 semibold'].fontSize.value}px;
  font-weight: ${({ theme }) => theme.typography['16 semibold'].fontWeight};
  color: ${({ theme }) => theme.palette.white['100'].value};
  display: flex;
  align-items: center;
  gap: 13px;
  svg path {
    stroke: ${({ theme }) => theme.palette.gray['20'].value};
    cursor: pointer;
    stroke-width: 1.5;
  }
  svg {
    cursor: pointer;
  }
  display: flex;
  align-items: center;
  line-height: 28px;
  padding: 16px;
  border-bottom: solid 1px ${({ theme }) => theme.palette.gray[40].value};
  `;

export const MobileStepsContainer = styled.div`
  padding: 16px;
  width: calc(100% - 32px);
  overflow-x: scroll;
  min-height: calc(100vh - 160px);
  border-bottom: solid 1px ${({ theme }) => theme.palette.gray[40].value};
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;
