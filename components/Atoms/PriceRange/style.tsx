import styled from 'styled-components';
import { ErrorText } from 'components/inputComp/styles';
import TextComp from 'components/textComp';
import { ContainerProps } from './type';

export const Container = styled.div<ContainerProps>`
  display: flex;
  position: relative;
  width: 100%;
  ${ErrorText} {
    position: absolute;
    bottom: 0;
    right: 0;
  }
  ${({ error, theme }) => error
    && `
    > * {
      border-color: ${theme.palette.red[100].value} !important;
    }
    padding-bottom: 16px;
  `}
  `;

export const Label = styled.div`
  height: 26px;
  width: 54px;
  align-items: center;
  justify-content: center;
  display: flex;
  border: 1px solid ${({ theme }) => theme.palette.gray[40].value};
  color: ${({ theme }) => theme.palette.white[100].value};
  background-color: transparent;
  padding: 12px;
  border-radius: 8px 0px 0px 8px;
`;

export const InputContainer = styled.div`
  display: flex;
  gap: 4px;
  flex: 1 0 0;
  border-radius: 0 8px 8px 0;
  border: 1px solid ${({ theme }) => theme.palette.gray[40].value};
  background-color: ${({ theme }) => theme.palette.gray[50].value};
  height: 50px;
  align-items: center;
  justify-content: space-around;
  color: ${({ theme }) => theme.palette.white[100].value};
  span {
    color: ${({ theme }) => theme.palette.gray[20].value};
  }
`;

export const Input = styled.input`
  background-color: ${({ theme }) => theme.palette.gray[50].value};
  color: ${({ theme }) => theme.palette.white[100].value};
  border: none;
  outline: none;
  font-size: 16px;
  font-weight: 400;
  text-align: center;
  @media screen and (max-width: 768px) {
    width: 100px;
  }
`;

export const InputLabel = styled(TextComp)`
  font-size: ${({ theme }) => theme.typography['12 semibold'].fontSize.value}px;
  font-weight: ${({ theme }) => theme.typography['12 semibold'].fontWeight};
  line-height: 18px;
`;

export const PriceInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  ${InputContainer} {
    justify-content: flex-start;
    padding-left: 12px;
    ${Input} {
      text-align: start;
    }
  }
`;
