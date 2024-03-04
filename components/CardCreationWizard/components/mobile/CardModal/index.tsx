import CancelIcon from 'components/Icons/CrossIcon';
import {
  Container, CancelButton, PageTitle, Description,
} from './styles';
import { CardModalProps } from './types';
import ActionButtons from './ActionButtons';

const CardModal = ({
  onClose, title, description, children, cancel, nextButton, nextButtonText,
}: CardModalProps) => {
  return (
    <Container>
      <CancelButton onClick={onClose}><CancelIcon /></CancelButton>
      <PageTitle>{title}</PageTitle>
      <Description>{description}</Description>
      {children}
      <ActionButtons
        onCancel={cancel}
        isFormValid
        onClose={cancel}
        nextButton={nextButton}
        nextButtonText={nextButtonText}
      />
    </Container>
  );
};

export default CardModal;
