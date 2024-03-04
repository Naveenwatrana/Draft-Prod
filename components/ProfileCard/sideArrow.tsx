import { SideArrowProps } from 'components/ProfileCard/types';
import {
  ArrowLeft, ArrowRight, NextButton, PrevButton,
} from './styles';

const SideArrow = ({
  sliderRef,
  type,
  slideCount,
  currentSlide,
  preventLoop,
}: SideArrowProps) => {
  const numSlides = slideCount ? slideCount - 1 : 0;
  const current = currentSlide ? currentSlide : 0;

  const leftClickHandler = () => {
    if (current === 0) {
      return sliderRef?.slickGoTo(numSlides);
    }
    return sliderRef?.slickPrev();
  };

  const rightClickHandler = () => {
    if (numSlides === currentSlide) {
      return sliderRef?.slickGoTo(0);
    }
    return sliderRef?.slickNext();
  };

  return type === 'left' ? (
    <PrevButton hidden={preventLoop && current === 0} onClick={leftClickHandler} aria-label="Previous Slide">
      <ArrowLeft width="80" height="26" />
    </PrevButton>
  ) : (
    <NextButton hidden={preventLoop && numSlides === currentSlide} onClick={rightClickHandler} aria-label="Next Slide">
      <ArrowRight width="80" height="26" />
    </NextButton>
  );
};

export default SideArrow;
