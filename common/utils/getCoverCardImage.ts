import { ApiCard } from 'pages/article/create/types';

export const getCardImage = (cards: ApiCard[]) => {
  if (cards?.length === 0) {
    return '';
  }
  const coverCard = cards?.find((card) => card?.type === 'cover');
  if (coverCard) {
    return coverCard?.fields?.media;
  }
  return '';
};
export const getCoverCard = (cards: ApiCard[]) => {
  if (cards?.length === 0) {
    return '';
  }
  const coverCard = cards?.find((card) => card?.type === 'cover');
  if (coverCard) {
    return coverCard?.fields?.mantra;
  }
  return '';
};
