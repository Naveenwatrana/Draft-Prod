import { IPositions } from 'components/Molecules/CreateContent/types';

export type IItem = {
    id: number;
    onClick: () => void;
    title: string;
    description: string;
    icon: () => JSX.Element;
  };

export type PopupProps = {
    open: boolean;
    onClose: () => void;
    items: IItem[];
    positions: IPositions;
};
