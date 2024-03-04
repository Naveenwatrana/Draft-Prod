import { SteppersContainer } from 'components/Stepper/style';
import Link from 'next/link';
import styled from 'styled-components';
type TabProps = {
  active: boolean;
};
type StickyNavbarProps = {
  open: boolean;
};
export const Container = styled.div`
  position: fixed;
  top: 0;
  z-index: 1;
  background-color: ${({ theme }) => theme.palette.gray['80'].value};
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  gap: 16px;
  width: calc(100% - 32px);
  height: 32px;
  border-bottom: 1px solid ${({ theme }) => theme.palette.gray[40].value};
  ${SteppersContainer} {
    flex: 2;
    width: 100%;
    justify-content: center;
  }
`;

export const BackText = styled.span`
  font-size: ${({ theme }) => theme.typography['20 semibold'].fontSize.value}px;
  font-weight: ${({ theme }) => theme.typography['20 semibold'].fontWeight};
  color: ${({ theme }) => theme.palette.white['100'].value};
  display: flex;
  align-items: center;
  gap: 13px;
  flex: 2;
  cursor: pointer;
  z-index: 1;
  `;

export const ClippedUserName = styled.h1`
  @media (max-width: 1100px) and (min-width: 1023px) {
    width: 200px;
  }
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: start;
  text-transform: capitalize;
  font-weight: ${({ theme }) => theme.typography['20 semibold'].fontWeight};
  font-size: ${({ theme }) => theme.typography['20 semibold'].fontSize.value}px;
`;

export const IconWrapper = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.palette.gray['40'].value};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: ${({ theme }) => theme.palette.gray['40'].value};
  }
`;

export const TabsContainer = styled.span`
  width: 33%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex: 2;
`;

export const MobileTabsContainer = styled.span`
  width: 33%;
  display: flex;
  gap: 8px;
  flex: 2;
  padding: 8px;
  overflow-x: auto;
`;

export const Tab = styled(Link)<TabProps>`
  cursor: pointer;
  font-weight: ${({ theme }) => theme.typography['14 semibold'].fontWeight};
  font-size: ${({ theme }) => theme.typography['14 semibold'].fontSize.value}px;
  color: ${({ theme, active }) => active ? theme.palette.gray[80].value : theme.palette.white[100].value};
  background-color: ${({ theme, active }) => active && theme.palette.white[100].value};
  padding: 8px 14px;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.palette.gray[40].value};
  text-wrap: nowrap;
`;

export const StapperContainer = styled.span`
  width: 33%;
  display: flex;
  flex: 2;
`;

export const HeaderRightSection = styled.span`
  flex:2;
`;

export const NavbarContainer = styled.div`
  padding: 4px 12px;
  background-color: ${({ theme }) => theme.palette.gray[80].value};
  /* position: fixed; */
  max-height: 60px;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: calc(100% - 34px);
`;

export const StickyNavbar = styled.div<StickyNavbarProps>`
  position: sticky;
  top: 0;
  background: ${({ theme }) => theme.palette.gray[80].value};
  z-index: ${({ open }) => !open && 2};
  width: 100%;
  display: flex;
  justify-content: center;
`;
