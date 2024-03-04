import { DividerComp } from 'components/Divider/styles';
import { SteppersContainer } from 'components/Stepper/style';
import styled from 'styled-components';
import { StyledCard } from 'components/cards/PreviewCard/styles';
import { CardContainer } from '../Steps/style';

export const Container = styled.div`
  padding-top: 78px;
  ${SteppersContainer} {
    justify-content: center;
    width: 100%;
  }
  ${DividerComp} {
    background-color: #282629; // TODO: Add Color
    margin: 12px 0;
  }
  @media screen and (max-width: 768px) {
    overflow: auto;
    padding-bottom: 90px;
    background-color: #121112; // TODO: Add Color
  }
  ${CardContainer} ${StyledCard} {
    @media screen and (max-width: 768px) {
      height: 526px;
    }
  }
`;

export const EditButton = styled.div`
  position: absolute;
  z-index: 2;
  top: 8px;
  display: none;
  margin-left: 35vh;

  height: 24px;
  padding: 8px 14px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(16px);
  align-items: center;
  svg path {
    stroke: ${({ theme }) => theme.palette.white[100].value};
  }
`;

export const CardsWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  &:hover {
    ${EditButton} {
      display: flex;
      svg {
        display: unset;
      }
      cursor: pointer;
      border: 1px solid rgba(255, 255, 255, 0.12);
      backdrop-filter: blur(12px);
      svg {
        width: 10px;
        display: unset;
      }
    }
  }
  .slick-dots {
    bottom: -12px;
  }
`;
