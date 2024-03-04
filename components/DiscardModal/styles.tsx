import TextComp from 'components/textComp';
import styled from 'styled-components';
import { DividerProps } from './types';

export const Container = styled.div`
    display: flex;
    width: 400px;
    background-color: #171718;
    flex-direction: column;
    border-radius: 12px;
    padding: 32px;
    margin: 0 auto;
    text-align: left;
`;
export const Title = styled(TextComp)`
    font-weight: ${({ theme }) => theme.typography['24 semibold'].fontWeight};
    font-size: ${({ theme }) => theme.typography['24 semibold'].fontSize.value}px;
    margin-bottom: 16px;

`;
export const Description = styled(TextComp)`
    font-weight: ${({ theme }) => theme.typography['16 regular'].fontWeight};
    font-size: ${({ theme }) => theme.typography['16 regular'].fontSize.value}px;
    margin-bottom: 24px;
`;
export const Divider = styled.div<DividerProps>`
    background-color: ${({ theme, bgColor }) => bgColor ? bgColor : theme.palette.gray[40].value};
    height: 1px;
    width: 100%;
    margin-bottom: ${({ marginBottom }) => marginBottom ? marginBottom : 24}px;
    margin-top: ${({ marginTop }) => marginTop ? marginTop : 0}px;
`;
export const Buttons = styled.div`
  display: flex;
  justify-content: end;
  grid-gap: 16px;
  @media screen and (max-width: 768px) {
    flex-direction: column-reverse;
    gap: 16px;
    button {
        height: 44px;
    }
    button:last-child {
      background: rgba(233, 32, 38, 0.150) /* TODO: Add Color */;
      color: ${({ theme }) => theme.palette.red[110].value};
    }
  }
`;
