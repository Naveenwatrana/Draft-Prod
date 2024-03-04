import TextComp from 'components/textComp';
import styled from 'styled-components';
import { DividerComp } from 'components/Divider/styles';
import { StyledDescription } from 'components/Atoms/InfoBlock/style';
import { SidebarContainer } from '../SubSidebar/style';

export const Content = styled.div`
  display: flex;
  margin-left: 121px;
  width: 100%;
  @media screen and (max-width: 991px) {
    margin-left: 0;
    ${SidebarContainer} {
      display: none;
    }
  }
  ${DividerComp} {
    margin: 0;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
`;

export const PreferencesContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  padding: 42px 89px 105px;
  margin-left: 288px;
  @media screen and (max-width: 991px) {
    margin-left: 0;
    padding: 0;
  }
`;

export const PreferenceContainer = styled.div`
  display: flex;
  padding: 24px;
  flex-direction: column;
  gap: 24px;
  border-radius: 12px;
  background: ${({ theme }) => theme.palette.gray[60].value};
  ${StyledDescription} {
    border: 1px solid ${({ theme }) => theme.palette.gray[80].value};
    background: linear-gradient(
        90deg,
        rgba(227, 108, 253, 0.15) 4.71%,
        rgba(0, 88, 251, 0.15) 57.55%,
        rgba(46, 192, 251, 0.15) 100%
      ),
      ${({ theme }) => theme.palette.violet[100].value};
  }
`;

export const PreferenceChoiceTitle = styled(TextComp)`
  font-size: ${({ theme }) => theme.typography['16 semibold'].fontSize.value}px;
  font-weight: ${({ theme }) => theme.typography['16 semibold'].fontWeight};
  line-height: 24px;
`;

export const PreferenceChoiceSubTitle = styled(PreferenceChoiceTitle)`
  font-weight: 400;
  color: ${({ theme }) => theme.palette.gray[10].value};
`;

export const PreferenceSubText = styled.div`
  color: ${({ theme }) => theme.palette.gray[10].value};
  text-align: center;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-size: ${({ theme }) => theme.typography['14 regular'].fontSize.value}px;
  font-weight: ${({ theme }) => theme.typography['14 regular'].fontWeight};
  line-height: 20px;
`;
