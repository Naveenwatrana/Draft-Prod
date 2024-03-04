import TextComp from 'components/textComp';
import styled from 'styled-components';

export const FundingRoundInfo = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;
export const FundingDate = styled(TextComp)`
  color: ${({ theme }) => theme.palette.gray[20].value};
  width: 150px;
  text-align: right;
`;
export const RoundData = styled(TextComp)`
  width: 150px;
  text-align: center;
`;
export const RoundName = styled(TextComp)`
  width: 150px;
  text-align: left;
`;
export const CompanySummary = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 8px;
`;
