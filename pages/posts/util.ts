import { PostCard } from 'components/CardCreationWizard/components/Cards/type';
import { PostViewResponse } from 'components/Molecules/ViewContent/types';

export const mapOldPost = (data: PostViewResponse): PostCard => {
  return {
    media: data.cards.map((card) => card.fields.media),
    caption: data.cards[0].fields.mantra,
    tags: data.tags.map((tag) => tag),
  };
};
