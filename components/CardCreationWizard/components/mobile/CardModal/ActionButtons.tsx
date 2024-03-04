import ButtonComp from 'components/buttonComp';
import lang from 'common/lang';
import { ActionButtonsProps } from './types';
import { ActionButtonContainer, SaveButton } from './styles';

const { cancel } = lang.buttonText;
const { addContent } = lang.cardCreationWizard;
const ActionButtons = ({
  isFormValid, onCancel, nextButton, nextButtonText,
}: ActionButtonsProps) => {
  return (
    <ActionButtonContainer>
      <ButtonComp onClick={onCancel} label={cancel} variant="link" />
      <SaveButton onClick={nextButton} primary label={nextButtonText ? nextButtonText : addContent} size="medium" disabled={!isFormValid} />
    </ActionButtonContainer>
  );
};

export default ActionButtons;
