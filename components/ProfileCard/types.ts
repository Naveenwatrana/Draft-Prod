import { ReactElement } from 'react';
import Slider from 'react-slick';

export type ProfileCardProps = {
  slides: ReactElement[];
  showArrows?: boolean;
  getCurrentSlideNumber?: (currentSlide: number) => void;
};

export type SideArrowProps = {
  sliderRef: Slider | null;
  type: string;
  slideCount?: number;
  currentSlide?: number;
  preventLoop?: boolean;
};

export type CardButtonProps = {
  hidden?: boolean;
};
