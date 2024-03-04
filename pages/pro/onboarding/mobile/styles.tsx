import ButtonComp from 'components/buttonComp';
import TextComp from 'components/textComp';
import WordCounter from 'components/WordCounter/WordCounter';
import Image from 'next/image';
import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.palette.gray['80'].value};
  min-height: 100vh;
  padding: 0 30px;
  gap: 24px;
`;

export const NameForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 16px;
  margin: 20px 0;
  width: 100%;
  height: 100%;
  flex: 2 1;
`;

export const SubmitButton = styled(ButtonComp)`
  margin-top: auto;
`;

const ButtonPrimary = css`
  margin-top: auto;
`;

const ButtonSecondary = css`
  background: none;
  border: none;
  box-shadow: none;
  color: ${({ theme }) => theme.palette.green['80'].value};
`;

export const FormButton = styled(ButtonComp)<{ primary?: boolean }>`
  ${({ primary }) => (primary ? ButtonPrimary : ButtonSecondary)};
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  margin-bottom: 20px;
`;

export const NameWrapper = styled(TextComp)`
  background-color: ${({ theme }) => theme.palette.gray['100'].value};
  padding: 10px;
  border-radius: 12px 12px 0 0;
`;

export const FileInputBorder = styled.div<{ error: boolean }>`
  border: 1px dashed
    ${({ theme, error }) => error ? theme.palette.red['100'].value : theme.palette.gray['30'].value};
  height: 450px;
  border-top: ${({ error }) => error && '0px'};
`;

export const ErrorMessage = styled(TextComp)<{havingError: boolean}>`
  display: ${({ havingError }) => !havingError && 'none'};
  background-color: ${({ theme }) => theme.palette.red['100'].value};
  color: ${({ theme }) => theme.palette.white['100'].value};
  text-align: center;
  padding: 5px;
`;

export const FileInput = styled.input`
  display: 'none';
`;

export const Counter = styled(WordCounter)`
  align-self: flex-end;
`;

export const Disclaimer = styled(TextComp)`
  background-color: ${({ theme }) => theme.palette.violet['80'].value};
  padding: 10px;
  text-align: center;
  border-radius: 8px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 2;
  width: 100%;
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: auto;
  margin-bottom: 10px;
  gap: 10px;
  width: 100%;
`;

export const SkipButton = styled(ButtonComp)`
  color: ${({ theme }) => theme.palette.green['80'].value};
  background: none;
  box-shadow: none;
`;

export const Ongoing = styled.div`
  position: relative;
`;

export const ImageContainer = styled.div`
  height: 500px;
  background-size: cover;
  border-radius: 12px;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      180deg,
      ${({ theme }) => theme.palette.gray['100'].value} 10%,
      #1212145c 50%,
      ${({ theme }) => theme.palette.gray['100'].value} 100%
    );
    border-radius: 12px;
  }
`;

export const ImageContainerHeader = styled(TextComp)`
  background-color: ${({ theme }) => theme.palette.gray['100'].value};
  padding: 15px;
  border-radius: 12px 12px 0 0;
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`;

export const ImageView = styled(Image)`
  padding-top: 25px;
`;

export const Mantra = styled(TextComp)`
  font-size: 20px;
  position: absolute;
  top: 50px;
  left: 0;
  right: 0;
  height: fit-content;
  margin: auto;
  padding: 15px;
  z-index: 1;
  white-space: pre-wrap;
  overflow-wrap: break-word;
`;

export const ProjectItem = styled.div`
  position: absolute;
  top: 50px;
  left: 0;
  right: 0;
  height: fit-content;
  margin: auto;
  padding: 15px;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 5px;
  word-wrap: break-word;
`;

export const Company = styled(TextComp)`
  font-size: 14px;
  font-weight: 600;
`;

export const Role = styled(TextComp)`
  font-size: 14px;
  font-weight: 300;
`;

export const Duration = styled(TextComp)`
  font-size: 14px;
  font-weight: 300;
  opacity: 0.3;
`;

export const HeaderContainer = styled.div<{ success: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${({ success }) => (success ? 'flex-start' : 'center')};
  text-align: ${({ success }) => (success ? 'left' : 'center')};
  gap: ${({ success }) => (success ? '24px' : '30px')};
  margin-top: 20px;
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const ThumbsIconWrapper = styled.div`
  border-radius: 100%;
  background: radial-gradient(
    117.15% 117.14% at 62.14% -8.57%,
    ${({ theme }) => theme.palette.violet['80'].value} 0%,
    rgba(61, 63, 84, 0) 100%
  );
  padding: 20px;
`;

export const StepLineWrapper = styled.div`
  display: flex;
`;

export const StepLine = styled.div<{ active: boolean }>`
  width: 44px;
  height: 4px;
  background-color: ${({ theme, active }) => active ? theme.palette.white['100'].value : theme.palette.gray['40'].value};
  margin: 8px;
  background-color: colorWhite10;
`;
