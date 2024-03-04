import { createSlice } from '@reduxjs/toolkit';
import lang from 'common/lang';
import { RootState } from 'common/store/types';
import { v4 as uuidv4 } from 'uuid';
import { CREATE_CARD_WIZARD_TYPE } from 'common/types';
import { Card, CardTypes } from './types';

const { cards } = lang;
export type CardCreationWizardState = {
    cards: Card[];
    isHaveChanges: boolean;
    selectedCard?: Card;
    removeCardAlert?: null | string;
    previouslySavedCards: Card[];
    deleteCards?: string[];
    wizardType?: CREATE_CARD_WIZARD_TYPE;
  }

const initialCard: Card = {
  id: uuidv4(),
  type: CardTypes.Cover,
  meta: cards.meta.article,
  fieldValues: {},
  isValid: false,
};
const initialState: CardCreationWizardState = {
  cards: [initialCard],
  isHaveChanges: false,
  selectedCard: initialCard,
  removeCardAlert: null,
  previouslySavedCards: [initialCard],
  deleteCards: [],
  wizardType: CREATE_CARD_WIZARD_TYPE.ARTICLE,
};
const CardCreationWizardSlice = createSlice({
  name: 'cardCreationWizard',
  initialState,
  reducers: {
    addCard: (state, { payload: card }) => {
      state.cards.push(card);
      state.isHaveChanges = true;
    },
    updateCardFields: (state, { payload: { id, field, value } }) => {
      const index = state.cards.findIndex((card) => card.id === id);
      state.cards[index].fieldValues = { ...state.cards[index].fieldValues, [field]: value };
      state.isHaveChanges = true;
    },
    updateCardStatus: (state, { payload: { id, status } }) => {
      const index = state.cards.findIndex((c) => c.id === id);
      state.cards[index].isValid = status;
    },
    clearData: (state) => {
      state.cards = state.previouslySavedCards;
      state.isHaveChanges = false;
      state.selectedCard = { ...state.cards[0] };
      state.removeCardAlert = null;
      state.deleteCards = [];
    },
    initiateRemoveCard: (state, { payload: id }) => {
      state.removeCardAlert = id;
    },
    removeCard: (state, { payload: id }) => {
      const index = state.cards.findIndex((card) => card.id === id);
      state.cards.splice(index, 1);
      state.selectedCard = state.cards[index - 1];
      state.removeCardAlert = null;
      if (typeof id !== 'string') {
        state.deleteCards = state.deleteCards ? [...state.deleteCards, id] : [id];
        state.isHaveChanges = true;
      }
    },
    setSelectCard: (state, { payload: card }) => {
      state.selectedCard = card;
    },
    setStateSaved: (state) => {
      state.isHaveChanges = false;
      state.previouslySavedCards = state.cards;
    },
    loadState: (state, { payload: { cards: cardsToLoad, wizardType } }) => {
      state.cards = cardsToLoad.map((card: Card) => ({ ...card, isValid: true }));
      state.deleteCards = [];
      state.wizardType = wizardType || CREATE_CARD_WIZARD_TYPE.ARTICLE;
    },
    resetState: () => initialState,
  },
});

export const {
  addCard, updateCardFields, clearData, removeCard, setSelectCard, initiateRemoveCard, setStateSaved, updateCardStatus, resetState, loadState,
} = CardCreationWizardSlice.actions;

export default CardCreationWizardSlice.reducer;

export const getCards = (state: RootState) => state.cardCreationWizard.cards;
export const getChanges = (state: RootState) => state.cardCreationWizard.isHaveChanges;
export const getCard = (id: string) => (state: RootState) => state.cardCreationWizard.cards?.find((card: Card) => card.id === id);
export const getSelectedCard = (state: RootState) => state.cardCreationWizard.selectedCard;
export const getRemoveCardAlert = (state: RootState) => state.cardCreationWizard.removeCardAlert;
export const getFormValidStatus = (state: RootState) => state.cardCreationWizard.cards?.every((card: Card) => card.isValid);
export const getDeletedCards = (state: RootState) => state.cardCreationWizard.deleteCards;
export const getCreateCardsWizardType = (state: RootState) => state.cardCreationWizard.wizardType;
