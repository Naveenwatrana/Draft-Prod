import ChevronLeft from 'components/Icons/LeftChevron';
import styled from 'styled-components';

export const SliderArrowInternal = styled.div<{
  direction: string;
  show: boolean;
}>`
  width: 38px;
  height: 80px;
  padding: 24px 12px;
  background-color: rgba(43, 44, 45, 1);
  color: white;
  display: ${({ show }) => (show ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 5;
  position: absolute;
  ${({ direction }) => direction === 'left' && 'left: -1px; border-radius: 0 8px 8px 0;'}
  ${({ direction }) => direction === 'right' && 'right: -1px; border-radius: 8px 0 0 8px;'}
`;

export const SliderArrowExternal = styled.div<{
  direction: string;
  show?: boolean;
  left?: boolean;
  right?: boolean;
}>`
  width: 38px;
  height: 80px;
  border-radius: 8px;
  padding: 24px 12px;
  background-color: rgba(43, 44, 45, 1);
  color: white;
  display: ${({ show }) => (show ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 4;

  @media (min-width: 768px) and (max-width: 1023px) {
    position: absolute;
    ${({ direction }) => direction === 'left' && 'left: -180px;'}
    ${({ direction }) => direction === 'right' && 'right: -180px;'}
  }

  @media (min-width: 1024px) and (max-width: 1199px) {
    position: fixed;
    ${({ direction }) => direction === 'left' && 'left: 10%;'}
    ${({ direction }) => direction === 'right' && 'right: 10%;'}
  }

  @media (min-width: 1200px) {
    position: fixed;
    ${({ direction }) => direction === 'left' && 'left: 20%;'}
    ${({ direction }) => direction === 'right' && 'right: 20%;'}
  }
`;

export const ArrowIcon = styled(ChevronLeft)<{ direction: string }>`
  transform: ${({ direction }) => direction === 'right' ? 'rotate(180deg)' : 'none'};
`;
