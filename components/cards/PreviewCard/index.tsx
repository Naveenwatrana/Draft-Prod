import ImageSection from 'components/cards/PreviewCard/ImageSection';

import { ImageContainer } from './styles';
import { PreviewCardProps } from './types';

const PreviewCard = ({
  picture,
  children,
  cypressLocator,
  className,
  height,
}: PreviewCardProps) => {
  return (
    <ImageContainer data-cy={cypressLocator} className={className} height={height}>
      {children}
      <ImageSection image={picture} />
    </ImageContainer>
  );
};

export default PreviewCard;
