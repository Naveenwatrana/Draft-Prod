import ButtonComp from 'components/buttonComp';
import Link from 'next/link';
import styled from 'styled-components';

type TabProps = {
  active: boolean;
};

type UserNameProps = {
  active: boolean;
  disable: boolean;
};

export const NavbarContainer = styled.div`
  padding: 12px 18px;
  width: calc(100% - 32px);
  border-bottom: 1px solid ${({ theme }) => theme.palette.gray[40].value};
  background-color: ${({ theme }) => theme.palette.gray[80].value};
  position: fixed;
  max-height: 60px;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const NameContainer = styled.div`
  svg {
    cursor: pointer;
    width: 40px;
    height: 40px;
  }
  > svg:first-child:hover {
    background-color: ${({ theme }) => theme.palette.gray[50].value};
    border-radius: 50%;
  }
  display: flex;
  gap: 16px;
  align-items: center;
  color: ${({ theme }) => theme.palette.white[100].value};
  width: 33%;
`;

export const Username = styled(ButtonComp)<UserNameProps>`
  font-weight: ${({ theme }) => theme.typography['20 semibold'].fontWeight};
  font-size: ${({ theme }) => theme.typography['20 semibold'].fontSize.value}px;
  background-color: ${({ active, theme }) => active ? theme.palette.gray[50].value : 'transparent'};
  border: 1px solid transparent;
  padding: 4px 8px;
  line-height: 28px;
  box-shadow: none;
  :hover {
    background-color: ${({ theme, disable }) => !disable ? theme.palette.gray[50].value : 'transparent'};
    border: 1px solid ${({ theme, disable }) => !disable ? theme.palette.gray[40].value : 'transparent'};
  }
`;
export const UsernameH1 = styled.h1`
  font-weight: ${({ theme }) => theme.typography['20 semibold'].fontWeight};
  font-size: ${({ theme }) => theme.typography['20 semibold'].fontSize.value}px;
  border: 1px solid transparent;
  padding: 4px 8px;
  line-height: 28px;
  box-shadow: none;
`;

export const TabsContainer = styled.span`
  width: 33%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
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
  width: 33%;
  display: flex;
  align-items: center;
  justify-content: end;
  color: ${({ theme }) => theme.palette.white[100].value};
  gap: 8px;
  font-weight: ${({ theme }) => theme.typography['14 regular'].fontWeight};
  font-size: ${({ theme }) => theme.typography['14 regular'].fontSize.value}px;
  gap: 8px;
`;

export const Count = styled.span`
  font-weight: ${({ theme }) => theme.typography['14 semibold'].fontWeight};
  margin-right: 4px;
`;

export const PopOver = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 16px;
  gap: 16px;

  position: absolute;
  width: max-content;
  min-width: 185px;
  top: 38px;

  background: ${({ theme }) => theme.palette.gray[50].value};
  border: 1px solid ${({ theme }) => theme.palette.gray[40].value};
  box-shadow: 0px 0px 52px ${({ theme }) => theme.palette.gray[100].value};
  border-radius: 8px;
  span:first-child {
    color: ${({ theme }) => theme.palette.gray[20].value};
  }
  z-index: 3;
  @media screen and (max-width: 1023px) {
    top: 34px;
  }
`;

export const PopOverContainer = styled.span`
  display: flex;
  @media screen and (max-width: 1023px) {
    justify-content: flex-end;
  }
`;

export const UserNameWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 70px;
  position: relative;
  align-items: flex-start;
  @media screen and (max-width: 768px) {
    margin: 0;
    width: 100%;
    justify-content: center;
    margin-right: 24px;
  }
  svg:hover {
    background-color: ${({ theme }) => theme.palette.gray[50].value};
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.palette.gray[40].value};
  }
  svg {
    border: 1px solid transparent;
  }
`;

export const LocationContainer = styled.span`
  color: ${({ theme }) => theme.palette.gray[10].value};
  font-weight: ${({ theme }) => theme.typography['12 regular'].fontWeight};
  font-size: ${({ theme }) => theme.typography['12 regular'].fontSize.value}px;
  margin-left: 8px;
  @media screen and (max-width: 768px) {
    margin-left: 12px;
  }
`;
