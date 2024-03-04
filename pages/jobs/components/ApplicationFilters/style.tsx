import styled from 'styled-components';
import { Item } from 'components/Atoms/CheckboxSelect/style';
import { Divider } from 'pages/workspace/common/jobApplicationsDesktop/styles';

export const SidebarContainer = styled.div`
  display: flex;
  min-height: calc(100vh - 98px);
  padding: 16px 24px;
  flex-direction: column;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.palette.gray[60].value};
  width: 281px;
  position: fixed;
  h6 {
    color: rgba(255, 255, 255, 0.5);
    text-transform: uppercase;
    margin-bottom: 8px;
    margin-top: 2px;
  }
  ${Item} {
    padding: 8px 0;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

export const Title = styled.span`
  color: ${({ theme }) => theme.palette.white[100].value};
  font-size: ${({ theme }) => theme.typography['14 semibold'].fontSize.value}px;
  font-weight: ${({ theme }) => theme.typography['14 semibold'].fontWeight};
  line-height: 18px;
  margin-bottom: 8px;
`;

export const Subtitle = styled.span`
  color: ${({ theme }) => theme.palette.gray[20].value};
  font-size: ${({ theme }) => theme.typography['12 semibold'].fontSize.value}px;
  font-weight: ${({ theme }) => theme.typography['12 semibold'].fontWeight};
  line-height: 18px;
  margin-bottom: 8px;
`;

export const SectionDivider = styled(Divider)`
  width: 100%;
  margin: 3vh 0px;
`;

export const Skills = styled.div`
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin-bottom: 2vh;
`;
