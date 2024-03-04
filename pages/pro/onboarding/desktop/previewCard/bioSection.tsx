import { BioSectionProps } from 'pages/pro/onboarding/desktop/previewCard/types';
import { Mantra } from './styles';

const BioSection = ({ bio }: BioSectionProps) => {
  return bio ? (
    <Mantra component="p" isBio={true}>
      {bio}
    </Mantra>
  ) : null;
};

export default BioSection;
