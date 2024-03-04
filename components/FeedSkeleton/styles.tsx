import styled, { keyframes } from 'styled-components';

export const FeedContainer = styled.div`
  gap: 24px;
  height: calc(100vh - 200px);
  overflow: hidden;

  @media (min-width: 768px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  @media (min-width: 1024px) {
    height: calc(100vh - 120px);
  }
  @media (min-width: 1200px) {
    margin: 20px 50px;
    padding-top: 10px;
  }
`;

const gradientAnimation = keyframes`
0% {
    background-position: 0 0;
  }
  50% {
    background-position: 0 50%;
  }
  100% {
    background-position: 0 0;
  }
`;

export const BlankCard = styled.div`
  width: 100%;
  height: 514px;
  border-radius: 12px;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.58) 0%, rgba(18, 18, 20, 0.2) 50%, #000000 91.15%);
  background-size: 400% 400%;
  border: 1px solid rgba(56, 57, 58, 1);
  margin-bottom: 16px;
  animation-name: ${gradientAnimation};
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-direction: alternate;

  @media (min-width: 768px) {
    width: 364px;
  }
`;
