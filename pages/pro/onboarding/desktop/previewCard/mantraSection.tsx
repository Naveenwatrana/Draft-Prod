import { MantraSetionProps } from 'pages/pro/onboarding/desktop/previewCard/types';
import { Mantra } from './styles';

const MantraSection = ({ mantra }: MantraSetionProps) => {
  return mantra ? (
    <Mantra component="p">
      {mantra}
    </Mantra>
  ) : null;
};

export default MantraSection;
