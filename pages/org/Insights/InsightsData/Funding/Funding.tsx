import { DarkGrayContainer } from 'components/Atoms/GrayContainer';
import TextComp from 'components/textComp';
import Divider from 'components/Divider/Divider';
import lang from 'common/lang';
import { InfoBlock } from 'components/Atoms/InfoBlock';
import { FundingRoundHeading } from '../style';
import {
  CompanySummary,
  FundingDate, FundingRoundInfo, RoundData, RoundName,
} from './style';
import { ICompanyInsights, IFundingRoundClosed } from '../../types';

const {
  funding,
  fundingRoundClosed,
} = lang.orgInsightsTab;

export type FundingProps = {
  companyInfo: ICompanyInsights;
};
const Funding = ({ companyInfo }: FundingProps) => {
  const fundingRounds = `${companyInfo.number_of_funding_rounds ? companyInfo.number_of_funding_rounds : '0'}`;
  let fundingAmount = `${companyInfo.total_funding_amount ? companyInfo.total_funding_amount : '0'}`;
  const fundingRound: IFundingRoundClosed = JSON.parse(companyInfo.list_of_funding_rounds_closed);
  fundingAmount = parseInt(`${fundingAmount}`).toLocaleString();
  return (
    <DarkGrayContainer>
      <TextComp component="h2Small">{funding}</TextComp>
      <Divider />
      <CompanySummary>
        <InfoBlock title="Investment Rounds:" info={fundingRounds} />
        <InfoBlock title="Total Founding Amount" info={fundingAmount} />
        <InfoBlock title="Last Funding Announcement:" info={companyInfo.last_funding_announcement_date} />
        <InfoBlock title="Last Funding Announcement:" info={companyInfo.last_funding_announcement_date} />
      </CompanySummary>
      <InfoBlock title="Funding Stage:" info={companyInfo.last_funding_stage} />
      <FundingRoundHeading component="h5">{fundingRoundClosed}</FundingRoundHeading>
      <DarkGrayContainer>
        {fundingRound && Object.keys(fundingRound).map((round) => (
          <div key={round}>
            <FundingRoundInfo>
              <RoundName component="paragraph">
                Round
                {' '}
                {fundingRound[round].stage}
              </RoundName>
              <RoundData component="paragraph">{parseInt(fundingRound[round].amount).toLocaleString()}</RoundData>
              <FundingDate component="paragraph">{fundingRound[round].date}</FundingDate>
            </FundingRoundInfo>
            <Divider />
          </div>
        ))}
      </DarkGrayContainer>
    </DarkGrayContainer>
  );
};

export default Funding;
