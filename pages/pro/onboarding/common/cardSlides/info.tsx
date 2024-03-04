import DefaultProfile from 'components/Icons/DefaultProfile';
import {
  ImageContainerHeader,
  ImagePreview,
  Mantra,
  SlideWrapper,
} from 'pages/pro/onboarding/common/cardSlides/styles';
import { InfoProps } from 'pages/pro/onboarding/common/cardSlides/types';

const Info = ({ image, mantra, fullName }: InfoProps) => {
  return (
    <SlideWrapper>
      <ImageContainerHeader component="p">{fullName}</ImageContainerHeader>
      <Mantra component="p">{mantra}</Mantra>
      {image ? <ImagePreview src={image || ''} alt="user profile image" objectFit="cover" fill />
        : <DefaultProfile />}
    </SlideWrapper>
  );
};

export default Info;
