import { IconsContainer } from 'pages/pro/styles';
import styled from 'styled-components';

export const BasicDetailsContainer = styled.div`
  display: flex;
  padding-left: 0;
  top: 24px;

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
        right: -1rem;
      }
    }
  }
`;

export const UserCardContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-self: stretch;
    border-radius: 12px;
    border: 1px solid rgb(56, 57, 58);
    background: rgb(30, 32, 32);
    overflow: hidden;
    position: relative;
  }
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
