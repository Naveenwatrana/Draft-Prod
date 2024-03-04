import styled from 'styled-components';
import { ContainerProps } from './types';

export const Container = styled.div<ContainerProps>`
  background-color: ${({ theme }) => theme.palette.gray['80'].value};
  height: max-content;
  min-height: calc(100vh - 70px);
  min-height: ${({ withoutBottomNav }) => withoutBottomNav ? 'calc(100vh - 70px)' : '100vh'} ;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const CreateOrganizationBody = styled.div`
  background-color: ${({ theme }) => theme.palette.gray['80'].value};
  border-bottom: 1px solid ${({ theme }) => theme.palette.gray['50'].value};
  margin: 0;
  flex: 1;
`;

export const CreateOrganizationPageText = styled.span`
  font-size: ${({ theme }) => theme.typography['16 semibold'].fontSize.value}px;
  font-weight: ${({ theme }) => theme.typography['16 semibold'].fontWeight};
  color: ${({ theme }) => theme.palette.white['100'].value};
  display: flex;
  align-items: center;
  gap: 13px;
  svg path {
    stroke: ${({ theme }) => theme.palette.gray['20'].value};
    cursor: pointer;
    stroke-width: 1.5;
  }
  svg {
    cursor: pointer;
  }
  display: flex;
  align-items: center;
  line-height: 28px;
  padding: 16px;
  border-bottom: solid 1px ${({ theme }) => theme.palette.gray[40].value};
  `;

export const StepsContainer = styled.div`
  padding: 16px;
  width: calc(100% - 32px);
  overflow-x: scroll;
  border-bottom: solid 1px ${({ theme }) => theme.palette.gray[40].value};
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;
