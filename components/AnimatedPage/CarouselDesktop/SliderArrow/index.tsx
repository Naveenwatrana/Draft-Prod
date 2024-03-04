import { SliderArrowProps } from 'components/AnimatedPage/types';
import React from 'react';
import {
  ArrowIcon,
  SliderArrowInternal,
  SliderArrowExternal,
} from './styles';

const SliderArrow: React.FC<SliderArrowProps> = ({
  direction,
  show,
  onClick,
  type,
}) => {
  return (
    <>
      {type === 'internal' && (
        <SliderArrowInternal
          direction={direction}
          show={show}
          onClick={onClick}
          data-cy={`carouselInternalArrow-${direction}`}
        >
          <ArrowIcon direction={direction} />
        </SliderArrowInternal>
      )}
      {type === 'external' && (
        <SliderArrowExternal
          direction={direction}
          show={show}
          onClick={onClick}
          data-cy={`carouselExternalArrow-${direction}`}
        >
          <ArrowIcon direction={direction} />
        </SliderArrowExternal>
      )}
    </>
  );
};

export default SliderArrow;
