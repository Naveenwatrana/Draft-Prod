import { IconsContainer } from 'pages/pro/styles';
import styled from 'styled-components';

export const BasicDetailsContainer = styled.div`
  display: flex;
  width: 300px;
  padding-left: 0;
  @media screen and (max-width: 1023px) {
    padding: 0;
    flex-direction: column;
    align-items: center;
  }
  position: relative;
  @media screen and (min-width: 1023px) {
    :hover {
      ${IconsContainer} {
        display: flex;
        display: flex;
      }
    }
  }
`;
