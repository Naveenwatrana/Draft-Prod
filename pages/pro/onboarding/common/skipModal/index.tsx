import ButtonComp from 'components/buttonComp';
import Divider from 'components/Divider/Divider';
import ModalElement from 'components/Modal/Modal';
import lang from 'common/lang';
import { SkipModalProps } from 'pages/pro/onboarding/common/skipModal/types';
import TextComp from 'components/textComp';
import {
  BtnWrapper, Card, CardContainer, SkipButton, Subtitle,
} from './styles';

const {
  onBoarding: { skipModal },
} = lang;

const SkipModal = ({
  show, handleShow, handleSkip, step,
}: SkipModalProps) => {
  const subtitle = step === 'project'
    ? skipModal.skipModalSubtitleProject
    : skipModal.skipModalSubtitleBio;

  const primaryButton = step === 'project'
    ? skipModal.skipModalCancelProject
    : skipModal.skipModalCancelBio;

  return (
    <ModalElement isOpen={show}>
      <Card>
        <CardContainer>
          <TextComp component="h2">
            {skipModal.skipModalTitle}
          </TextComp>
          <Subtitle component="p">
            {subtitle}
          </Subtitle>
          <Divider />
          <BtnWrapper>
            <ButtonComp
              primary
              fullWidth
              onClick={() => handleShow(false)}
              label={primaryButton}
              data-cy="skip-modal-cancel"
            />
            <SkipButton
              fullWidth
              label={skipModal.skipModalSkip}
              onClick={handleSkip}
              data-cy="skip-modal-skip"
            />
          </BtnWrapper>
        </CardContainer>
      </Card>
    </ModalElement>
  );
};

export default SkipModal;
