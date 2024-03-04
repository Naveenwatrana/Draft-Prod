import { PreviewImageProps } from 'pages/pro/basicDetails/mobile/EditImageDetail/previewImage/types';
import Image from 'next/image';
import DefaultProfile from 'components/Icons/DefaultProfile';
import { ImageContainer, ImageContainerHeader, MantraText } from './styles';

const PreviewImage = ({ image, mantra, fullName }: PreviewImageProps) => {
  return (
    <ImageContainer>
      <ImageContainerHeader>
        {fullName}
      </ImageContainerHeader>
      {image
        ? <Image src={image} alt={image} width={400} height={500} />
        : <DefaultProfile />}
      <MantraText>
        {mantra}
      </MantraText>
    </ImageContainer>
  );
};

export default PreviewImage;
