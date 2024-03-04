import Image from 'next/image';
import { ProfileDefaultImage } from './styles';
import { ImageSectionProps } from './types';

const ImageSection = ({ image }: ImageSectionProps) => {
  return image ? (
    <Image src={image} alt={image} height={500} width={300} priority={true} />
  ) : <ProfileDefaultImage />;
};

export default ImageSection;
