import { ProjectHeading } from 'components/Description/styles';
import { DividerComp } from 'components/Divider/styles';
import { CountContainer } from 'components/MultipleInputTextArea/style';
import { CrossIconWrapper } from 'pages/company/ActionSection/style';
import styled from 'styled-components';
import { StyledDescription } from 'components/Atoms/InfoBlock/style';
import ChevronLeft from 'components/Icons/LeftChevron';
import { PublishButton } from 'pages/jobs/details/styles';
import { IconWrapper } from 'components/Atoms/IconWrapper';
import { TextArea } from 'components/inputComp/styles';
import { SkillsContainer } from 'components/Molecules/SkillsYouHave/styles';

export const ModalContent = styled.div<{width?: number}>`
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-height: 90vh;
  overflow-y: auto;
  width: ${({ width }) => `${width || 733}px`};
  padding: 32px;
  align-items: flex-start;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.palette.gray[40].value};
  background: ${({ theme }) => theme.palette.gray[80].value};
  box-shadow: 0px 24px 40px 0px rgba(0, 0, 0, 0.25);
  > * {
    width: 100%;
  }
  ${StyledDescription} {
    width: auto;
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
    ${CrossIconWrapper} {
      display: block;
      position: absolute;
      right: 24px;
      max-width: 24px;
      top: 16px;
    }
  }
`;

export const ModalContentHeader = styled.div`
    color: ${({ theme }) => theme.palette.white[100].value};
    font-size: ${({ theme }) => theme.typography['24 semibold'].fontSize.value}px;
    font-weight: 500;
    line-height: 32px;
    display: flex;
    align-items: center;
    gap: 16px;
    ${IconWrapper} {
        width: 44px;
        border-radius: 24px;
    }
`;

export const ModalSubText = styled.div`
    font-weight: ${({ theme }) => theme.typography['16 regular'].fontWeight};
    font-size: ${({ theme }) => theme.typography['16 regular'].fontSize.value}px;
    line-height: 22px;
    color: ${({ theme }) => theme.palette.gray[10].value};
`;

export const ModalText = styled.div`
    font-weight: ${({ theme }) => theme.typography['16 regular'].fontWeight};
    font-size: ${({ theme }) => theme.typography['16 regular'].fontSize.value}px;
    line-height: 22px;
    color: ${({ theme }) => theme.palette.gray[10].value};
`;

export const FormElement = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    
    ${TextArea} {
      height: 24px;
      border-radius: 16px;
    }
    ${SkillsContainer} {
      gap: 4px;
    }
`;

export const FormElementHeading = styled.div`
    font-weight: ${({ theme }) => theme.typography['12 semibold'].fontWeight};
    font-size: ${({ theme }) => theme.typography['12 semibold'].fontSize.value}px;
    line-height: 16px;
`;

export const LanguageTag = styled.div`
  border: solid 1px #FAFFB0;
  gap: 8px;
  border-radius: 24px;
  padding: 0 10px;
  display: flex;
  width: max-content;
  align-items: center;
  background-color: #FAFFB0;
  height: 30px;
  font-size: ${({ theme }) => theme.typography['14 semibold'].fontSize.value}px;
  font-weight: ${({ theme }) => theme.typography['14 semibold'].fontWeight};
  color: ${({ theme }) => theme.palette.gray[80].value};
  line-height: 16px;
`;

export const MainMenuElement = styled.div`
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
export const MainMenuText = styled.div`
    cursor: pointer;
    display: flex;
    gap: 4px;
    align-items: center;
`;

export const ChevronRight = styled(ChevronLeft)`
    transform: rotate(180deg);
`;

export const Buttons = styled.div`
  display: flex;
  gap: 32px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  ${PublishButton} {
    min-width: 185px;
    min-height: 44px;
  }
`;
