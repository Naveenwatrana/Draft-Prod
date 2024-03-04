import Modal from 'components/Modal/Modal';
import { CardCreationWizardContainerMobile, CardNavigatorWrapper, FormWrapper } from 'components/CardCreationWizard/styles';
import lang from 'common/lang';
import { CardSteps, CardTypes } from 'components/CardCreationWizard/types';
import { useAppDispatch, useAppSelector } from 'common/hooks/state';
import DiscardModal from 'components/DiscardModal';
import {
  getChanges, getFormValidStatus, getRemoveCardAlert, initiateRemoveCard, removeCard,
} from 'components/CardCreationWizard/slice';
import ChevronLeft from 'components/Icons/LeftChevron';
import CardNavigator from '../../CardNavigator';
import { WorkAreaMobileProps } from './types';
import AddNewCardWorkAreaMobile from '../AddNewCardWorkAreaMobile';
import PreviewCoverCard from '../PreviewCard';
import CardModal from '../CardModal';
import CoverCardFields from '../../CardFields/CoverCardFields/CoverCardFields';
import AboutCardFields from '../../CardFields/AboutCardFields/AboutCardFields';
import LinkCardFields from '../../CardFields/LinkCardFields';
import CardCreationWizardHeader from '../../WizardHeader';
import { Title } from './styles';
import CardCreationWizardFooter from '../../WizardFooter';

const { deleteModal, cardCreationWizard } = lang;
const { addContent } = cardCreationWizard;
const { previewStep } = lang.cardCreationWizard;

const WorkAreaMobile = ({
  onAddNewCard,
  cards,
  onSelectCard,
  selectedCard,
  isAddCardEnabled,
  addCardModal,
  createNewCard,
  cardData,
  currentStep,
  closeModal,
  setCurrentStep,
  cancelAddCard,
  maxCards,
  title,
  onClose,
  saveButtonText,
  handleSaveCards,
  companyCards,
  jobCoverCardsData,
  showOnlyCover = true,
}: WorkAreaMobileProps) => {
  const deleteCardALert = useAppSelector(getRemoveCardAlert);
  const dispatch = useAppDispatch();
  const isHaveChanges = useAppSelector(getChanges);
  const formValidStatus = useAppSelector(getFormValidStatus);

  const deleteCardHandler = () => {
    dispatch(removeCard(selectedCard.id));
    setCurrentStep(CardSteps.initial);
    onAddNewCard();
  };
  const closeDeleteCardModal = () => {
    dispatch(initiateRemoveCard(null));
  };
  return (
    <CardCreationWizardContainerMobile>
      <CardCreationWizardHeader
        title={(
          <Title>
            <ChevronLeft onClick={onClose} />
            {title}
          </Title>
        )}
      />
      <CardNavigatorWrapper>
        <CardNavigator
          onAddNewCard={onAddNewCard}
          cards={cards}
          selectCard={onSelectCard}
          isAddCardEnabled={isAddCardEnabled}
          selectedCard={selectedCard}
          maxCards={maxCards}
          jobCoverCardsData={jobCoverCardsData}
          showOnlyCover={showOnlyCover}
        />
        <DiscardModal
          isOpen={deleteCardALert}
          closeModal={deleteCardHandler}
          cancel={closeDeleteCardModal}
          title={deleteModal.title}
          description={deleteModal.description}
          buttonLabel={deleteModal.submitButton}
          skipButtonLabel={deleteModal.cancelButton}
        />

      </CardNavigatorWrapper>
      <Modal isOpen={addCardModal}>
        <AddNewCardWorkAreaMobile
          addNewCard={createNewCard}
          cardData={cardData}
          onCancel={cancelAddCard}
        />
      </Modal>

      {currentStep === CardSteps.cardFields && (
        <Modal isOpen={true}>
          <CardModal
            title={`${selectedCard?.type} ${lang.cards.card}`}
            description={addContent}
            nextButtonText="Card Preview"
            nextButton={() => setCurrentStep(CardSteps.cardPreviewComplete)}
            onClose={closeModal}
            cancel={() => setCurrentStep(CardSteps.initial)}
          >
            <FormWrapper>
              {selectedCard.type === CardTypes.Cover && <CoverCardFields selectedCard={selectedCard} withLogo={companyCards} jobCoverCardsData={jobCoverCardsData} />}
              {selectedCard.type === CardTypes.About && <AboutCardFields selectedCard={selectedCard} />}
              {selectedCard.type === CardTypes.Link && <LinkCardFields selectedCard={selectedCard} />}
            </FormWrapper>
          </CardModal>
        </Modal>
      )}
      {currentStep === CardSteps.cardPreviewComplete && (
        <Modal isOpen={true}>
          <PreviewCoverCard
            title={previewStep.title}
            active
            data={selectedCard}
            onClick={closeModal}
            nextButton={() => setCurrentStep(CardSteps.initial)}
            onClose={closeModal}
            onCancel={() => setCurrentStep(CardSteps.cardFields)}
            description={previewStep.subtitle}
            nextButtonText={lang.cards.saveCard}
          />
        </Modal>
      )}
      <CardCreationWizardFooter onClose={handleSaveCards} onCancel={onClose} isFormValid={!formValidStatus || !isHaveChanges} saveButtonText={saveButtonText} />
    </CardCreationWizardContainerMobile>
  );
};

export default WorkAreaMobile;
