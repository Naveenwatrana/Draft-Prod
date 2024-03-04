import styled from 'styled-components';
import { Item } from 'components/Atoms/CheckboxSelect/style';
import { Divider } from 'pages/workspace/common/jobApplicationsDesktop/styles';

export const ListContainer = styled.div<{ isAuthor: boolean}>`
  width: 100%;
  background-color: #282629;
  box-shadow: 0px 0px 36.930233001708984px 0px #00000000;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
  border: 1px solid #39363B;
  &:hover {
    border: ${({ isAuthor }) => isAuthor ? '1px solid #39389F' : 'auto'};
  }
`;

export const Title = styled.span`
  color: ${({ theme }) => theme.palette.white[100].value};
  font-size: ${({ theme }) => theme.typography['16 semibold'].fontSize.value}px;
  font-weight: ${({ theme }) => theme.typography['16 semibold'].fontWeight};
  line-height: 22px;
`;
