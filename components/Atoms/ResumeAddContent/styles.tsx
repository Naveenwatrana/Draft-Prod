import styled from 'styled-components';
import { Card } from 'components/DefaultCard/styles';
import { DividerComp } from 'components/Divider/styles';
import { CountContainer } from 'components/MultipleInputTextArea/style';
import { CrossIconWrapper } from 'pages/pro/components/ActionSection/style';
import { ProjectHeading, WordCounterWrapper } from 'components/Description/styles';
import { StyledDescription } from '../InfoBlock/style';

export const Container = styled.div`
  background: ${({ theme }) => theme.palette.gray[80].value};
  display: flex;
  max-width: 1164px;
  gap: 60px;
  margin: 0 auto;
  width: 100%;
  @media screen and (max-width: 1023px) {
    max-height: 100%;
    flex-direction: column;
    padding: 0;
    ${Card} {
      width: 100%;
    }
  }
  padding: 68px 93px 0 141px;
  min-height: calc(100vh - 118px);
`;

export const PageContainer = styled(Container)`
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
    ${WordCounterWrapper} {
      right: 32px;
    }
    ${ProjectHeading} {
      margin-bottom: 0;
    }
    ${CountContainer} {
      position: static;
    }
  }
  ${CrossIconWrapper} {
    display: none;
  }
  ${StyledDescription} {
    margin-top: -8px;
  }
  @media screen and (max-width: 768px) {
    width: 100%;
    width: calc(100% - 50px);
    padding: 24px;
    ${CrossIconWrapper} {
      display: block;
      position: absolute;
      right: 24px;
      width: min-content;
      top: 16px;
    }
  }
`;
