import { CardSizes } from 'components/DefaultCard/types';

export type UserNameViewProps = {
  userNameClickable: boolean;
  primaryText?: string;
  size?: CardSizes;
  isAuthorCompany?: boolean;
  userId?: string;
};
