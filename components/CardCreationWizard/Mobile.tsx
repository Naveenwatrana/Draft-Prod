import { useState } from 'react';
import lang from 'common/lang';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { useAppSelector } from 'common/hooks/state';
import {
  Card, CardCreationWizardMobileProps, CardSteps, CardType,
} from './types';
import { getCards, addCard } from './slice';
import WorkAreaMobile from './components/mobile/WorkAreaMobile';
import { MobileWizardContainer } from './styles';

const { AddMedia } = lang.cardCreationWizard;

const CardCreationWizardMobile = ({
  cardData, maxCards, title, onClose, saveButtonText, onSave, companyCards, jobCoverCardsData,
}: CardCreationWizardMobileProps) => {
  const cards = useAppSelector(getCards);
  const [selectedCard, setSelectedCard] = useState<Card>(cards[0]);

  const [addCardModal, setAddCardModal] = useState(false);

  const [currentStep, setCurrentStep] = useState(CardSteps.initial);

  const dispatch = useDispatch();

  const createNewCard = (card: CardType) => {
    setAddCardModal(false);
    const allCard = [...cards];
    const newCard = {
      type: card.type, id: uuidv4(), fields: card.fields, meta: card.meta, fieldValues: card.fieldValues,
    };
    allCard.push(newCard);
    setSelectedCard(newCard);
    dispatch(addCard(newCard));
    setCurrentStep(CardSteps.cardFields);
  };

  const closeModal = () => {
    setCurrentStep(CardSteps.initial);
  };

  const onSelectCard = (card: Card) => {
    setCurrentStep(CardSteps.cardFields);
    setSelectedCard(card);
  };

  const onCancel = () => {
    // It should open discard modal if user has made any changes
    onClose();
  };

  return (
    <MobileWizardContainer>
      <WorkAreaMobile
        onAddNewCard={() => setAddCardModal(true)}
        cards={cards}
        onSelectCard={onSelectCard}
        selectedCard={selectedCard}
        isAddCardEnabled={true}
        addCardModal={addCardModal}
        createNewCard={createNewCard}
        cancelAddCard={() => setAddCardModal(false)}
        cardData={cardData}
        currentStep={currentStep}
        closeModal={closeModal}
        addMediaText={AddMedia}
        setCurrentStep={setCurrentStep}
        maxCards={maxCards}
        title={title}
        onClose={onCancel}
        saveButtonText={saveButtonText}
        handleSaveCards={onSave}
        companyCards={companyCards}
        jobCoverCardsData={jobCoverCardsData}
        showOnlyCover={false}
      />
    </MobileWizardContainer>
  );
};

export default CardCreationWizardMobile;
