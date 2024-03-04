import styled from 'styled-components';
import bgImgFrame from 'public/images/Component418.png';
import { Card } from 'components/DefaultCard/styles';

export const Container = styled.div`
  background-color: ${({ theme }) => theme.palette.gray['80'].value};
  max-height: 100vh;
  overflow-x: hidden;
  position: relative;
  align-items: center;
  display: flex;
  flex-direction: column;
`;

export const ResumeContainer = styled.div`
  background: ${({ theme }) => theme.palette.gray[80].value};
  display: flex;
  flex-direction: column;
  max-width: 1164px;
  gap: 25px;
  margin: 0 auto;
  width: 100%;
  padding: 50px 0;
  max-width: 669px;
  height: max-content;
  
  @media screen and (max-width: 1023px) {
    max-height: 100%;
    padding-top: 0;
    flex-direction: column;
    ${Card} {
      width: 100%;
    }
  }
  `;

export const CreateOnBoardingBody = styled.div`
  width:100%;
  height:100vh;
  overflow-y: auto;
  background-color: ${({ theme }) => theme.palette.gray['80'].value};
  border-bottom: solid 1px ${({ theme }) => theme.palette.gray[40].value};
  display: flex;
  justify-content: center;
  gap:36px;
  margin: 4rem 0;
  ::-webkit-scrollbar{
    display: none;
  }
`;

export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
`;

export const ProfilesImg = styled.div`
  background-image: url(${bgImgFrame.src});
  //background-size: 100% 90vh;
  background-size: cover;
  width: 100%;
  height: 80vh;
  background-repeat: no-repeat;
  `;

export const Hand = styled.div`
  background-image: url(${bgImgFrame.src});
  background-size: cover;
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
