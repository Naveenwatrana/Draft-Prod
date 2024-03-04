import React, { useCallback } from 'react';
import CompanyProfileDeck from 'pages/company/ProfileDeck';
import { CardsContainer } from 'pages/company/style';
import { data as cardsMockData } from 'pages/article/cardsMockData';
import { ICompanyProfile } from 'pages/company/ProfileDeck/types';
import { useAppDispatch } from 'common/hooks/state';
import { setIsEditing } from 'pages/pro/profileSlice';
import MobileActionButtons from 'pages/pro/components/Blocks/MobileActionButtons';
import CardCreationWizardMobile from 'components/CardCreationWizard/Mobile';
import lang from 'common/lang';
import ModalElement from 'components/Modal/Modal';
import useProfileDeck from 'common/hooks/useProfileDeck';
import { CREATE_CARD_WIZARD_TYPE } from 'common/types';

export type CompanyDeckMobileProps = {
    data: ICompanyProfile;
    editCards: (state: boolean) => void;
    openWizard: boolean;
    setOpenWizard: (open: boolean) => void;
    handleSaveCards: () => void;
    isOwnProfile?: boolean;
};

const { saveDeck, editDeck } = lang.deck;

const CompanyDeckMobile = ({
  data, editCards, openWizard, setOpenWizard, handleSaveCards, isOwnProfile,
}: CompanyDeckMobileProps) => {
  const { loadExistingCards, loadFreshCards } = useProfileDeck(CREATE_CARD_WIZARD_TYPE.COMPANY);
  const dispatch = useAppDispatch();

  const handleOnClick = useCallback(() => {
    dispatch(setIsEditing(true));
    if (data?.cards && data.cards.length > 0) {
      loadExistingCards(data.cards);
      setOpenWizard(true);
      return;
    }
    loadFreshCards();
    setOpenWizard(true);
  }, [
    data, dispatch, loadExistingCards, setOpenWizard, loadFreshCards,
  ]);

  const handleEditMobile = () => {
    setOpenWizard(true);
  };
  return (

    <CardsContainer>
      <CompanyProfileDeck
        data={data}
        setEditImageDetail={editCards}
        onCardClick={handleOnClick}
        isOwnProfile={isOwnProfile}
      />
      {false && (
        <MobileActionButtons
          handleEdit={handleEditMobile}
        />
      )}
      {openWizard && (
        <ModalElement isOpen={openWizard}>
          <CardCreationWizardMobile
            maxCards={3}
            cardData={cardsMockData}
            title={editDeck}
            onClose={() => setOpenWizard(false)}
            saveButtonText={saveDeck}
            onSave={handleSaveCards}
            companyCards
          />
        </ModalElement>
      )}

    </CardsContainer>
  );
};

export default CompanyDeckMobile;
