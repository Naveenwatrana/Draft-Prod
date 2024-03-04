import { useIsMobile } from 'common/hooks/useIsMobile';
import { Container, MainContainer } from '../../../Insights/styles';
import Expertise from '../../../Insights/InsightsData/Expertise/Expertise';
import PrincipalBusinessActivity from '../../../Insights/InsightsData/PrincipalBusinessActivity/PrincipalBusinessActivity';
import Competitors from '../../../Insights/InsightsData/Competitors/Competitors';
import Investors from '../../../Insights/InsightsData/Investors';
import Funding from '../../../Insights/InsightsData/Funding/Funding';
import { IItechnologies, InsightsDataProps } from '../../../Insights/InsightsData/types';

const InsightsData = ({
  companyInfo,
}: InsightsDataProps) => {
  const isMobile = useIsMobile();
  const competitorList = JSON.parse(companyInfo.competitor_list);
  const listOfInvestors = JSON.parse(companyInfo.list_of_investors);
  const technologiesUsed: IItechnologies = JSON.parse(companyInfo.technologies_used);
  return (
    <Container isMobile={isMobile}>
      <MainContainer>
        <Expertise data={technologiesUsed} />
        <PrincipalBusinessActivity companyInfo={companyInfo} />
        <Competitors data={competitorList} />
        <Investors data={listOfInvestors} />
        <Funding companyInfo={companyInfo} />
      </MainContainer>
    </Container>
  );
};

export default InsightsData;
