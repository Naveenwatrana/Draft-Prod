import LogoIcon from 'components/Icons/icon';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { joinInUrl, signUpUrl } from 'common/utils/network/appRouts';
import useOutsideAlerter from 'common/hooks/useOutsideAlerter';
import lang from 'common/lang';
import { CTALink } from '../style';
import {
  DropDownItem,
  Header, Menu, MobileMenu, Nav, NavMenu, NavMenuItem, UserDropDown,
} from './style';
import { HomeHeaderProps } from './types';
import { links, secondaryNavLinks } from '../data';

const { menu } = lang.homePage.header;
const { startForFree } = lang.homePage;

const HomeHeader = ({ activeMenu }: HomeHeaderProps) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  useOutsideAlerter({
    ref: wrapperRef,
    outSideClick: () => setShowUserMenu(false),
  });
  return (
    <Header className="App-header">
      <Nav>
        <NavMenu>
          {links.map((link) => (
            <NavMenuItem key={link.id} active={activeMenu === link.type}>
              <Link href={link.link} data-cy={link.name}>{link.name}</Link>
            </NavMenuItem>
          ))}
        </NavMenu>
        <LogoIcon theme="light" />
        <NavMenu>
          {secondaryNavLinks.map((link) => (
            <NavMenuItem key={link.id} active={activeMenu === link.type}>
              <Link href={link.link}>{link.name}</Link>
            </NavMenuItem>
          ))}
          <NavMenuItem>
            <CTALink href={joinInUrl}>{startForFree}</CTALink>
          </NavMenuItem>
        </NavMenu>
      </Nav>
      <MobileMenu>
        <LogoIcon theme="light" />
        <div style={{ position: 'relative' }}>
          <Menu
            onClick={(event) => {
              event.stopPropagation();
              setShowUserMenu(!showUserMenu);
            }}
          >
            {menu}
          </Menu>
          {showUserMenu && (
            <UserDropDown ref={wrapperRef}>
              {links.map((link) => (
                <DropDownItem key={link.id}>
                  <NavMenuItem active={activeMenu === link.type}>
                    <Link href={link.link}>{link.name}</Link>
                  </NavMenuItem>
                </DropDownItem>
              ))}
              {secondaryNavLinks.map((link) => (
                <DropDownItem key={link.id}>
                  <NavMenuItem active={activeMenu === link.type}>
                    <Link href={link.link}>{link.name}</Link>
                  </NavMenuItem>
                </DropDownItem>
              ))}
              <DropDownItem>
                <CTALink href={joinInUrl}>{startForFree}</CTALink>
              </DropDownItem>
            </UserDropDown>
          )}
        </div>
      </MobileMenu>
    </Header>

  );
};

export default HomeHeader;
