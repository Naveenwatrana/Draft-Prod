import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'common/hooks/state';
import { data as cardsMockData } from 'pages/article/cardsMockData';
import { useParams } from 'common/utils/router-fill';
import useProfileDeck from 'common/hooks/useProfileDeck';
import Loader from 'components/Loader/Loader';
import { useIsMobile } from 'common/hooks/useIsMobile';
import { isUserEditing, setIsCurrentUser } from 'pages/pro/profileSlice';
import CardCreationWizard from 'components/CardCreationWizard';
import CompanyNavbar from 'pages/org/components/CompanyNavBar';
import useCompany from 'common/hooks/useCompany';
import { CardTypes } from 'components/CardCreationWizard/types';
import useAladdinInteraction from 'common/services/Aladdin/useAladdinInteraction';
import { IInteractionEventValueType, IInteractionItemTypes, IInteractionTypes } from 'common/services/Aladdin/types';
import { CREATE_CARD_WIZARD_TYPE } from 'common/types';
import {
  CompanyPageContainer,
} from './style';
import ActionSection from './ActionSection';
import { useGetCompanyQuery } from './companyService';
import { CardsEntity, CompanyProps } from './types';
import BrandTab from './Tab/BrandTab';

const Company = ({
  companyInfo, isOwnProfile,
}: CompanyProps) => {
  const isMobile = useIsMobile();
  const [skip, setSkip] = useState(true);
  const params = useParams();
  const dispatch = useAppDispatch();
  const [addCardStep] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { saveInteraction } = useAladdinInteraction();
  const {
    uploadSaveCardsCompany, loadExistingCards, loadFreshCards,
  } = useProfileDeck(CREATE_CARD_WIZARD_TYPE.COMPANY);
  const isEditing = useAppSelector(isUserEditing);
  const { currentCompany: userIsCompany } = useCompany();

  useEffect(() => {
    dispatch(
      setIsCurrentUser(
        userIsCompany?.username === params.username || !params.username,
      ),
    );
  }, [userIsCompany, params, dispatch]);

  const { data: companyData, isLoading } = useGetCompanyQuery({
    companyName: params?.tab || userIsCompany?.username,
    company: userIsCompany?.username,
  }, {
    skip,
  });
  const data = (companyData || companyInfo);

  // Aladdin interaction event
  useEffect(() => {
    if (data.data?.id) {
      saveInteraction({
        itemId: data.data.id,
        itemType: IInteractionItemTypes.companies,
        eventType: IInteractionTypes.ViewPage,
        eventValue: IInteractionEventValueType.brandTab,
      });
      saveInteraction({
        itemId: data.data.id,
        itemType: IInteractionItemTypes.companies,
        eventType: IInteractionTypes.ViewCard,
        eventValue: IInteractionEventValueType.viewFirstCard,
      });
    }
  }, [
    data.data?.id,
    // Needs to call only once
    // Therefore, no dependencies are needed
  ]);
  // Aladdin interaction event

  const editCards = () => {
    if (data?.data?.cards?.length > 0) {
      const cardsToLoad = data.data.cards?.map((card: CardsEntity) => {
        if (card?.type === CardTypes.Cover.toLowerCase()) {
          return { ...card, fields: { ...card?.fields, logo: data?.data?.logo } };
        } return card;
      });
      loadExistingCards(cardsToLoad);
    } else {
      loadFreshCards();
    }
    setOpen(true);
  };

  const handleSaveCards = async () => {
    setSkip(false);
    setLoading(true);
    await uploadSaveCardsCompany(userIsCompany.username);
    setOpen(false);
    setLoading(false);
  };

  const {
    name, username, followers_count: followersCount, followings_count: followingsCount,
  } = data.data;

  return (
    <CompanyPageContainer>
      {(isLoading || loading) && <Loader />}
      <CompanyNavbar
        activeTab={1}
        data={{
          name,
          username,
          followersCount,
          followingsCount,
        }}
      />
      {open && (
        <CardCreationWizard
          maxCards={3}
          activeCardId={1}
          cardData={cardsMockData}
          setIsOpen={(state) => setOpen(state)}
          title="Edit Deck"
          isOpen={open}
          onSave={handleSaveCards}
          onClose={() => setOpen(false)}
          addCardStep={addCardStep}
          companyCards
        />
      )}

      <BrandTab
        handleSaveCards={handleSaveCards}
        openWizard={open}
        setOpenWizard={(val) => setOpen(val)}
        isDesktopView={!isMobile}
        data={data}
        editable
        editCards={editCards}
        setSkip={() => setSkip(false)}
        isOwnProfile={isOwnProfile}
      />
      {!isEditing && (
        <ActionSection
          company={data?.data}
          editable={isOwnProfile}
          numberOfBlocks={(data?.data?.blocks?.length || 0) + 1}
          companyId={data?.data?.id}
          setSkip={() => setSkip(false)}
          isSaved={data?.data?.saved}
        />
      )}
    </CompanyPageContainer>
  );
};

export default Company;
