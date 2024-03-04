import { ListItem } from 'components/NotificationsBox/styles';
import styled from 'styled-components';

type IconContainerProps = {
  active: boolean;
};

export const Container = styled.div`
  width: 604px;
  margin: auto;
  margin-top: 33px;
`;

export const Title = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-bottom: 24px;
`;

export const IconsContainer = styled.span`
  margin-left: auto;
  display: flex;
  gap: 8px;
`;

export const IconContainer = styled.span<IconContainerProps>`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  cursor: pointer;
  ${({ active, theme }) => active
    && `
    background: ${theme.palette.gray['50'].value};
    border: 1px solid ${theme.palette.gray['40'].value};
    `}
`;

export const List = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    padding-bottom: 60px;
    a:first-child {
        border-top: 1px solid ${({ theme }) => theme.palette.gray[40].value};
    }
    a:first-child:hover {
        border: none !important;
    }
    ${ListItem} {
        border-top: 1px solid ${({ theme }) => theme.palette.gray[40].value};
        border-bottom: none;
    }
    ${ListItem}:hover {
        border-radius: 12px;
    }
`;
