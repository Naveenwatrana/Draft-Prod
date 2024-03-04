import styled from 'styled-components';
import { Item } from 'components/Atoms/CheckboxSelect/style';
import { SideBarItemProps } from './types';

export const SidebarContainer = styled.div`
  display: flex;
  min-height: calc(100vh - 98px);
  padding: 16px 24px;
  flex-direction: column;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.palette.gray[60].value};
  width: 239px;
  position: fixed;
  ${Item} {
    padding: 8px 0;
  }
  @media (max-width: 768px) {
    display: none;
  }

`;

export const SideBarItem = styled.div<SideBarItemProps>`
  font-weight: ${(props) => props.theme.typography['14 regular'].fontWeight};
  font-size: ${(props) => props.theme.typography['14 regular'].fontSize.value}px;
  line-height: 20px;
  color: ${(props) => props.theme.palette.white['100'].value};
  background-color: ${(props) => props.selected ? props.theme.palette.gray['50'].value : ''};
  margin: 4px 0;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 300ms;
  width: calc(100% - 16px);
`;

export const Subtitle = styled.span`
  color: ${({ theme }) => theme.palette.gray[20].value};
  font-size: ${({ theme }) => theme.typography['12 semibold'].fontSize.value}px;
  font-weight: ${({ theme }) => theme.typography['12 semibold'].fontWeight};
  line-height: 18px;
  margin-bottom: 8px;
`;

export const FilterSubtitle = styled.span`
  color: ${({ theme }) => theme.palette.gray[20].value};
  font-size: ${({ theme }) => theme.typography['12 semibold'].fontSize.value}px;
  font-weight: ${({ theme }) => theme.typography['12 semibold'].fontWeight};
  line-height: 18px;
  margin-bottom: 8px;
  margin-top: 15px;
`;
