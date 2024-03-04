import { ApiCard } from 'pages/article/create/types';
import { Card, CardTypes } from 'components/CardCreationWizard/types';
import { getMediaFiles } from 'pages/article/create/utils';
import { getCoverImage } from 'components/CardCreationWizard/components/CardPreview/utils';

export const uploadMediaFilesToAkamai = async (files: ApiCard[], userName: string): Promise<ApiCard[]> => {
  try {
    return await getMediaFiles(files, userName);
  } catch (error) {
    console.error('Error in uploading media files to Akamai.');
    throw new Error('Error in uploading media files to Akamai.');
  }
};

export const getCardData = (userCards: Card[]): ApiCard[] => userCards.map((card: Card) => {
  const cardId = card.id;
  let userCard: ApiCard = { type: '', fields: {} };
  if (card.type === CardTypes.Link) {
    userCard = {
      type: 'links',
      fields: {
        ...card.fieldValues,
        media: getCoverImage(card.fieldValues),
        links: (card?.fieldValues?.links as any[]),
      },
    };
  } else {
    userCard = {
      type: card.type.toLocaleLowerCase(),
      fields: {
        ...card.fieldValues,
        media: getCoverImage(card.fieldValues),
      },
    };
  }
  if (typeof cardId === 'number') {
    userCard.id = cardId;
  }
  return userCard;
});
