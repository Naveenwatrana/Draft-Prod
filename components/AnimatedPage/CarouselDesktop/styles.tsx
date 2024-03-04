import { motion } from 'framer-motion';
import styled from 'styled-components';
type CarouselWrapperProps = {
  inContentView: boolean;
}
export const CarouselContainerDesktop = styled(motion.div)`
  height: 65vh;
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: relative;
  z-index: 1;
  padding: 0 60px 24px;

  @media (min-width: 1024px) {
    height: calc(100vh - 66px);
  }
`;

export const CarouselWrapper = styled(motion.div)<CarouselWrapperProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;

  @media (min-width: 1024px) {
    position: ${({ inContentView }) => !inContentView ? 'fixed' : 'sticky'};
    z-index: 5;
  }

  @media (max-width: 1023px) {
    transform: translateX(0) !important;
  }

  @media (min-width: 1900px) {
  }

  @media (max-height: 820px) {
    width: 322px;
  }
`;
