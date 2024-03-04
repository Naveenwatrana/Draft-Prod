import { NameSectionProps } from 'pages/pro/onboarding/desktop/previewCard/types';
import { ImageContainerHeader } from './styles';

const NameSection = ({ fullName }: NameSectionProps) => {
  return fullName ? (
    <ImageContainerHeader component="h5">
      {fullName}
    </ImageContainerHeader>
  ) : null;
};

export default NameSection;
