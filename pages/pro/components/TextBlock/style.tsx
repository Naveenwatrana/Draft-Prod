import { Textarea } from 'components/Description/styles';
import { DividerComp } from 'components/Divider/styles';
import ButtonComp from 'components/buttonComp';
import InputComp from 'components/inputComp';
import TextComp from 'components/textComp';
import styled from 'styled-components';

export const EditName = styled(TextComp)`
  color: ${(props) => props.theme.palette.white['100'].value};
  margin-bottom: 30px;
  font-family: ${({ theme }) => theme.defaultFont};
`;

export const LabelText = styled(TextComp)`
  margin-bottom: 4px;
`;

export const SubmitButton = styled(ButtonComp)`
  width: 148px;
  :disabled {
    background-color: ${({ theme }) => theme.palette.green[15].value};
  }
`;

export const SkipButton = styled(ButtonComp)`
  margin-right: 36px;
  color: ${(props) => props.theme.palette.green['80'].value};
  background: none;
  margin-right: 36px;
`;
export const ButtonGroup = styled.div`
  display: flex;
  justify-content: end;
`;
export const ButtonGroupDeleteModal = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 24px;
  gap: 32px;
  width: 100%;
  button {
    width: 100%;
  }
  @media screen and (min-width: 1023px) {
    gap: 0px;
    button {
      max-width: 179px;
      font-size: 14px;
    }
    flex-direction: row-reverse;
  }
`;

export const Container = styled.div`
  background-color: ${(props) => props.theme.palette.gray['80'].value};
  padding: 32px;
  border-radius: 4px;
  width: 669px;
  margin: 0 auto;
  min-height: 537px;
  border: 1px solid ${(props) => props.theme.palette.gray['40'].value};
  border-radius: 12px;
  box-shadow: 0px 24px 40px rgba(0, 0, 0, 0.25);
  margin-bottom: 50px;

  ${DividerComp} {
    margin: 0;
  }

  
  @media screen and (max-width: 1023px) {
    ${Textarea} {
      height: 400px;
      max-height: 40vh;
      @media screen and (max-height: 844px) {
        max-height: 20vh;
      }
    }
    height: calc(100% - 50px);
    max-height: calc(100vh - 65px);
    border-radius: 0;
    margin-bottom: 0;
    padding: 36px 24px 24px;
    flex-direction: column;
    display: flex;
    width: calc(100% - 32px);
    max-width: calc(100% - 32px);
  }
`;

export const DeleteModalContainer = styled(Container)`
  width: 352px;
  min-height: unset;
  height: 264px;
  padding: 24px;
  align-items: center;
  display: flex;
  flex-direction: column;
  ${EditName} {
    text-align: center;
  }
  @media screen and (min-width: 1023px) {
    height: auto;
    width: 385px;
    padding: 32px;
    ${SkipButton} {
      margin-left: 32px;
    }
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media screen and (max-width: 768px) {
    justify-content: space-between;
    gap: 16px;
    margin: 20px 0;
    height: 100%;
  }
`;

export const TitleComp = styled(InputComp)`
  height: 22px;
`;
