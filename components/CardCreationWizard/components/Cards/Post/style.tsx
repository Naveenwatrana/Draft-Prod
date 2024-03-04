import Image from 'next/image';
import styled from 'styled-components';

export const StyledImage = styled(Image)`
  border-radius:0px 0px 16px 16px;
  overflow: hidden;
  object-fit: cover;
  @media screen and (max-width: 992px) {
    height: calc(100vh - 175px);
    width: 41.6vh;
  }
`;

export const VideoContainer = styled.div`
  video {
    border-radius: 16px;
  }
  height: calc(90vh - 64px);
  width: 47.5vh;
  border-radius: 16px;
  object-fit: cover;
  background-size: cover;
  position: relative;
  @media screen and (max-width: 992px) {
    height: calc(100vh - 175px);
    width: 41.6vh;
    position: unset;
  }
`;

export const CreatableContainer = styled.div`
  border-radius: 16px;
  height: calc(90vh - 64px);
  width: 47.5vh;
  overflow: hidden;
  object-fit: cover;
  background-color: #1E1C1F; // TODO: add color
  @media screen and (max-width: 992px) {
    height: calc(100vh - 175px);
    width: 41.6vh;
    position: relative;
  }
`;
