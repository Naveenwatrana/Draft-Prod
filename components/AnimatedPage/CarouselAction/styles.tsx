import styled from 'styled-components';
import { motion } from 'framer-motion';

export const CarouselActionContainer = styled(motion.div)`
    width: fit-content;
    align-self: center;
    background: black;
    padding: 8px 14px;
    height: 44px;
    border-radius: 12px;
    border: 1px solid #2B2C2D; // TODO: add color to theme
    display: flex;
    gap: 25px;
    align-items: center;
`;
