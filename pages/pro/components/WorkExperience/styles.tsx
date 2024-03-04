import { DividerComp } from 'components/Divider/styles';
import { CountContainer } from 'components/MultipleInputTextArea/style';
import { ProjectHeading } from 'components/Description/styles';
import ButtonComp from 'components/buttonComp';
import styled from 'styled-components';
import { CrossIconWrapper } from '../ActionSection/style';

export const Wrapper = styled.div`
  position: absolute;
  top: 100px;
  padding-bottom: 100px;
  @media screen and (max-width: 768px) {
    padding-bottom: 0px;
    top: 0px;
    width: 100%;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 733px;
  padding: 32px;
  align-items: flex-start;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.palette.gray[40].value};
  background: ${({ theme }) => theme.palette.gray[80].value};
  box-shadow: 0px 24px 40px 0px rgba(0, 0, 0, 0.25);
  > * {
    width: 100%;
  }
  ${DividerComp} {
    margin: 0;
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 24px;
    ${ProjectHeading} {
      margin-bottom: 0;
    }
    ${CountContainer} {
      position: static;
    }
    width: 100%;
  }
  ${CrossIconWrapper} {
    display: none;
  }
  @media screen and (max-width: 768px) {
    width: calc(100% - 50px);
    padding: 24px;
    > * {
      width: calc(100% - 48px);
    }
    ${CrossIconWrapper} {
      display: block;
      position: absolute;
      right: 24px;
      max-width: 24px;
      top: 16px;
    }
  }
`;

export const ModalTitle = styled.div`
  color: ${({ theme }) => theme.palette.white[100].value};
  font-size: ${({ theme }) => theme.typography['24 semibold'].fontSize.value}px;
  font-weight: ${({ theme }) => theme.typography['24 semibold'].fontWeight};
  line-height: ${({ theme }) => theme.typography['24 semibold'].lineHeights.value}px;
`;

export const ModalSubTitle = styled.div`
  color: ${({ theme }) => theme.palette.gray[10].value};
  font-size: ${({ theme }) => theme.typography['16 regular'].fontSize.value}px;
  font-weight: ${({ theme }) => theme.typography['16 regular'].fontWeight};
  line-height: ${({ theme }) => theme.typography['16 regular'].lineHeights.value}px;
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

export const OngoingProject = styled.div`
  position: relative;
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

export const BackButton = styled(ButtonComp)`
  margin-left: 0;
  margin-right: auto;
`;

export const SkillsInputArea = styled.div`
  gap: 16px;
  display: flex;
  flex-direction: column;
`;
