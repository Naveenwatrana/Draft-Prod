import { IconsContainer } from 'pages/pro/styles';
import styled from 'styled-components';

export const BasicDetailsContainer = styled.div`
  width: 100%;
  background-color: #282629;
  box-shadow: 0px 0px 36.930233001708984px 0px #00000000;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 0px 24px;
`;

export const UserCardContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-self: stretch;
    border-radius: 12px;
    overflow: hidden;
    position: relative;
  `;

export const RightSection = styled.div`
  gap: 24px;
  display: flex;
  flex-direction: column;
  h3 {
    font-size: 20px;
    font-weight: 600;
  }
  p {
    color: #A9ABAB
  }
`;

export const MainContentWrapper = styled.div`
    align-items: center;
    display: flex;
    flex-direction: row;
    gap: 24px;
    line-height: 24px;
    padding:32px;
`;

export const ShadowIconWrapper = styled.div`
    position: absolute;
`;

export const UserNameContainer = styled.div`
    bottom: 16px;
    font-weight:600;
    padding-left:16px;
    position: absolute;
`;

export const AddCardButton = styled.div`
    font-weight: 600;
    font-size: 16px;
    color: ${(props) => props.theme.palette.green['80'].value};
    cursor:pointer;
    z-index:1;
`;
