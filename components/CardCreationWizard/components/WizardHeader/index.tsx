import CancelIcon from 'components/Icons/CrossIcon';
import { theme } from 'common/theme';
import { CancelButton, Container } from './styles';
import { WizardHeaderProps } from './types';

const CardCreationWizardHeader = ({ title, onClose }: WizardHeaderProps) => {
  return (
    <Container>
      {title}
      {' '}
      {onClose && (
        <CancelButton type="button" onClick={onClose} data-testid="wizardHeaderCloseButton" data-cy="wizardHeaderCloseButton">
          <CancelIcon color={theme.palette.gray[30].value} />
        </CancelButton>
      )}
    </Container>
  );
};

export default CardCreationWizardHeader;
