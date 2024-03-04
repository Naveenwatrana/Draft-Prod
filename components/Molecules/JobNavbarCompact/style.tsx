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
  top: 57px;
  z-index: 1;
  background-color: ${({ theme }) => theme.palette.gray['80'].value};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  width: calc(100% - 32px);
  ${SteppersContainer} {
    flex: 2;
    width: 100%;
    justify-content: center;
  }
`;

export const TopHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  gap: 16px;
  border-radius: 16px;
  align-items: center;
  background-color: ${({ theme }) => theme.palette.gray['50'].value};
`;

export const BackText = styled.span`
  font-size: ${({ theme }) => theme.typography['20 semibold'].fontSize.value}px;
  font-weight: ${({ theme }) => theme.typography['20 semibold'].fontWeight};
  color: ${({ theme }) => theme.palette.white['100'].value};
  display: flex;
  align-items: center;
  gap: 16px;
  // border-radius: 16px;
  // background-color: ${({ theme }) => theme.palette.gray['50'].value};
  cursor: pointer;
  padding: 16px;
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

export const StatusText = styled.span`
  text-transform: capitalize;
  font-size: ${({ theme }) => theme.typography['14 semibold'].fontSize.value}px;
  font-weight: ${({ theme }) => theme.typography['14 semibold'].fontWeight};
  padding: 4px 16px;
  line-height: 18px;
  background-color: ${({ theme }) => theme.palette.gray['40'].value};
  border-radius: 30px;
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
  max-height: 60px;
  z-index: 1;
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

export const PrimaryButton = styled.button<{disabled: boolean}>`
  font-weight: ${({ theme }) => theme.typography['14 semibold'].fontWeight};
  border: none;
  font-size: 14px;
  line-height: 18px;
  color: ${({ theme }) => theme.palette.gray[80].value};
  padding: 16px;
  border-radius: 16px;
  width: fit-content;
  background: ${({ disabled, theme }) => `${theme.palette.green[80].value}${disabled ? '26' : ''}`};
  cursor: pointer;

`;

export const SeconderyButton = styled.button`
  font-weight: ${({ theme }) => theme.typography['14 semibold'].fontWeight};
  border: none;
  font-size: 14px;
  line-height: 18px;
  color: ${({ theme }) => theme.palette.white[100].value};
  padding: 16px;
  border-radius: 16px;
  width: fit-content;
  display: flex;
  justify-content: center;
  align-item: center;
  gap: 8px;
  border: 1px solid ${({ theme }) => theme.palette.green[80].value};
  cursor: pointer;
  background: transparent;
`;

export const ErrorButton = styled.button<{disabled?: boolean}>`
  font-weight: ${({ theme }) => theme.typography['14 semibold'].fontWeight};
  border: none;
  font-size: 14px;
  line-height: 18px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ disabled, theme }) => disabled ? theme.palette.gray[100].value : theme.palette.red[100].value};;
  padding: 16px;
  border-radius: 16px;
  width: fit-content;
  background: ${({ disabled, theme }) => disabled ? theme.palette.gray[40].value : theme.palette.red[90].value};
  cursor: pointer;
`;

export const TabsLayoutTabs = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.palette.gray[40].value};
`;
