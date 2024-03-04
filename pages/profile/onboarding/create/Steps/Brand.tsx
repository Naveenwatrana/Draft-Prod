import React, {
  useCallback, useMemo, useState,
} from 'react';
import FlexBox from 'components/Atoms/Flexbox';
import AddCardsIcon from 'components/Icons/AddCardsIcon';
import TextComp from 'components/textComp';
import lang from 'common/lang';
import { useAppSelector } from 'common/hooks/state';
import { selectCurrentUser } from 'pages/account/authSlice';
import { FilledButton } from 'pages/pro/components/ActionSection/style';
import CopyIcon from 'components/Icons/CopyIcon';
import { theme } from 'common/theme';
import useProfileDeck from 'common/hooks/useProfileDeck';
import CardCreationWizard from 'components/CardCreationWizard';
import { data as cardsMockData } from 'pages/article/cardsMockData';
import Loader from 'components/Loader/Loader';
import ButtonComp from 'components/buttonComp';
import UserCards from 'pages/feed/Cards/UserCards';
import { useIsMobile } from 'common/hooks/useIsMobile';
import ModalElement from 'components/Modal/Modal';
import CardCreationWizardMobile from 'components/CardCreationWizard/Mobile';
import useHoverFocus from 'common/hooks/useHoverFocus';
import { CREATE_CARD_WIZARD_TYPE } from 'common/types';
import {
  AddCard,
  CentredDiv,
  SkipButton,
  UserName,
} from './style';
import { BrandProps } from './type';
import { Buttons } from '../style';
import Background from './Background';
const {
  userOnBoarding: {
    brand: { createMessage, subtitle1, subtitle2 },
  },
  profile: { addCard },
  buttonText: { skipThisStep, done },
} = lang;

const Brand = ({ onSkip, onNext }: BrandProps) => {
  const currentUser = useAppSelector(selectCurrentUser);
  const isMobile = useIsMobile();
  const { uploadSaveCards, loadExistingCards, loadFreshCards } = useProfileDeck(CREATE_CARD_WIZARD_TYPE.USER);
  const [skip, setSkip] = useState(true);
  const [open, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [addCardStep, setAddCardStep] = useState(false);
  const handleSaveCards = async () => {
    setLoading(true);
    await uploadSaveCards();
    setOpen(false);
    setLoading(false);
  };
  const handleCloseWizard = useCallback((state: boolean) => {
    setOpen(state);
    setAddCardStep(!state);
    setSkip(false);
  }, []);
  const isUserDeckAvailable = useMemo(
    () => currentUser?.cards && currentUser?.cards.length > 0,
    [currentUser?.cards],
  );
  const handleNext = () => {
    onNext();
  };
  const { manageFocus, focused } = useHoverFocus();
  const handleEdit = () => {
    loadExistingCards(currentUser.cards);
    setOpen(true);
  };
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
          <TextComp component="h4">{subtitle2}</TextComp>
          <FilledButton onClick={handleAddCards}>
            <CopyIcon color={theme.palette.gray[80].value} />
            <span>{addCard}</span>
          </FilledButton>
          <UserName>{currentUser?.name}</UserName>
        </AddCard>
      ) : (
        <CentredDiv {...manageFocus}>
          <UserCards onClick={handleEdit} data={currentUser} clickable={false} height={628} width={372} />
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
        />
      )}
      {isMobile
      && (
        <ModalElement isOpen={open}>
          <CardCreationWizardMobile
            onSave={handleSaveCards}
            maxCards={3}
            cardData={cardsMockData}
            title="Edit Cards"
            onClose={() => handleCloseWizard(false)}
            saveButtonText="Save"
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
          label={done}
          onClick={handleNext}
          primary
          fullWidth
          disabled={!isUserDeckAvailable}
          data-cy="done"
        />
      </Buttons>
    </FlexBox>
  );
};

export default Brand;
