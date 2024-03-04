import { ImageContainerHeader, BioWrapper, SlideWrapper } from 'pages/pro/onboarding/common/cardSlides/styles';
import { BioProps } from 'pages/pro/onboarding/common/cardSlides/types';

const Bio = ({ bio, fullName }: BioProps) => (
  <SlideWrapper>
    <ImageContainerHeader component="p">{fullName}</ImageContainerHeader>
    <BioWrapper component="p">{bio}</BioWrapper>
  </SlideWrapper>
);

export default Bio;
