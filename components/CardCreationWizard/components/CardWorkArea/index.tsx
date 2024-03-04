import { useState } from 'react';
import CardFields from '../CardFields';
import CardPreview from '../CardPreview';
import CardCropper from './CardCropper';
import { Container } from './styles';
import { CardWorkAreProps } from './types';

const CardWorkArea = ({ selectedCard, companyCards, jobCoverCardsData }: CardWorkAreProps) => {
  const [editImage, setEditImage] = useState(false);
  const handleEditImage = (value: boolean) => {
    setEditImage(value);
  };
  return (
    <Container>
      {editImage && <CardCropper handleEditImage={handleEditImage} selectedCard={selectedCard} />}
      {!editImage && <CardPreview jobCoverCardsData={jobCoverCardsData} handleEditImage={handleEditImage} selectedCard={selectedCard} />}
      <CardFields jobCoverCardsData={jobCoverCardsData} selectedCard={selectedCard} companyCards={companyCards} handleEditImage={handleEditImage} />
    </Container>
  );
};

export default CardWorkArea;
