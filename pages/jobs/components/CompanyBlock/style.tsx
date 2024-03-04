import styled from 'styled-components';
import { Item } from 'components/Atoms/CheckboxSelect/style';
import { Divider } from 'pages/workspace/common/jobApplicationsDesktop/styles';

export const CompanyContainer = styled.div`
  width: 100%;
  background-color: #282629;
  box-shadow: 0px 0px 36.930233001708984px 0px #00000000;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px;
  border: 1px solid #39363B
`;

export const CompanyInfoContainer = styled.div`
  display: flex;
  gap: 16px;
`;

export const CompanyNameContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const CompanyHighLightContainer = styled.div`
  display: flex;
`;

export const CompanyHighLightDiv = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 24px;
`;

export const CompanyHighlight = styled.div`
  display: flex;
  gap: 16px;
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
