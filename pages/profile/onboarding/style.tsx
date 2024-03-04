import styled from 'styled-components';
import bgImgFrame from 'public/images/bgImgFrame.png';

export const Container = styled.div`
  background-color: ${({ theme }) => theme.palette.gray['80'].value};
  display: flex;
  flex-direction: column;
  max-height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  align-items: center;
  height: 100vh;
`;

export const BackToPage = styled.span`
padding: 13px 13px 13px 45px;
  width:100%;
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
  border-bottom: solid 1px ${({ theme }) => theme.palette.gray[40].value};

  @media (max-width : 768px) {
    width:100%;
 }
  `;

export const OnBoardingBody = styled.div`
        display: flex;
        width:100%;
        align-items: center;
    @media (max-width : 768px) {
    width:90%;
    padding:15px;
    height: 100vh;
    flex-direction: column;
}
`;

export const OnBoardingWelcomeContainer = styled.div`
  justify-content: center;
  display: flex;
  width: 50%;
  align-items: center;
  flex-direction: column;
  overflow-y: auto;
  max-height: calc(100vh - 214px);
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
  
  @media (max-width : 1023px) {
    width: 100%;
    max-width: 100%;
    max-height: calc(100vh - 246px);
    padding-bottom: 44px;
  }
  @media (max-width : 768px) {
   height: 100vh;
 }
`;

export const Header = styled.div`
  display: flex;
  width: 60%;
  gap: 24px;
  flex-direction: column;
  padding:20px;
  @media (max-width : 1023px) {
    h2 {
      font-size: ${({ theme }) => theme.typography['20 semibold'].fontSize.value}px;
    }
    @media (max-width : 768px) {
       width:100%;
       max-width:400px;
    }
  }
`;

export const DescriptionText = styled.div`
  color: ${({ theme }) => theme.palette.gray[10].value};
  font-size: ${({ theme }) => theme.typography['16 regular'].fontSize.value}px;
  font-weight: ${({ theme }) => theme.typography['14 regular'].fontWeight};
  line-height: ${({ theme }) => theme.typography['14 regular'].lineHeights.value}px;
`;

export const BtnWrapper = styled.div`
width: 60%;
padding:20px;
@media (max-width : 768px) {
    border-top: solid 1px ${({ theme }) => theme.palette.gray[40].value};
    position: absolute;
    bottom: 0;
    width: 90%;
    padding-left: 40px;
    padding-right: 40px;
    }
 `;

export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 50%;
  @media (max-width : 768px) {
    display: none;
}
`;

export const Frame = styled.div`
  background-image: url(${bgImgFrame.src});
  background-size: cover;
  width: 80%;
  height: 100vh;
`;

export const Buttons = styled.div`
  display: flex;
  position: fixed;
  bottom: -4px;
  right: 8px;
  @media screen and (max-width: 768px) {
    background-color: ${({ theme }) => theme.palette.gray['80'].value};
    width: calc(100% - 32px);
    right: 0;
    button {
      width: 50%;
    }
    gap: 24px;
    border-top: solid 1px ${({ theme }) => theme.palette.gray[40].value};
  }
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
      width: auto;
    }
  }
`;
