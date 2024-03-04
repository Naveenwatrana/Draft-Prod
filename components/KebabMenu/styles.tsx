import styled from 'styled-components';
import { MenuProps, horizontalPositionValues } from './types';

export const KebabMenuWrapper = styled.div`
    position: relative;
    & svg {
        cursor: pointer;
    }
`;
export const Menu = styled.div<MenuProps>`
    position: absolute;
    bottom: ${({ position }) => position === 'top' && '55px'};
    top: ${({ position }) => position === 'bottom' && '35px'};
    opacity: ${({ isActive }) => (isActive ? 1 : 0)};
    transition: all 0.3s;
    height: ${({ isActive, items }) => (isActive ? `${items * 35}px` : '0px')};
    visibility: ${({ isActive }) => (isActive ? 'visible' : 'hidden')};
    border-radius: 8px;
    background-color: ${({ theme }) => theme.palette.gray['50'].value};
    z-index: 5;
    width: 164px;
    padding: 8px;
    left: ${({ horizontalPosition }) => horizontalPosition === horizontalPositionValues.center && '-82px'};
    right: -30%;
`;
export const IconButton = styled.button`
    background: none;
    border: none;
`;

export const ListItem = styled.li`
    list-style: none;
    padding: 8px;
    cursor: pointer;
    color: ${({ theme }) => theme.palette.white['100'].value};
    &:hover {
        background: ${({ theme }) => theme.palette.gray['60'].value};
    }
`;
export const List = styled.ul`
    padding: 0; 
    margin: 0;
`;
