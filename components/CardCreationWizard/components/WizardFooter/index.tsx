import ButtonComp from 'components/buttonComp';
import lang from 'common/lang';
import { Container, SaveButton } from './styles';
import { CardCreationWizardFooterProps } from './types';

const { cancel, save } = lang.buttonText;
const CardCreationWizardFooter = ({
  isFormValid, onClose, onCancel, saveButtonText,
}: CardCreationWizardFooterProps) => {
  return (
    <Container>
      <ButtonComp onClick={onCancel} label={cancel} variant="link" />
      <SaveButton onClick={onClose} primary label={saveButtonText || save} size="medium" disabled={isFormValid} />
    </Container>
  );
};

export default CardCreationWizardFooter;
