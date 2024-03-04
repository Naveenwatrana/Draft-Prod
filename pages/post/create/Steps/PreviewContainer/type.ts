import { IContent } from '../type';

export type ItemProps = {
  item: PreviewContainerItem;
  dragHandleProps: {
    onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void
    onTouchStart: (e: React.TouchEvent<HTMLDivElement>) => void
  };
};

export interface PreviewContainerItem extends IContent {
  changeSelectedFile: (file: IContent) => void;
  index: number;
  showTooltip: boolean;
}
