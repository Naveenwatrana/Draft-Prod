import { IFeedData } from 'pages/feed/types';

export type CarouselProps = {
  width?: number;
  height?: number;
  slides: React.ReactNode[];
  cardType: string;
  totalCardsinStack: number;
  data: IFeedData;
  onSave: (id: string) => Promise<void>;
  isSaveLoading?: boolean;
  hideHeader?: boolean;
  onClick?: () => void;
  userId?: string;
};

export type CardStackHeaderProps = {
  activeIndex: number;
  totalCardsinStack: number;
  cardStackType: string;
  isTouchDevice: boolean;
  data: IFeedData;
  onSave: (id: string) => Promise<void>;
  isLoading?: boolean;
  hideHeader?: boolean;
};

export type CardStackArrowsProps = {
  isTouchDevice: boolean;
  showLeftArrow: boolean;
  showRightArrow: boolean;
  prevClick: () => void;
  nextClick: () => void;
  totalCardsinStack: number;
};
