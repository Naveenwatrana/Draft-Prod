import TextComp from 'components/textComp';
import Input from 'components/input/SimpleInput';
import styled from 'styled-components';

export const HeadingText = styled(TextComp)`
  margin: 16px 0;
  font-weight: ${({ theme }) => theme.typography['24 semibold'].fontWeight};
  font-size: ${({ theme }) => theme.typography['24 semibold'].fontSize.value}px;
`;
export const DescriptionText = styled(TextComp)`
  margin: 16px 0;
  font-weight: ${({ theme }) => theme.typography['16 regular'].fontWeight};
  font-size: ${({ theme }) => theme.typography['16 regular'].fontSize.value}px;
  margin-bottom: 16px;
`;
export const TextInput = styled(Input)`
  border-radius: 16px;
  height: 22px;
`;
export const Content = styled.div`
  padding: 10px;
  height: 70%;
`;
export const InputWrapper = styled.div`
  @media (max-width: 768px) {
    text-align: center;
  }
`;
export const Buttons = styled.div`
  display: flex;
  position: fixed;
  width: calc(100% - 32px);
  bottom: 0;
  right: 8px;
  z-index: 1;
  border-top: 1px solid ${({ theme }) => theme.palette.gray['50'].value};
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
  justify-content: end;
  button:last-child {
    padding: 12px 68px;
  }
`;
