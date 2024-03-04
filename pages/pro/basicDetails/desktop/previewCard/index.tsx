import DefaultProfile from 'components/Icons/DefaultProfile';
import Image from 'next/image';
import { PreviewCardProps } from 'pages/pro/basicDetails/desktop/previewCard/types';
import { ImageContainer, ImageContainerHeader, Mantra } from './styles';

const PreviewCard = ({
  fullName, picture, mantra,
}: PreviewCardProps) => {
  return (
    <ImageContainer>
      {fullName && (
        <ImageContainerHeader component="p">
          {fullName}
        </ImageContainerHeader>
      )}

      {picture ? <Image data-testid="image" src={picture} alt={picture} width={300} height={500} /> : <DefaultProfile data-testid="image" />}

      {mantra && (
        <Mantra component="p">
          {mantra}
        </Mantra>
      )}
    </ImageContainer>
  );
};

export default PreviewCard;
