import { CarouselActionProps } from '../types';
import { CarouselActionContainer } from './styles';

const CarouselAction = ({ children }: CarouselActionProps) => {
  return (
    <CarouselActionContainer data-cy="carouselActionContainer">
      {children}
    </CarouselActionContainer>
  );
};

export default CarouselAction;
