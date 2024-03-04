import Link from 'next/link';
import styled from 'styled-components';

export const TabsLayoutTabs = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 1px solid ${(props) => props.theme.palette.gray[40].value};
`;

export const Tabs = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TabsLayoutTab = styled(Link)`
  padding: 18px;
  cursor: pointer;
  height: calc(60px - 36px);
  border-bottom: 1px solid transparent;
  
  font-weight: ${(props) => props.theme.typography['16 semibold'].fontWeight};
  font-size: ${(props) => props.theme.typography['16 semibold'].fontSize.value}px;
  &.active {
    color: ${(props) => props.theme.palette.green[100].value};
    border-bottom: 1px solid ${(props) => props.theme.palette.green[100].value};
  }
`;
export const TabsLayoutContent = styled.div`
  display: flex;
  flex-direction: column;
`;
