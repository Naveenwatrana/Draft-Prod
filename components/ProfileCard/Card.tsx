import React, { useState } from 'react';
import Slider from 'react-slick';
import { ProfileCardProps } from './types';
import SideArrow from './sideArrow';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { SliderContainer } from './styles';

const Card = ({ slides, getCurrentSlideNumber }: ProfileCardProps) => {
  const [sliderRef, setSliderRef] = useState<Slider | null>(null);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <SideArrow sliderRef={sliderRef} type="left" preventLoop />,
    nextArrow: <SideArrow sliderRef={sliderRef} type="right" preventLoop />,
  };

  return (
    <SliderContainer>
      <Slider {...settings} ref={setSliderRef} beforeChange={(previousSlide, slideNumber) => getCurrentSlideNumber?.(slideNumber)}>
        {/* eslint-disable-next-line react/no-array-index-key */}
        {slides && slides.map((slide, index) => <div key={index}>{slide}</div>)}
      </Slider>
    </SliderContainer>
  );
};

export default Card;
