import styled from 'styled-components';
import { SelectDropdownProps } from './types';

export const SelectContainer = styled.div`
  display: flex;
  min-width: 240px;
  padding: 8px;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.palette.gray[20].value};
  background: ${({ theme }) => theme.palette.gray[50].value};
  box-shadow: 0px 6px 24px 0px rgba(0, 0, 0, 0.4); // TODO: add color
`;

export const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  align-self: stretch;
`;

export const Buttons = styled.div`
  display: flex;
  padding: 8px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  button {
    font-size: ${({ theme }) => theme.typography['12 semibold'].fontSize.value}px;
    font-weight: ${({ theme }) => theme.typography['12 semibold'].fontWeight};
  }
`;

export const Item = styled.div`
  display: flex;
  padding: 8px;
  align-items: flex-start;
  gap: 10px;
`;

export const CheckboxItem = styled(Item)`
  width: max-content;
  display: flex;
  align-items: center;
  cursor: pointer;
  label {
    position: relative;
    span {
      font-weight: 300;
    }
  }
`;
export const ItemCount = styled.span`
  position: absolute;
  right: 16px;
  font-size: ${({ theme }) => theme.typography['14 regular'].fontSize.value}px;
  font-weight: ${({ theme }) => theme.typography['14 regular'].fontWeight};
  color: ${({ theme }) => theme.palette.white[100].value}
`;

export const SelectedCount = styled.span`
  color: ${({ theme }) => theme.palette.gray[20].value};
  font-size: ${({ theme }) => theme.typography['12 semibold'].fontSize.value}px;
  font-weight: ${({ theme }) => theme.typography['12 semibold'].fontWeight};
  line-height: 18px;
`;

export const SelectDropdown = styled.div<SelectDropdownProps>`
  cursor: pointer;
  display: flex;
  width: 220px;
  padding: 12px;
  align-items: center;
  gap: 10px;
  border-radius: 8px;
  border: 1px solid
    ${({ theme, active }) => theme.palette.gray[active ? 20 : 40].value};
  background: ${({ theme }) => theme.palette.gray[50].value};
  font-size: ${({ theme }) => theme.typography['16 regular'].fontSize.value}px;
  font-weight: ${({ theme }) => theme.typography['16 regular'].fontWeight};
  line-height: 26px;
  position: relative;
  svg {
    position: absolute;
    right: 12px;
    transform: rotate(${({ active }) => active ? '180deg' : '0'});
  }
  color: ${({ theme }) => theme.palette.white[100].value}
`;
