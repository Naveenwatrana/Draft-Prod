import { CarouselInfoProps } from '../types';
import { CarousalInfoContainer } from './styles';

const CarouselInfo = ({ children }: CarouselInfoProps) => {
  return <CarousalInfoContainer data-cy="carouselInfoContainer">{children}</CarousalInfoContainer>;
};

export default CarouselInfo;
