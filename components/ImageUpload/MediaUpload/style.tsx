import styled from 'styled-components';
import { ImageUploadInputProps } from '../types';

export const ErrorToast = styled.div`
  display: flex;
  padding: 12px 8px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  align-self: stretch;
  border-radius: 32px;
  font-size: ${({ theme }) => theme.typography['12 regular'].fontSize.value}px;
  font-weight: 500;
  line-height: 18px;
  background: ${({ theme }) => theme.palette.red[100].value};
`;

export const Container = styled.div`
  display: flex;
  width: 100%;
  min-width: max-content;
  height: 480px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 24px;
  flex-shrink: 0;
  text-align: center;
  align-items: center;
  height: 100%;
  @media screen and (max-height: 768px) {
    min-width: auto;
  }
`;

export const InputContainer = styled.div<ImageUploadInputProps>`
  border-radius: 12px;
  border: 1px solid #39363b; // TODO: Add Color
  background: #282629; // TODO: Add Color
  display: flex;
  padding: 12px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 32px;
  flex: 1 0 0;
  align-self: stretch;
  
  ${({ error, theme }) => error
    && `
    border-color: ${theme.palette.red[100].value};
    border-style: dashed;
  `}
  @media screen and (max-width: 992px) {
    background: transparent;
    border: none;
    flex: none;
    button {
      background-color: #99E662; // TODO: Add Color
      width: 175px;
      color: #121212; // TODO: Add Color
      font-size: ${({ theme }) => theme.typography['14 regular'].fontSize.value}px;
      font-weight: 500;
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;

export const SelectTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

export const SelectText = styled.div`
  text-align: center;
  line-height: 22px;
`;

export const SelectSubText = styled(SelectText)`
  color: #a69dab; // TODO: Add Color
  font-size: ${({ theme }) => theme.typography['14 regular'].fontSize.value}px;
  line-height: 20px;
`;

export const InfoText = styled(SelectSubText)`
  font-size: ${({ theme }) => theme.typography['12 regular'].fontSize.value}px;
  line-height: 30px;
  @media screen and (max-width: 992px) {
    line-height: 16px;
  }
`;

export const FileSpecificationText = styled(SelectSubText)`
  color: #99E662; // TODO: Add Color
  cursor: pointer;
  font-weight: 500;
`;

export const FooterContainer = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 36px;
  div {
    line-height: 16px;
  }
`;
