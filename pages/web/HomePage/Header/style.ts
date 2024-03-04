import styled from 'styled-components';
import Link from 'next/link';
import { CreateProfileCTA } from '../style';
import { NavMenuItemProps } from './types';

export const Header = styled.header`
  display: flex;
  padding: 20px 10%;
  position: fixed;
  width: 80%;
  left: 0;
  top: 0;
  background: #080808;
  z-index: 10;
  @media (max-width: 1200px) {
    padding: 20px 0;
    width: 100%;
  }
`;

export const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  @media (max-width: 910px) {
    display: none;
  }
`;
export const NavMenu = styled.ul`
  display: flex;
`;
export const NavMenuItem = styled.li<NavMenuItemProps>`
  list-item: none;
  padding: 0 20px;
  &::marker {
    content: '';
  }
  & a {
    color: ${({ theme, active }) => active && theme.palette.green[100].value};
  }
`;
export const MobileMenu = styled.div`
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  ${CreateProfileCTA} {
    width: auto;
  }
  @media (min-width: 910px) {
    display: none;
  }
`;
export const UserDropDown = styled.div`
  position: absolute;
  right: 10px;
  width: 224px;
  padding: 8px;
  border: 1px solid ${(props) => props.theme.palette.gray['40'].value};
  background: rgba(43, 44, 45, 0.85); // TODO: add color
  backdrop-filter: blur(16px);
  z-index: 90;
  border-radius: 8px;
  margin-top: 5px;
`;
export const MenuContainer = styled.div`
  position: relative
`;
export const Menu = styled.button`
  border: 1px solid ${({ theme }) => theme.palette.green[80].value};
  border-radius: 16px;
  padding: 10px 16px;
  font-size: 14px;
  cursor: pointer;
  color: ${({ theme }) => theme.palette.white['100'].value};
  background: none;
`;

export const DropDownItem = styled.div`
  color: ${(props) => props.theme.palette.white['100'].value};
  font-size: 14px;
  font-weight: 300;
  line-height: 20px;
  padding: 8px;
  font-family: ${({ theme }) => theme.defaultFont};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  svg {
    width: 18px;
  }
  &:hover {
    background-color: ${(props) => props.theme.palette.gray['80'].value};
    border-radius: 8px;
  }
`;
