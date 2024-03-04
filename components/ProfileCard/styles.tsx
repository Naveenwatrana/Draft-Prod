import styled from 'styled-components';
import ChevronLeft from '../Icons/LeftChevron';
import { CardButtonProps } from './types';

export const ImageContainer = styled.div`
  width: 300px;
  height: 500px;
  background-size: cover;
  border-radius: 12px;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      180deg,
      ${(props) => props.theme.palette.gray['100'].value} 10%,
      ${(props) => props.theme.overlay.dimmed.value} 50%,
      ${(props) => props.theme.palette.gray['100'].value} 100%
    );
    border-radius: 12px;
  }
`;

export const ArrowLeft = styled(ChevronLeft)``;

export const ArrowRight = styled(ChevronLeft)`
  transform: rotate(180deg);
`;

export const CardContainer = styled.div`
  position: relative;
  width: 100%;

  .slick-slider {
    height: 500px;
    background-size: cover;
    border-radius: 12px;
    overflow: hidden;

    @media (min-width: 1024px) {
      width: 300px;
    }

    .slick-slide:after {
      content: '';
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        180deg,
        #131315 15%,
        #1212145c 50%,
        #131315 100%
      );
      border-radius: 12px;
    }

    .slick-list {
      height: 100%;
      z-index: 1;
    }

    .slick-dots {
      bottom: 25px;

      li {
        margin: 0;

        .slick-active button:before {
          opacity: 1;
        }

        button:before {
          color: white;
          z-index: 1;
          font-size: 10px;
        }
      }
    }
  }
`;

export const CardButton = styled.button<CardButtonProps>`
  background: none;
  position: absolute;
  top: 0;
  height: 40px;
  position: absolute;
  top: 50%;
  width: 40px;
  z-index: 2;
  border: none;
  border-radius: 12px;

  svg {
    display: none;
    width: 10px;
  }
  
  &:hover {
    cursor: pointer;
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(12px);
    svg {
      width: 10px;
      display: unset;
    }
  }
  border-radius: 50%;
  ${({ hidden }) => hidden && `
    display: none;
  `}
`;

export const PrevButton = styled(CardButton)`
  left: 8px;
`;

export const NextButton = styled(CardButton)`
  right: 8px;
`;

export const SliderContainer = styled.div`
  width: 47.5vh;
  .slick-next:before {
    position: absolute;
    right: 30px;
  }

  .slick-slide:after {
    background: linear-gradient(
      180deg,
      #131315 15%,
      #1212145c 50%,
      #131315 100%
    );
    border-radius: 12px;
  }

  .slick-list {
    height: 100%;
    z-index: 1;
  }
  &:hover {
    ${CardButton} {
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
    li {
      margin: -4px;

      .slick-active button:before {
        opacity: 1;
      }

      button:before {
        color: ${({ theme }) => theme.palette.white[100].value};
      }
    }
  }
  @media (max-width: 992px), (max-height: 900px) and (max-width: 992px){
    width: 41.6vh;
  }
`;
