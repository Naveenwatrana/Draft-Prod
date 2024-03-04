import ChevronLeft from 'components/Icons/LeftChevron';
import TextComp from 'components/textComp';
import { IconWrapper as IconWrapperStyled } from 'pages/article/components/ActionSection/styles';
import styled from 'styled-components';

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  margin: 16px 16px 10px;
  gap: 16px;
  position: relative;
  height: 52px;
`;

export const CardStackIconContainer = styled.div<{ hideElement?: boolean }>`
  flex: 2;
`;

export const CardStackIconWrapper = styled.div`
  background: #171718; //TODO: Get color from theme
  border-radius: 8px;
  padding: 8px 10px;
  margin-right: 10px;
  width: min-content;
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const CardStackAction = styled(TextComp)`
  display: none;

  @media (min-width: 1200px) {
    display: block;
  }
`;

export const CardStackActionDetail = styled.div<{ show: boolean }>`
  display: block;

  @media (min-width: 1200px) {
    display: ${({ show }) => (show ? 'block' : 'none')};
  }
`;

export const CardType = styled(TextComp)<{ show: boolean }>`
  border: 1px solid rgba(247, 247, 247, 0.3);
  border-radius: 8px;
  padding: 8px 10px;
  min-width: 50px;
  text-align: center;
  font-size: 0.86em;
  font-weight: 600;
  display: block;

  @media (min-width: 1200px) {
    display: ${({ show }) => (show ? 'block' : 'none')};
  }
`;

export const CardIcon = styled.div<{ show: boolean }>`
  display: flex;
  @media (min-width: 1200px) {
    display: ${({ show }) => (show ? 'flex' : 'none')};
  }
`;

export const CarouselArrow = styled.div<{
  direction: string;
}>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 30px;
  height: 60px;
  background-color: rgba(43, 44, 45, 1); //TODO: Get color from theme
  color: white;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  display: flex;
  margin: 0px 8px;
  ${({ direction }) => direction === 'left' && 'left: 0; border-radius: 0 8px 8px 0;'}
  ${({ direction }) => direction === 'right' && 'right: 0; border-radius: 8px 0 0 8px;'}
  opacity: 0;
  transition: opacity 0.3s ease-in;
`;

export const ArrowIcon = styled(ChevronLeft)<{ direction: string }>`
  transform: ${({ direction }) => direction === 'right' ? 'rotate(180deg)' : 'none'};
`;

export const StyledCarousel = styled.div<{ width?: number; height?: number }>`
  position: relative;
  width: ${({ width }) => (width ? width : '318')}px;
  height: ${({ height }) => (height ? height : '550')}px;
  border: 1px solid rgba(56, 57, 58, 1); //TODO: Get color from theme
  border-radius: 12px;
  overflow: hidden;
  touch-action: pan-y;
  @media (min-width: 768px) {
    width: ${({ width }) => (width ? width : '300')}px;
    height: ${({ height }) => (height ? height : '500')}px;
  }

  &:hover {
    ${CardStackAction} {
      display: none;
    }
    ${CardStackActionDetail} {
      display: block;
    }

    ${CardType} {
      display: block;
    }

    ${CardIcon} {
      display: flex;
    }

    ${CarouselArrow} {
      opacity:1;
    }
  }
`;

export const StyledSlide = styled.div<{
  width?: number;
  height?: number;
  index: number;
  activeIndex: number;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: ${({ width }) => (width ? `${width}px` : '350px')};
  height: ${({ height }) => (height ? `${height}px` : '550px')};
  transition: transform 0.3s ease-in-out;

  @media (min-width: 768px) {
    width: ${({ width }) => (width ? `${width}px` : '300px')};
    height: ${({ height }) => (height ? `${height}px` : '500px')};
  }
`;
export const IconWrapper = styled(IconWrapperStyled)`
  height: auto;
  padding: 8px 7px;  
`;
