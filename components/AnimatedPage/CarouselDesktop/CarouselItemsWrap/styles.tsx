import { motion } from 'framer-motion';
import styled from 'styled-components';

export const CarouselItemsWrapper = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 500px;
  padding: 24px 0;

  @media (min-width: 1024px) {
    height: 628px;
  }

  @media (min-width: 1900px) {
    height: 650px;
  }

  @media (max-height: 820px) {
    height: 500px;
    width: 322px;
  }
`;
