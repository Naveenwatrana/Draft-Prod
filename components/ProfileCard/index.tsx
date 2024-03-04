import { useState } from 'react';
import { ProfileCardProps } from 'components/ProfileCard/types';
import SideArrow from 'components/ProfileCard/sideArrow';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { CardContainer } from './styles';

const Card = ({ slides, showArrows = true }: ProfileCardProps) => {
  const [sliderRef, setSliderRef] = useState<Slider | null>(null);

  const sliderSettings = {
    prevArrow: <SideArrow sliderRef={sliderRef} type="left" />,
    nextArrow: <SideArrow sliderRef={sliderRef} type="right" />,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: false,
    dots: true,
    arrows: showArrows,
    swipeToSlide: true,
    edgeFriction: 0,
  };

  return (
    <CardContainer>
      <Slider ref={setSliderRef} {...sliderSettings}>
        {/* eslint-disable-next-line react/no-array-index-key */}
        {slides && slides.map((slide, index) => <div key={index}>{slide}</div>)}
      </Slider>
    </CardContainer>
  );
};

export default Card;
