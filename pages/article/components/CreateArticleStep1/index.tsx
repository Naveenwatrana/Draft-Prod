import lang from 'common/lang';
import Button from 'components/buttonComp';
import { ArticleTextEditor, Buttons } from 'pages/article/create/style';
import { data } from 'pages/article/cardsMockData';
import React, {
  KeyboardEvent, useCallback, useRef, useState,
} from 'react';
import CardCreationWizard from 'components/CardCreationWizard';
import { Card } from 'components/CardCreationWizard/types';
import { CARD_WIZARD_FEATURE_FLAG, getFeatureStatus } from 'common/utils/featureFlag';
import { useAppDispatch, useAppSelector } from 'common/hooks/state';
import {
  getCards, getFormValidStatus, setSelectCard,
} from 'components/CardCreationWizard/slice';
import {
  ArticlePreviewContainer, Container, Editor, EditorContainer, HeadlineField, Wrap,
} from './style';
import ArticleCards from '../ArticleCards';
type CreateArticleStep1Props = {
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  isEditing: boolean;
  setStep: (title: string) => void;
  disabled: boolean;
  cancelArticle: () => void;
}
const {
  article: {
    next, cancel,
    editText: { placeholderTitle },
  },
  cards: { editCards },
} = lang;

const CreateArticleStep1 = ({
  value, onChange, isEditing, setStep, disabled, cancelArticle,
}: CreateArticleStep1Props) => {
  const cards = useAppSelector(getCards);
  const [isOpen, setIsOpen] = React.useState(false);
  const [addCardStep, setAddCardStep] = useState(false);
  const [headlineText, setHeadlineText] = useState('');
  const dispatch = useAppDispatch();
  const formValidStatus = useAppSelector(getFormValidStatus);
  const articleHeading = useRef<HTMLDivElement | null>(null);
  const addNewCardHandler = () => {
    if (formValidStatus) {
      setAddCardStep(true);
      setIsOpen(true);
    } else {
      setIsOpen(true);
    }
  };
  const closeModal = () => {
    setIsOpen(false);
    setAddCardStep(false);
  };
  const selectCard = (card: Card) => {
    dispatch(setSelectCard(card));
    setIsOpen(true);
  };
  const handleKeyUp = (e: KeyboardEvent<HTMLDivElement>) => {
    if (articleHeading?.current && articleHeading.current.innerText.length >= 150 && e.code !== 'Backspace') {
      e.preventDefault();
      setHeadlineText(articleHeading.current.innerText);
      return;
    }
    if (e.code === 'Enter') {
      e.preventDefault();
    }
    setHeadlineText(articleHeading.current?.innerText || '');
  };
  const getValidStatus = useCallback(() => {
    return headlineText.length <= 0 || disabled;
  }, [disabled, headlineText]);
  return (
    <Container>
      <EditorContainer>
        <Editor>
          <Wrap>
            <HeadlineField
              ref={articleHeading}
              onKeyUp={handleKeyUp}
              role="textbox"
              contentEditable
              data-ph={placeholderTitle}
            >
            </HeadlineField>
            <ArticleTextEditor
              isEditing={isEditing}
              value={value}
              onChange={onChange}
            />
          </Wrap>
        </Editor>
        <ArticlePreviewContainer>
          {getFeatureStatus(CARD_WIZARD_FEATURE_FLAG) && (
            <>
              <ArticleCards
                cards={cards}
                selectCard={selectCard}
                addNewCard={addNewCardHandler}
                maxCards={3}
              />
              <CardCreationWizard
                onClose={closeModal}
                onSave={closeModal}
                maxCards={3}
                activeCardId={1}
                cardData={data}
                title={editCards}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                addCardStep={addCardStep}
              />
            </>
          )}
        </ArticlePreviewContainer>
      </EditorContainer>

      <Buttons>
        <Button
          label={cancel}
          onClick={cancelArticle}
          variant="link"
          primary
          data-cy={cancel}
        />
        <Button
          label={next}
          onClick={() => setStep(headlineText)}
          primary
          disabled={getValidStatus()}
          data-cy={next}
        />
      </Buttons>
    </Container>
  );
};

export default CreateArticleStep1;
