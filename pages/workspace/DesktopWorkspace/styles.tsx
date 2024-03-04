import styled from 'styled-components';

type Props= {
    selected: boolean;
};
type CollapsibleMenuItemProps = {
    active: boolean;
}
export const Container = styled.div`
    background-color: ${(props) => props.theme.palette.gray[80].value};
    height: 100%;
    display: flex;
`;

export const SideBar = styled.div`
    border-right: 1px solid ${({ theme }) => theme.palette.gray[40].value};
    background: ${({ theme }) => theme.palette.gray[60].value};
    width: max-content;
    padding: 16px;
    min-height: calc(100vh - 98px);
    position: fixed;
    min-width: 88px;
`;

export const SideBarItem = styled.div<Props>`
    font-weight: ${(props) => props.theme.typography['14 regular'].fontWeight};
    font-size: ${(props) => props.theme.typography['14 regular'].fontSize.value}px;
    color: ${(props) => props.theme.palette.white['100'].value};
    background-color: ${(props) => props.selected ? props.theme.palette.gray['50'].value : ''};
    margin: 4px 0;
    padding: 12px 4px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 300ms;
`;

export const IconWrapper = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

export const Content = styled.div`
    flex: 4.5;
    display: flex;
    justify-content: center;
    padding: 16px;
    margin-left: 150px;
`;

export const JobContent = styled.div`
    width: 100%;
    height: 85%;
`;

export const CollapsibleMenuItem = styled.div<CollapsibleMenuItemProps>`
  &:nth-child(2) {
    margin-top: 0.5rem;
  }
  background-color: ${({ theme, active }) => active && theme.palette.gray[50].value};
  border-radius: 0.5rem;
  padding: 0.5rem;
  font-weight: 300;
  font-size: 14px;
  line-height: 20px;
  transition: all 300ms;
`;
