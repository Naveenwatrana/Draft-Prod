import { IconsContainer } from 'pages/pro/styles';
import styled from 'styled-components';

export const BasicDetailsContainer = styled.div`
  display: flex;
  width: 371px;
  padding: 32px;
  padding-left: 0;
  @media screen and (max-width: 1023px) {
    padding: 0;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  position: relative;
  @media screen and (min-width: 1023px) {
    :hover {
      ${IconsContainer} {
        display: flex;
        display: flex;
        top: 32px;
        right: -1rem;
      }
    }
  }
`;

export const UserCardContainer = styled.div`
    width: 372px !important;
    height: 628px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    align-self: stretch;
    border-radius: 12px;
    border: 1px solid rgb(56, 57, 58);
    background: rgb(30, 32, 32);
    overflow: hidden;
    position: relative;
    :hover {
      background: 
      linear-gradient(rgb(30,32,32) 0 0) padding-box,
      linear-gradient(90deg, #FAA143 0%, #54ABAC 100%) border-box;
      border: 1px solid transparent;
    }
    
`;

export const MainContentWrapper = styled.div`
    margin: 0px 32px 0px 32px;
    display: flex;
    flex-direction: column;
    justify-content:center;
    align-items: center;
    text-align: center;
    gap: 24px;
    line-height: 24px;
    h3 {
      font-size: 20px;
      font-weight: 600;
    }
    p {
      color: #A9ABAB
    }
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

export const AddCardButton = styled.button`
    background: radial-gradient( 75.71% 102.64% at 52.77% 142.1%, #54abac 0%, #5ff088 100% );
    padding: 12px 20.5px;
    white-space: nowrap;
    font-weight: 600;
    border: 0px;
    border-radius: 8px;
    font-size: 14px;
    cursor:pointer;
`;
