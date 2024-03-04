import { ITag } from 'pages/article/view/types';
import { MouseEvent } from 'react';

export type IHandleMouseEnter = (
  event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
) => void;
export type IHandleMouseLeave = (
  event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
) => void;

type ICommonProps = {
  actions: React.ReactNode;
  info: React.ReactNode;
  cards: JSX.Element[];
};

export type AnimatedPageProps = ICommonProps & {
  content?: string | JSX.Element | JSX.Element[];
  moreLikeThis?: string | JSX.Element | JSX.Element[];
  title: string;
  tags?: ITag[];
  previewImage: string;
  detailSection?: string | JSX.Element | JSX.Element[];
};

export type CarouselMobileProps = ICommonProps & {
  content?: never;
};

export type CarouselDesktopProps = ICommonProps & {
  inView: boolean;
  inContentView: boolean;
  maxCardRight: number;
};

export type ContentProps = {
  children: string | JSX.Element | JSX.Element[];
  inView: boolean;
  reference: (node?: Element | null) => void;
};

export type CarouselInfoProps = {
  children: React.ReactNode;
};

export type CarouselCardProps = {
  children: React.ReactNode;
};

export type CarouselActionProps = {
  children: React.ReactNode;
};

export type SliderArrowProps = {
  type: 'internal' | 'external';
  direction: 'left' | 'right';
  show: boolean;
  onClick: () => void;
};

export type CarouselProps = {
  cards: JSX.Element[];
  currentIndex: number;
  inView: boolean;
  showLeftCard: boolean;
  showRightCard: boolean;
};

export type CarouselItemsWrapProps = {
  cards: JSX.Element[];
  currentIndex: number;
  inView: boolean;
  showLeftArrow: boolean;
  showRightArrow: boolean;
  handlePrevClick: () => void;
  handleNextClick: () => void;
};

export type CardsViewProps = {
  cards: any;
  actions: any;
  info: any;
  maxCardRight: number;
  inContentView: boolean;
  inView: boolean;
}
