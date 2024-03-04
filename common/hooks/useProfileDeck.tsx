import { useCallback } from 'react';
import { Card, CardTypes } from 'components/CardCreationWizard/types';
import { v4 as uuidv4 } from 'uuid';
import {
  getCards, getDeletedCards, loadState, setSelectCard,
} from 'components/CardCreationWizard/slice';
import { ApiCard } from 'pages/article/create/types';
import { getCardData, uploadMediaFilesToAkamai } from 'common/utils/uploadMediaFilesToAkamai';
import { selectCurrentUser, setCompany, setUserAuth } from 'pages/account/authSlice';
import { useUpdateUserMutation } from 'pages/pro/profileService';
import { useUpdateCompanyMutation } from 'pages/company/companyService';
import { switchCompany } from 'pages/api/const';
import { showNotification } from 'pages/pro/components/Projects/util';
import { NotificationType } from 'pages/pro/components/Projects/ViewProject/types';
import { useEditJobMutation } from 'pages/jobs/jobsService';
import { CREATE_CARD_WIZARD_TYPE } from 'common/types';
import lang from 'common/lang';
import { useAppDispatch, useAppSelector } from './state';

const {
  cards: { meta, coverCardDescription },
} = lang;

const mapApiCardsToLocalCards = (card: ApiCard, profileDeckType?: CREATE_CARD_WIZARD_TYPE) => {
  if (card.type === 'cover') {
    return {
      ...card,
      type: CardTypes.Cover,
      fieldValues: card.fields,
      meta: meta[profileDeckType || 'article'],
      description:
        profileDeckType === CREATE_CARD_WIZARD_TYPE.JOB
          ? coverCardDescription?.[profileDeckType]
          : '',
    };
  }
  if (card.type === 'about') {
    return { ...card, type: CardTypes.About, fieldValues: card.fields };
  }
  if (card.type === 'links') {
    return { ...card, type: CardTypes.Link, fieldValues: card.fields };
  }
  return { ...card, type: card.type as CardTypes, fieldValues: card.fields };
};

const useProfileDeck = (profileDeckType?: CREATE_CARD_WIZARD_TYPE) => {
  const dispatch = useAppDispatch();
  const isCurrentUser = useAppSelector(selectCurrentUser);
  const [updateUser, results] = useUpdateUserMutation();
  const [updateCompany, companyResults] = useUpdateCompanyMutation();
  const [editJob] = useEditJobMutation();
  const savedCards = useAppSelector(getCards);
  const deleteCards = useAppSelector(getDeletedCards);
  const loadFreshCards = (mantra?: string, presignedProfileCover?: string) => {
    const cards: Card[] = [{
      type: CardTypes.Cover,
      id: uuidv4(),
      fields: [],
      meta: meta[profileDeckType || 'article'],
      description: profileDeckType === CREATE_CARD_WIZARD_TYPE.JOB ? coverCardDescription?.[profileDeckType] : '',
      fieldValues: { media: presignedProfileCover, mantra },
      isValid: true,
    }];
    dispatch(loadState({ cards, wizardType: profileDeckType }));
    dispatch(setSelectCard(cards[0]));
  };

  const loadExistingCards = useCallback((cards: ApiCard[]) => {
    const userCards = cards.map((card) => mapApiCardsToLocalCards(card, profileDeckType));
    dispatch(loadState({ cards: userCards, wizardType: profileDeckType }));
    dispatch(setSelectCard(userCards[0]));
  }, [dispatch]);

  const uploadSaveCards = useCallback(async () => {
    const cardsData = getCardData(savedCards);
    const cardsWithMedia = await uploadMediaFilesToAkamai(cardsData, isCurrentUser?.username);
    const response = await updateUser({ cards: cardsWithMedia, delete_cards: deleteCards }).unwrap();
    if (response?.data) {
      dispatch(setUserAuth(response.data));
    }
  }, [
    updateUser, savedCards, isCurrentUser?.username, deleteCards,
  ]);

  const uploadSaveCardsCompany = useCallback(async (username: string) => {
    try {
      const cardsData = getCardData(savedCards);
      const cardsWithMedia = await uploadMediaFilesToAkamai(cardsData, username);
      const companyData = await updateCompany({
        id: username,
        payload: {
          cards: cardsWithMedia, delete_cards: deleteCards, logo: cardsWithMedia[0]?.fields?.logo || '',
        },
      }).unwrap();
      await fetch(switchCompany, {
        method: 'POST',
        body: JSON.stringify({ company: companyData?.data }),
        cache: 'no-store',
      });
      dispatch(setCompany({ currentCompany: companyData?.data }));
    } catch (error: any) {
      showNotification(error?.data?.message, NotificationType.ERROR);
    }
  }, [
    savedCards, deleteCards, updateCompany,
  ]);
  const uploadSaveCardsJob = useCallback(async (jobId: number) => {
    try {
      const cardsData = getCardData(savedCards);
      const cardsWithMedia = await uploadMediaFilesToAkamai(cardsData, jobId.toString());
      await editJob({
        id: jobId,
        formData: {
          cards: cardsWithMedia, delete_cards: deleteCards, logo: cardsWithMedia[0]?.fields?.logo || '',
        },
      });
    } catch (error: any) {
      showNotification(error?.data?.message, NotificationType.ERROR);
    }
  }, [savedCards, editJob, deleteCards]);

  const addCardsToWizard = useCallback((cards: any[]): boolean => {
    if (cards && cards.length > 0) {
      loadExistingCards(cards);
      return true;
    }
    dispatch(setSelectCard(savedCards[0]));
    return false;
  }, [
    loadExistingCards, dispatch, savedCards,
  ]);

  return {
    loadFreshCards,
    loadExistingCards,
    uploadSaveCards,
    addCardsToWizard,
    uploadSaveCardsCompany,
    uploadSaveCardsJob,
  };
};

export default useProfileDeck;
