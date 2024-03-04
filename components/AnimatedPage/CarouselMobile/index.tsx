import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CarouselSlide from '../CarouselCard';
import { HR } from '../styles';
import { CarouselMobileProps } from '../types';

const sliderSettings = {
  slidesToShow: 1,
  slidesToScroll: 1,
  infinite: false,
  dots: false,
  arrows: false,
  swipeToSlide: true,
  edgeFriction: 0,
};

const CarouselMobile = ({ cards, info, actions }: CarouselMobileProps) => {
  return (
    <>
      {cards.length === 1 ? <CarouselSlide>{cards[0]}</CarouselSlide>
        : (
          <Slider {...sliderSettings}>
            {cards
           && cards.map((slide, index) => (
             /* eslint-disable-next-line react/no-array-index-key */
             <CarouselSlide key={index}>{slide}</CarouselSlide>
           ))}
          </Slider>
        )}
      {actions}
      <HR />
    </>
  );
};

export default CarouselMobile;
