import { ProjectHeading } from 'components/Description/styles';
import { DividerComp } from 'components/Divider/styles';
import { CountContainer } from 'components/MultipleInputTextArea/style';
import { CrossIconWrapper } from 'pages/company/ActionSection/style';
import styled from 'styled-components';
import { StyledDescription } from 'components/Atoms/InfoBlock/style';
import { ModalContentContainerProps } from './types';

export const ModalContentWrapper = styled.div`
  position: absolute;
  top: 100px;
  padding-bottom: 100px;
  @media screen and (max-width: 768px) {
    padding-bottom: 0px;
    top: 0px;
    width: 100%;
  }
`;

export const ModalContentForm = styled.form<ModalContentContainerProps>`
  display: flex;
  flex-direction: column;
  gap: 24px;
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

export const ModalHeader = styled.div`
  color: ${({ theme }) => theme.palette.white[100].value};
  font-size: ${({ theme }) => theme.typography['24 semibold'].fontSize.value}px;
  font-weight: 500;
  line-height: 32px;
`;
