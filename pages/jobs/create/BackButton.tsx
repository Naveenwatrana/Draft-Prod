import ChevronLeft from 'components/Icons/LeftChevron';
import lang from 'common/lang';
import { BackButton as BackButtonElement, BackButtonText } from 'pages/jobs/create/styles';
import { BackButtonProps } from 'pages/jobs/create/types';

const { buttonText } = lang;

const BackButton = ({ onClick }: BackButtonProps) => (
  <BackButtonElement onClick={onClick} data-cy="backButtonJobCreate">
    <ChevronLeft />
    <BackButtonText>{buttonText.back}</BackButtonText>
  </BackButtonElement>
);

export default BackButton;
