import { useNavigate } from 'common/utils/router-fill';
import ButtonComp from 'components/buttonComp';
import Divider from 'components/Divider/Divider';
import { createJob } from 'common/utils/network/appRouts';
import Modal from 'components/Modal/Modal';
import LeverIcon from 'components/Icons/lever-icon.svg';
import lang from 'common/lang';
import { ATSAddJobModalProps } from '../type';
import {
  AddJobModal, Heading, LeverButton, Subtitle,
} from './styles';

const {
  jobs: { addJobModal },
} = lang;

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background: 'transparent',
    border: 'none',
  },
};

const ATSAddJobModal = ({ isOpen, setIsOpen }: ATSAddJobModalProps) => {
  const leverAuthenticate = () => {
    navigate('/lever/auth');
  };
  const navigate = useNavigate();
  return (
    <Modal
      isOpen={isOpen}
      closeModal={() => setIsOpen(false)}
      style={customStyles}
      data-cy="atsAddJobModal"
    >
      <AddJobModal>
        <Heading>{addJobModal.connectWithATS}</Heading>
        <Subtitle>{addJobModal.connectWithATSSubtitle}</Subtitle>
        <Divider />
        <LeverButton data-cy="leverButton" onClick={leverAuthenticate}>
          <LeverIcon height={36} />
        </LeverButton>
        <ButtonComp
          variant="link"
          label={addJobModal.addJobManually}
          onClick={() => navigate(createJob)}
          primary
          data-cy="addJobManually"
        />
      </AddJobModal>
    </Modal>
  );
};

export default ATSAddJobModal;
