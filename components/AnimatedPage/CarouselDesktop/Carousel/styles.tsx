import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Slides = styled(motion.div)`
  position: absolute;
  width: 372px;
  height: 628px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-size: 24px;

  @media (min-width: 1024px) {
    height: 628px;
  }

  @media (min-width: 1900px) {
    height: 650px;
    width: 400px;
  }

  @media (max-height: 820px) {
    height: 528px;
    width: 322px;
  }
`;
