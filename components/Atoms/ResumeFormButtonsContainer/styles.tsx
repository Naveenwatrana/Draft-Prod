import ButtonComp from 'components/buttonComp';
import styled from 'styled-components';

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: auto;
  margin-bottom: 10px;
  gap: 10px;
  width: 100%;
`;
export const Buttons = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  margin-top: 10px;
  button {
    max-width: 184px;
  }
  button:last-child {
    width: 100%;
  }
  @media screen and (min-width: 768px) {
    flex-direction: row;
    justify-content: end;
    gap: 12px;
  }
  gap: 24px;
`;
export const SaveButton = styled(ButtonComp)`
  @media screen and (min-width: 768px) {
    margin-left: 32px;
    padding-left: 69px;
    padding-right: 69px;
  }
  :disabled {
    background: rgba(104, 225, 116, 0.15); // TODO: Add color
    color: ${({ theme }) => theme.palette.gray[80].value};
  }
`;

export const DateField = styled.div`
  & > * {
    width: 100%;
  }
  gap: 16px;
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 1023px) {
    & > * {
      width: 48%;
    }
    flex-direction: row;
    display: flex;
    justify-content: space-between;
  }
`;

export const BackButton = styled(ButtonComp)`
  margin-left: 0;
  margin-right: auto;
`;
