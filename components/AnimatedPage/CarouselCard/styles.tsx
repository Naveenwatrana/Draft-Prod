import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Slide = styled(motion.div)`
  width: 300px;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #2b2c2d;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-size: 24px;
`;
