import { CardTypes } from 'components/CardCreationWizard/types';
import lang from 'common/lang';
import {
  CardName, CardSubtext, Container, Description,
} from './styles';
import { CardFieldsProps } from './types';
import CoverCardFields from './CoverCardFields/CoverCardFields';
import AboutCardFields from './AboutCardFields/AboutCardFields';
import LinkCardFields from './LinkCardFields';

const { cards } = lang;

const CardFields = ({
  selectedCard, companyCards, handleEditImage, jobCoverCardsData,
}: CardFieldsProps) => {
  return (
    <Container>
      <CardName component="h3">
        {`${selectedCard.type} ${cards.card}`}
      </CardName>
      <CardSubtext>{selectedCard.meta}</CardSubtext>
      {selectedCard.type === CardTypes.Cover
      && <CoverCardFields jobCoverCardsData={jobCoverCardsData} selectedCard={selectedCard} withLogo={companyCards} handleEditImage={handleEditImage} />}
      {selectedCard.type === CardTypes.About && <AboutCardFields selectedCard={selectedCard} handleEditImage={handleEditImage} />}
      {selectedCard.type === CardTypes.Link && <LinkCardFields selectedCard={selectedCard} handleEditImage={handleEditImage} />}
      {selectedCard?.description && <Description>{selectedCard.description}</Description>}
    </Container>
  );
};

export default CardFields;
