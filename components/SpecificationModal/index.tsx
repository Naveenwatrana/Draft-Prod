import ModalElement from 'components/Modal/Modal';
import ButtonComp from 'components/buttonComp';
import lang from 'common/lang';
import {
  Buttons,
  Container, Dd, Divider, Dl, Title, Dt,
} from './styles';
import { SpecificationsModalProps } from './types';

const {
  fileSpecificationModal: {
    title,
    images,
    imagesExtension,
    imagesSize,
    imagesDimension,
    videos,
    videosExtension,
    videosSize,
    videosLength,
    videosEncoding,
    videosDimension,
  },
} = lang;
const { close } = lang.buttonText;

const SpecificationsModal = ({
  isOpen, closeModal,
}: SpecificationsModalProps) => {
  return (
    <ModalElement
      isOpen={isOpen}
      centered
      position={2}
      closeModal={closeModal}
    >
      <Container>
        <Title>{title}</Title>
        <Dl>
          <Dt>{images}</Dt>
          <Dd>{imagesExtension}</Dd>
          <Dd>{imagesSize}</Dd>
          <Dd>{imagesDimension}</Dd>
          <Dt>{videos}</Dt>
          <Dd>{videosExtension}</Dd>
          <Dd>{videosSize}</Dd>

          <Dd>{videosLength}</Dd>
          <Dd>{videosEncoding}</Dd>
          <Dd>{videosDimension}</Dd>
        </Dl>
        <Divider />
        <Buttons>
          <ButtonComp onClick={closeModal} primary variant="link" label={close} />
        </Buttons>
      </Container>
    </ModalElement>
  );
};

export default SpecificationsModal;
