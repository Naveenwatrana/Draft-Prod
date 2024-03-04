import { IInteractionItemTypes } from 'common/services/Aladdin/types';
import { horizontalPositionValues } from 'components/KebabMenu/types';

export type ShareProfileProps = {
  primary?: boolean;
  horizontalPosition?: horizontalPositionValues;
  id: string;
  itemType: IInteractionItemTypes;
};
