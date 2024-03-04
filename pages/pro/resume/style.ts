import styled from 'styled-components';
import { DividerComp } from 'components/Divider/styles';
import { DetailsContainer } from '../styles';

export const FiltersContainer = styled.div`
  min-width: 372px;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  max-height: 100vh;
  overflow-y: auto;
  h6 {
    color: rgba(255, 255, 255, 0.5);
    text-transform: uppercase;
    margin-bottom: 8px;
    margin-top: 2px;
  }
  h3 {
    margin: 24px 0;
  }
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
  > div:last-child > ${DividerComp} {
    display: none;
  }
`;

export const ResumeDetailsContainer = styled(DetailsContainer)`
  padding-top: 24px;
  margin-top: 90px;
  @media screen and (max-width: 1023px) {
    margin-left: 0;
    margin-top: 0;
  }
`;
