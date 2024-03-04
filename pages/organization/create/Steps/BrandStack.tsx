import { useAppDispatch, useAppSelector } from 'common/hooks/state';
import { useIsMobile } from 'common/hooks/useIsMobile';
import useProfileDeck from 'common/hooks/useProfileDeck';
import FlexBox from 'components/Atoms/Flexbox';
import Loader from 'components/Loader/Loader';
import { selectCurrentCompany } from 'pages/account/authSlice';
import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import AddCardsIcon from 'components/Icons/AddCardsIcon';
import lang from 'common/lang';
import TextComp from 'components/textComp';
import { FilledButton } from 'pages/pro/components/ActionSection/style';
import CopyIcon from 'components/Icons/CopyIcon';
import { data as cardsMockData } from 'pages/article/cardsMockData';
import { theme } from 'common/theme';
import CardCreationWizard from 'components/CardCreationWizard';
import ModalElement from 'components/Modal/Modal';
import CardCreationWizardMobile from 'components/CardCreationWizard/Mobile';
import ButtonComp from 'components/buttonComp';
import CompanyCards from 'pages/feed/Cards/CompanyCards';
import { resetState } from 'components/CardCreationWizard/slice';
import useHoverFocus from 'common/hooks/useHoverFocus';
import { CREATE_CARD_WIZARD_TYPE } from 'common/types';
import Background from './Background';
import { Buttons } from '../style';
import {
  AddCard, CentredDiv, SkipButton, UserName,
} from './style';
import { BrandStackProps } from '../types';
const {
  userOnBoarding: {
    brand: { createMessage, subtitle1, subtitle2Organization },
  },
  profile: { addCard },
  buttonText: { skipThisStep, create },
} = lang;

const BrandStack = ({ onNext }: BrandStackProps) => {
  const currentCompany = useAppSelector(selectCurrentCompany);
  const isMobile = useIsMobile();
  const { uploadSaveCardsCompany, loadExistingCards, loadFreshCards } = useProfileDeck(CREATE_CARD_WIZARD_TYPE.COMPANY);
  const [, setSkip] = useState(true);
  const [open, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [addCardStep, setAddCardStep] = useState(false);
  const handleSaveCards = async () => {
    setLoading(true);
    await uploadSaveCardsCompany(currentCompany?.username);
    setOpen(false);
    setLoading(false);
  };
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetState());
  }, [dispatch]);
  const handleCloseWizard = useCallback((state: boolean) => {
    setOpen(state);
    setAddCardStep(!state);
    setSkip(false);
  }, []);
  const isUserDeckAvailable = useMemo(
    () => currentCompany?.cards && currentCompany?.cards.length > 0,
    [currentCompany?.cards],
  );
  const handleNext = () => {
    onNext();
  };
  const handleEdit = () => {
    loadExistingCards(currentCompany?.cards);
    setOpen(true);
  };
  const { manageFocus, focused } = useHoverFocus();
  const handleAddCards = () => {
    loadFreshCards();
    setOpen(true);
  };
  return (
    <FlexBox>
      {isLoading && <Loader />}
      <Background focused={focused} />
      {!isUserDeckAvailable ? (
        <AddCard {...manageFocus}>
          <AddCardsIcon />
          <TextComp component="h2">{createMessage}</TextComp>
          <TextComp component="h4">{subtitle1}</TextComp>
          <TextComp component="h4">{subtitle2Organization}</TextComp>
          <FilledButton onClick={handleAddCards}>
            <CopyIcon color={theme.palette.gray[80].value} />
            <span>{addCard}</span>
          </FilledButton>
          <UserName>{currentCompany?.name}</UserName>
        </AddCard>
      ) : (
        <CentredDiv {...manageFocus}>
          <CompanyCards data={currentCompany} height={628} width={372} onClick={handleEdit} />
        </CentredDiv>
      )}
      {open && !isMobile && (
        <CardCreationWizard
          maxCards={3}
          activeCardId={1}
          cardData={cardsMockData}
          setIsOpen={(state) => handleCloseWizard(state)}
          title="Edit Cards"
          isOpen={open}
          onSave={handleSaveCards}
          onClose={() => handleCloseWizard(false)}
          addCardStep={addCardStep}
          companyCards
        />
      )}
      {isMobile && (
        <ModalElement isOpen={open}>
          <CardCreationWizardMobile
            onSave={handleSaveCards}
            maxCards={3}
            cardData={cardsMockData}
            title="Edit Cards"
            onClose={() => handleCloseWizard(false)}
            saveButtonText="Save"
            companyCards
          />
        </ModalElement>
      )}
      <Buttons>
        {!isUserDeckAvailable && (
          <SkipButton
            label={skipThisStep}
            primary
            variant="link"
            onClick={handleNext}
            data-cy="skipThisStep"
          />
        )}
        <ButtonComp
          label={create}
          onClick={handleNext}
          primary
          fullWidth
          disabled={!isUserDeckAvailable}
          data-cy="create"
        />
      </Buttons>
    </FlexBox>
  );
};

export default BrandStack;
