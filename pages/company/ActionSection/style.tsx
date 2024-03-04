import TextComp from 'components/textComp';
import styled from 'styled-components';
import CancelIcon from 'components/Icons/CrossIcon';
import { IPositions } from 'components/Molecules/CreateContent/types';

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

export const StyledButton = styled(FilledButton)`
  background-color: transparent;
  color: ${({ theme }) => theme.palette.green['80'].value};
  svg:first-child path {
    stroke: none;
  }
`;

export const PopupOverlay = styled.div`
  @media screen and (max-width: 1023px) {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0.8;
    background-color: #2A282B;
    z-index: 1;
    cursor: pointer;
  }
`;

export const ActionPopup = styled.div<{ positions: IPositions }>`
  display: flex;
  flex-direction: column;
  right: ${({ positions }) => positions.right};
  top: ${({ positions }) => positions.top};
  width: 386px;
  position: absolute;
  bottom: ${({ positions }) => positions.bottom};
  left: ${({ positions }) => positions.left};
  z-index: 2;
  color: ${({ theme }) => theme.palette.white['100'].value};
  background: rgba(43,44,45,0.80);
  backdrop-filter: blur(16px);
  border-radius: 12px;
  border: 1px solid #39363B;
  box-shadow: 0px 6px 24px rgba(0, 0, 0, 0.4);
  padding: 8px;
  @media screen and (max-width: 1023px) {
    bottom: 0rem;
    position: fixed;
    width: 100%;
    left: 0px;
    z-index: 9;
    background: #121112;
    padding: 8px 0px;
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
  gap: 24px;
  cursor: pointer;
  :hover {
    background: #1E1C1F;
    border-radius: 6px;
  }
  svg {
    flex: 1
  }
  :last-child{
    border: none;
  } 

`;

export const AddBlockWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 4;
`;

export const AddBlockTitle = styled(TextComp)`
  font-weight: ${({ theme }) => theme.typography['16 semibold'].fontWeight};
  font-size: ${({ theme }) => theme.typography['16 semibold'].fontSize.value}px;
  line-height: 26px;
  `;

export const AddBlockDesc = styled(TextComp)`
  font-weight: ${({ theme }) => theme.typography['14 regular'].fontWeight};
  font-size: ${({ theme }) => theme.typography['14 regular'].fontSize.value}px;
  line-height: 20px;
  color: ${({ theme }) => theme.palette.gray['10'].value};
`;
