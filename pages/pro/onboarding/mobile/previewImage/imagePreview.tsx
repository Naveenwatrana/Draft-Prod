import { ImagePreviewProps } from 'pages/pro/onboarding/mobile/previewImage/types';
import {
  ImageContainer, ImageContainerHeader, ImageView, Mantra,
} from '../styles';

const ImagePreview = ({ image, mantra, fullName }: ImagePreviewProps) => {
  return (
    <ImageContainer>
      <ImageContainerHeader component="p">
        {fullName && fullName}
      </ImageContainerHeader>
      {image && <ImageView src={image} fill alt="user profile image" />}
      <Mantra component="p">
        {mantra && mantra}
      </Mantra>
    </ImageContainer>
  );
};

export default ImagePreview;
