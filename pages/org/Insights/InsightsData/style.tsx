import TextComp from 'components/textComp';
import styled from 'styled-components';

export const SummaryInfo = styled.div`
  margin-top: 16px;
  gap: 9px;
  display: flex;
  flex-direction: column;
`;
export const DataContainer = styled.div`
  display: flex;
    flex-wrap: wrap;
    gap: 10px;
  & > p {
    width: calc(50% - 20px);
    @media screen and (max-width: 767px) {
      width: calc(100% - 20px);
    }
  }
`;
export const FundingRoundHeading = styled(TextComp)`
  padding: 16px 0;
`;
