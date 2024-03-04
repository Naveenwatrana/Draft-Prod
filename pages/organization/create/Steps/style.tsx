import ButtonComp from 'components/buttonComp';
import { FilledButton } from 'pages/pro/components/ActionSection/style';
import { ClippedUserName } from 'pages/profile/onboarding/create/Navbar/style';
import styled from 'styled-components';

export const OrgDetailsContainer = styled.div`
  flex: 1;
  display: flex;
  padding: 60px 80px 24px 80px;
  max-width: calc(50% - 160px);
  flex-direction: column;
  gap: 24px;
  align-self: stretch;
  overflow-y: auto;
  max-height: calc(100vh - 214px);
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
  
  @media (max-width : 1023px) {
    max-width: 100%;
    padding: 24px;
    max-height: calc(100vh - 246px);
    padding-bottom: 44px;
    padding-bottom: 150px;
  }
`;

export const Header = styled.div`
  display: flex;
  gap: 24px;
  flex-direction: column;
  @media (max-width : 1023px) {
    h2 {
      font-size: ${({ theme }) => theme.typography['20 semibold'].fontSize.value}px;
    }
  }
`;

export const DescriptionText = styled.div`
  color: ${({ theme }) => theme.palette.gray[10].value};
  font-size: ${({ theme }) => theme.typography['14 regular'].fontSize.value}px;
  font-weight: ${({ theme }) => theme.typography['14 regular'].fontWeight};
  line-height: ${({ theme }) => theme.typography['14 regular'].lineHeights.value}px;
`;

export const FormContainer = styled.div`
  gap: 16px;
  display: flex;
  flex-direction: column;
`;

export const InputWithWordCount = styled.div`
  position: relative;
`;

export const OrganizationFoundBlock = styled.div`
  display: flex;
  padding: 24px;
  gap: 24px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.palette.gray[40].value};
  background: ${({ theme }) => theme.palette.gray[60].value};
  width: calc(100% - 48px);
  button {
    margin-top: 12px;
    font-size: ${(props) => props.theme.typography['14 regular'].fontSize.value}px;
    line-height: 20px;
  }
`;

export const OrganizationFoundBlockContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
`;

export const OrganizationFoundTitle = styled.div`
  font-size: ${(props) => props.theme.typography['16 semibold'].fontSize.value}px;
  font-weight: ${(props) => props.theme.typography['16 semibold'].fontWeight};
  line-height: 26px;
  color: ${(props) => props.theme.palette.white['100'].value};
`;

export const OrganizationFoundSubtitle = styled.div`
  font-size: ${(props) => props.theme.typography['14 regular'].fontSize.value}px;
  font-weight: ${(props) => props.theme.typography['14 regular'].fontWeight};
  line-height: 20px;
  color: ${(props) => props.theme.palette.gray['10'].value};
`;

export const OrganizationLogo = styled.img`
  border-radius: 12px;
  width: 60px;
  height: 60px;
`;

export const OrganizationDetailContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items:center;
  padding: 10px 0;
`;

export const CheckboxContainer = styled.div`
  position: relative;
  > div {
    margin-top: -8px;
    height: 35px;
  }
`;

export const CentredDiv = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  @media screen and (max-width: 768px) {
    transform: translate(-50%, 2%);
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

export const SplashScreenContainer = styled.div`
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
export const SplashScreenHeader = styled.div`
  display: flex;
  width: 393px;
  gap: 24px;
  flex-direction: column;
  padding: 20px;
  @media (max-width: 1023px) {
    h2 {
      font-size: ${({ theme }) => theme.typography['20 semibold'].fontSize.value}px;
    }
    @media (max-width: 768px) {
      width: unset;
      max-width: 400px;
    }
  }
`;

export const BtnWrapper = styled.div`
  width: 393px;
  padding: 20px;
  @media (max-width: 768px) {
    border-top: solid 1px ${({ theme }) => theme.palette.gray[40].value};
    position: absolute;
    bottom: 0;
    width: 90%;
    padding-left: 40px;
    padding-right: 40px;
  }
`;
