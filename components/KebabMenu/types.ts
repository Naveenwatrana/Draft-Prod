import { ReactElement } from 'react';

export type MenuProps = {
    isActive: boolean;
    position: 'top' | 'bottom';
    items: number;
    horizontalPosition?: horizontalPositionValues;
};

export type KebabMenuProps = {
    list: ReactElement;
    closeMenu?: boolean;
    position?: 'top' | 'bottom';
    icon?: ReactElement;
    horizontalPosition?: horizontalPositionValues;
};
export enum horizontalPositionValues {
    left = 'left',
    right = 'right',
    center = 'center',
}
