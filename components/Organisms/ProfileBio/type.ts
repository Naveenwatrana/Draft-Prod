import { IInteractionItemTypes } from 'common/services/Aladdin/types';
import { PINS_TYPES } from 'common/types';

export type BioProps = {
  media: string;
  title: string;
  subtitle: string;
  followers: number;
  following: number;
  setSkip: () => void;
  mantra: string;
  skills: string[];
  id: string;
  isFollowing: boolean;
  isLoading: boolean;
  isSaved: boolean;
  itemType: IInteractionItemTypes;
  pinType: PINS_TYPES;
};
