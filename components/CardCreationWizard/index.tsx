import Modal from 'components/Modal/Modal';
import { useEffect, useState } from 'react';
import DiscardModal from 'components/DiscardModal';
import { v4 as uuidv4 } from 'uuid';
import lang from 'common/lang';
import { useAppDispatch, useAppSelector } from 'common/hooks/state';
import { CardSizes } from 'components/DefaultCard/types';
import TextComp from 'components/textComp';
import CardNavigator from './components/CardNavigator';
import CardWorkArea from './components/CardWorkArea';
import CardCreationWizardFooter from './components/WizardFooter';
import CardCreationWizardHeader from './components/WizardHeader';
import {
  CardCreationWizardContainer, CardCreationWizardContentArea,
} from './styles';
import {
  Card, CardCreationState, CardCreationWizardProps, CardType,
} from './types';
import AddNewCardWorkArea from './components/AddNewCardWorkArea';
import {
  addCard, clearData, getCards, getChanges, getRemoveCardAlert, getSelectedCard,
  initiateRemoveCard, removeCard, setSelectCard, setStateSaved, getFormValidStatus,
} from './slice';

const { deleteModal } = lang;

const CardCreationWizard = ({
  title, cardData, isOpen, setIsOpen, addCardStep, onClose, maxCards, onSave, companyCards, jobCoverCardsData, showOnlyCover = true,
}: CardCreationWizardProps) => {
  const cards = useAppSelector(getCards);
  const dispatch = useAppDispatch();
  const [cardCreationState, setCardCreationState] = useState(addCardStep ? CardCreationState.AddNewCard : CardCreationState.previewCard);
  const [discardChanges, setDiscardChanges] = useState(false);
  const isHaveChanges = useAppSelector(getChanges);
  const selectedCard = useAppSelector(getSelectedCard);
  const deleteCardALert = useAppSelector(getRemoveCardAlert);
  const formValidStatus = useAppSelector(getFormValidStatus);

  const setSelectedCard = (card: Card) => {
    dispatch(setSelectCard(card));
  };

  const addNewCard = () => {
    setCardCreationState(CardCreationState.AddNewCard);
  };
  useEffect(() => {
    setCardCreationState(addCardStep ? CardCreationState.AddNewCard : CardCreationState.previewCard);
  }, [addCardStep]);

  const createNewCard = (card: CardType) => {
    const allCard = [...cards];
    const newCard: Card = {
      type: card.type, id: uuidv4(), fields: card.fields, meta: card.meta, fieldValues: card.fieldValues,
    };
    allCard.push(newCard);
    setCardCreationState(CardCreationState.previewCard);
    setSelectedCard(newCard);
    dispatch(addCard(newCard));
  };
  const selectCard = (card: Card) => {
    setCardCreationState(CardCreationState.previewCard);
    setSelectedCard(card);
  };
  const closeDiscardModal = () => {
    dispatch(clearData());
    setDiscardChanges(false);
    setIsOpen(false);
    onClose();
  };
  const cancelChanges = () => {
    if (isHaveChanges) {
      setDiscardChanges(true);
    } else {
      setIsOpen(false);
      onClose();
    }
  };
  const closeDeleteCardModal = () => {
    dispatch(initiateRemoveCard(null));
  };
  const deleteCardHandler = () => {
    dispatch(removeCard(selectedCard.id));
    setCardCreationState(CardCreationState.AddNewCard);
  };
  const saveContent = () => {
    setIsOpen(false);
    dispatch(setStateSaved());
    onClose();
    if (onSave) {
      onSave();
    }
  };
  return (
    <>
      <DiscardModal isOpen={discardChanges} closeModal={closeDiscardModal} cancel={() => setDiscardChanges(false)} />
      <DiscardModal
        isOpen={deleteCardALert}
        closeModal={deleteCardHandler}
        cancel={closeDeleteCardModal}
        title={deleteModal.title}
        description={deleteModal.description}
        buttonLabel={deleteModal.submitButton}
        skipButtonLabel={deleteModal.cancelButton}
      />
      <Modal isOpen={isOpen} centered>
        <CardCreationWizardContainer>
          <CardCreationWizardHeader
            title={<TextComp>{title}</TextComp>}
            onClose={cancelChanges}
          />
          <CardCreationWizardContentArea>
            <CardNavigator
              maxCards={maxCards}
              size={CardSizes.SMALL}
              onAddNewCard={addNewCard}
              cards={cards}
              selectCard={selectCard}
              isAddCardEnabled={formValidStatus}
              showOnlyCover={showOnlyCover}
              selectedCard={selectedCard}
            />
            {cardCreationState === CardCreationState.previewCard && <CardWorkArea selectedCard={selectedCard} companyCards={companyCards} jobCoverCardsData={jobCoverCardsData} />}
            {cardCreationState === CardCreationState.AddNewCard && <AddNewCardWorkArea addNewCard={createNewCard} cardData={cardData} />}
          </CardCreationWizardContentArea>
          <CardCreationWizardFooter
            onClose={saveContent}
            isFormValid={!formValidStatus || !isHaveChanges}
            onCancel={cancelChanges}
          />
        </CardCreationWizardContainer>
      </Modal>
    </>
  );
};

export default CardCreationWizard;
