import TextComp from 'components/textComp';
import styled from 'styled-components';
import CancelIcon from 'components/Icons/CrossIcon';
import { DividerComp } from 'components/Divider/styles';

export const ActionSectionContainer = styled.div`
  width: fit-content;
  align-self: center;
  background: ${({ theme }) => theme.palette.gray[50].value};
  padding: 8px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.palette.gray[40].value};
  display: flex;
  gap: 8px;
  align-items: center;
  position: fixed;
  bottom: 16px;
  z-index: 2;
`;

export const FilledButton = styled.div`
  font-weight: ${({ theme }) => theme.typography['14 semibold'].fontWeight};
  font-size: ${({ theme }) => theme.typography['14 semibold'].fontSize.value}px;
  background: ${({ theme }) => theme.palette.green['80'].value};
  color: ${({ theme }) => theme.palette.gray['80'].value};
  width: fit-content;
  border-radius: 8px;
  padding: 12px 16px;
  cursor: pointer;
  svg:first-child path {
    stroke: ${({ theme }) => theme.palette.gray['80'].value};
    stroke-width: 2px;
  }
  display: flex;
  align-items: center;
  gap: 10px;
`;
export const FilledButtonIcon = styled(FilledButton)`
  padding: 11px;
  svg:first-child path {
    stroke-width: 1px;
  }
`;
export const AddButtons = styled(TextComp)``;

export const StyledButton = styled(FilledButton)`
  background-color: transparent;
  color: ${({ theme }) => theme.palette.green['80'].value};
  svg:first-child path {
    stroke: none;
  }
`;

export const ActionPopup = styled.div`
  display: flex;
  flex-direction: column;
  width: 386px;
  position: absolute;
  bottom: 70px;
  left: 0;
  z-index: 1;
  color: ${({ theme }) => theme.palette.white['100'].value};
  background: ${({ theme }) => theme.palette.gray['50'].value};
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.palette.gray['40'].value};
  box-shadow: 0px 6px 24px rgba(0, 0, 0, 0.4);
  @media screen and (max-width: 1023px) {
    bottom: 0rem;
    position: fixed;
    width: 100%;
    left: 0px;
    z-index: 9;
    padding-top: 56px;
    border-radius: 16px 16px 0px 0px;
    border-top: 1px solid ${({ theme }) => theme.palette.gray['40'].value};
  }
`;

export const CrossIconWrapper = styled(CancelIcon)`
  display: none;
  @media screen and (max-width: 1023px) {
    display: flex;
    position: absolute;
    right: 16px;
    top: 16px;
    path {
      stroke-width: 1;
    }
  }
`;

export const ActionPopupItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  gap: 16px;
  cursor: pointer;
  border-bottom: 1px solid ${({ theme }) => theme.palette.gray['40'].value};
  :hover {
    background: rgba(104, 225, 116, 0.05); // TODO: add color to theme
    border-radius: 6px;
  }
  svg {
    min-width: 40px;
  }
  :last-child{
    border: none;
  } 

`;

export const AddBlockWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const AddBlockTitle = styled.div`
  font-weight: ${({ theme }) => theme.typography['16 semibold'].fontWeight};
  font-size: ${({ theme }) => theme.typography['16 semibold'].fontSize.value}px;
  line-height: 26px;
  `;

export const AddBlockDesc = styled.div`
  font-weight: ${({ theme }) => theme.typography['14 regular'].fontWeight};
  font-size: ${({ theme }) => theme.typography['14 regular'].fontSize.value}px;
  line-height: 20px;
  color: ${({ theme }) => theme.palette.gray['10'].value};
`;

export const StyledFilterPopContainer = styled.div`
  position: absolute;
  overflow-y: auto;
  height: calc(100vh - 4px);
  width: 100%;
  div:last-child > ${DividerComp} {
    display: none;
  }
`;

export const StyledFilterPop = styled(ActionPopup)`
  top: 50%;
  height: max-content;
  padding: 24px;
  max-width: calc(100% - 50px);
  min-height: 44%;
  h3 {
    margin: 24px 0;
  }
  h6 {
    margin: 24px 0 8px;
    text-transform: uppercase;
    color: ${({ theme }) => theme.palette.gray[10].value};
  }
`;
