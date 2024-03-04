import { CarouselCardProps } from '../types';
import { Slide } from './styles';

const CarouselCard = ({ children }: CarouselCardProps) => {
  return <Slide>{children}</Slide>;
};

export default CarouselCard;
