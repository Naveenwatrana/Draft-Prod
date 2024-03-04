import styled from 'styled-components';
import Button from 'components/buttonComp';
import { Container } from '../../style';

export const InnerContainer = styled(Container)`
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  background: ${({ theme }) => theme.palette.gray[80].value};
`;

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 86%;
  height: 100%;
  & > div {
    padding-top: 80px;
  }
  @media screen and (max-height: 830px) {
    & > div {
      padding-top: 5px;
    }
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const Buttons = styled.div`
  display: flex;
  position: fixed;
  bottom: 0;
  right: 8px;
  z-index: 1;
  border-top: 1px solid ${({ theme }) => theme.palette.gray['50'].value};
  background-color: ${({ theme }) => theme.palette.gray['80'].value};
  @media screen and (max-width: 768px) {
    background-color: ${({ theme }) => theme.palette.gray['80'].value};
    width: calc(80% - 30px);
    justify-content: space-between;
    right: 0;
    padding-left: 100px;
  }
  flex-direction: column-reverse;
  padding: 16px;
  margin-top: 10px;
  gap: 16px;
  flex-direction: row;
  justify-content: space-between;
  width: calc(100% - 64px);
  button:last-child {
    padding: 12px 68px;
  }
`;
export const DiscardButton = styled(Button)`
  margin-right: 16px;
`;
