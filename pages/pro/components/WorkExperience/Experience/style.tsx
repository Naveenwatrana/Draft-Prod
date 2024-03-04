import { DividerComp } from 'components/Divider/styles';
import { ActionIconsContainer } from 'pages/pro/styles';
import styled from 'styled-components';
type ContainerProps = {
  showProject? : boolean;
}

export const Container = styled.div<ContainerProps>`
  color: ${({ theme }) => theme.palette.white[100].value};
  border-radius: ${({ showProject }) => showProject ? '8px 8px 0 0' : '8px'};
  background: ${({ theme }) => theme.palette.gray[60].value};
  border: 1px solid ${({ theme }) => theme.palette.gray[40].value};
  padding: 24px;
  gap: 24px;
  display: flex;
  flex-direction: column;
  position: relative;
  :hover {
    background: ${({ theme }) => theme.palette.gray['50'].value};
  }
  @media screen and (min-width: 1023px) {
    :hover {
      ${ActionIconsContainer} {
        display: flex;
      }
    }
  }
  `;

export const ExperienceWrapper = styled.div`
  width: 100%;
`;

export const StyledDivider = styled(DividerComp)`
  width: calc(100% + 48px);
  margin: 0;
  margin-left: -24px;
  `;

export const HideButtonContainer = styled.div`
  cursor: pointer;
  background-color: ${({ theme }) => theme.palette.gray[60].value};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 48px;
  border: 1px solid ${({ theme }) => theme.palette.gray[40].value};
  border-radius: 0 0 8px 8px;
  button {
    font-size: ${({ theme }) => theme.typography['12 regular'].fontSize.value}px;
  }
`;

export const ShowButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  button {
    margin-bottom: -12px;
    line-height: 24px;
    font-size: ${({ theme }) => theme.typography['12 regular'].fontSize.value}px;
    div {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
    }
  }
`;
