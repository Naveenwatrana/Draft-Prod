import ButtonComp from 'components/buttonComp';
import TextComp from 'components/textComp';
import Link from 'next/link';
import styled from 'styled-components';

type TabProps = {
  active: boolean;
};

type UserNameProps = {
  active: boolean;
};

type StickyNavbarProps = {
  open: boolean;
};

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

export const NameContainer = styled(TextComp)`
  display: flex;
  gap: 24px;
  align-items: center;
  color: ${({ theme }) => theme.palette.white[100].value};
  width: 100%;
  > svg:first-child path {
    stroke: ${({ theme }) => theme.palette.gray[20].value};
  }
`;

export const Username = styled(ButtonComp)<UserNameProps>`
  font-weight: ${({ theme }) => theme.typography['16 semibold'].fontWeight};
  font-size: ${({ theme }) => theme.typography['16 semibold'].fontSize.value}px;
  background-color: ${({ active, theme }) => active ? theme.palette.gray[50].value : 'transparent'};
  padding: 8px 12px;
  border: none;
  box-shadow: none;
`;

export const TabsContainer = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px;
  overflow-x: auto;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
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
`;

export const FollowerContainer = styled.span`
  width: calc(100% - 32px);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.palette.white[100].value};
  gap: 8px;
  span {
    font-weight: ${({ theme }) => theme.typography['12 regular'].fontWeight};
    font-size: ${({ theme }) => theme.typography['12 regular'].fontSize.value}px;
  }
  gap: 8px;
`;

export const Count = styled.span`
  margin-right: 4px;
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
