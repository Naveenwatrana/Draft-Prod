import ModalElement from 'components/Modal/Modal';
import ButtonComp from 'components/buttonComp';
import lang from 'common/lang';
import {
  Buttons,
  Container, Description, Divider, Title,
} from './styles';
import { DiscardModalProps } from './types';

const {
  discardModal: {
    discardChanges, description: descriptionText, cancelButton, submitButton,
  },
} = lang;

const DiscardModal = ({
  isOpen, closeModal, cancel, title = discardChanges, description = descriptionText, buttonLabel = submitButton, skipButtonLabel = cancelButton,
}: DiscardModalProps) => {
  return (
    <ModalElement
      isOpen={isOpen}
      centered
      position={2}
      shouldCloseOnOverlayClick
    >
      <Container>
        <Title>{title}</Title>
        <Description>{description}</Description>
        <Divider />
        <Buttons>
          <ButtonComp onClick={cancel} label={skipButtonLabel} variant="link" />
          <ButtonComp onClick={closeModal} error label={buttonLabel} />
        </Buttons>
      </Container>
    </ModalElement>
  );
};

export default DiscardModal;
