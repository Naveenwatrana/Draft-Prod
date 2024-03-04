import DefaultProfile from 'components/Icons/DefaultProfile';
import Image from 'next/image';
import { ImageSectionProps } from 'pages/pro/onboarding/desktop/previewCard/types';

const ImageSection = ({ image }: ImageSectionProps) => {
  return image ? (
    <Image data-testid="image" src={image} alt={image} height={500} width={300} priority={true} />
  ) : <DefaultProfile />;
};

export default ImageSection;
