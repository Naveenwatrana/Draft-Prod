import { motion } from 'framer-motion';
import styled from 'styled-components';

export const ContentContainer = styled(motion.section)`
color: white;
flex: 5;
display: flex;
justify-content: center;
padding-top: 16px !important;

@media (min-width: 768px) and (max-width: 1023px) {
  padding: 0 60px;
}
* {
  width: 100%;
}


@media (min-width: 1024px) and (max-width: 1199px) {
  min-height: calc(100vh - 120px);
}

@media (min-width: 1200px) {
  padding-top: 16px;
  min-height: calc(100vh - 120px);
}
`;

export const ArticalContainer = styled.div`
  max-width: 612px;
`;
