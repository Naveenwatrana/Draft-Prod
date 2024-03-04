import { ISavedCard } from 'pages/workspace/type';
import { IFeedData } from '../types';

export type CompanyCardsProps = {
    data: IFeedData | ISavedCard;
    hideHeader?: boolean;
    onClick?: (param?: string) => void;
    withDate?: boolean;
    postCard?: boolean;
    height?: number;
    width?: number;
    clickable?: boolean;
  };
