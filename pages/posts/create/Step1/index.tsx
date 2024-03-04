import ContentCreateFooter from 'components/Organisms/ContentCreateFooter';
import { data } from 'pages/article/cardsMockData';
import { useAppDispatch, useAppSelector } from 'common/hooks/state';
import {
  getCards, resetState, setSelectCard,
} from 'components/CardCreationWizard/slice';
import { Card } from 'components/CardCreationWizard/types';
import { useCallback, useState } from 'react';
import { ArticleSteps } from 'pages/article/create/types';
import CardCreationWizard from 'components/CardCreationWizard';
import { useRouter } from 'next/router';
import lang from 'common/lang';
import { CardsContainer } from '../styles';
import { PostsStepCreateProps } from './types';
import { ArticleCardsWrapper } from './styles';

const { editCards } = lang.cards;
const { next, cancel } = lang.buttonText;

const PostsStepCreate = ({ setStep }: PostsStepCreateProps) => {
  const cards = useAppSelector(getCards);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [addCardStep, setAddCardStep] = useState(false);
  const selectCard = (card: Card) => {
    setIsOpen(true);
    dispatch(setSelectCard(card));
  };
  const addNewCardHandler = () => {
    if (cards[0]?.fieldValues?.mantra) {
      setAddCardStep(true);
    }
    setIsOpen(true);
  };
  const closeWizard = useCallback(() => {
    setIsOpen(false);
    setAddCardStep(false);
  }, [
    setIsOpen, setAddCardStep,
  ]);
  const handleCancel = useCallback(() => {
    dispatch(resetState());
    router.back();
  }, [router, dispatch]);
  return (
    <>
      <CardsContainer>
        <ArticleCardsWrapper
          cards={cards}
          selectCard={selectCard}
          addNewCard={addNewCardHandler}
          maxCards={3}
        />
      </CardsContainer>
      <ContentCreateFooter
        onBack={handleCancel}
        onNext={() => setStep(ArticleSteps.TAGS)}
        nextLabel={next}
        backLabel={cancel}
        nextDisabled={!cards[0]?.fieldValues?.mantra}
        backDisabled={false}
      />
      <CardCreationWizard
        onClose={closeWizard}
        onSave={() => undefined}
        maxCards={3}
        activeCardId={1}
        cardData={data}
        title={editCards}
        setIsOpen={() => undefined}
        isOpen={isOpen}
        addCardStep={addCardStep}
      />
    </>
  );
};

export default PostsStepCreate;
