import { DarkGrayContainer } from 'components/Atoms/GrayContainer';
import TextComp from 'components/textComp';
import { InfoBlock } from 'components/Atoms/InfoBlock';
import lang from 'common/lang';
import { SkillTagLight } from 'pages/pro/components/WorkExperience/Experience/Content/style';
import { useIsMobile } from 'common/hooks/useIsMobile';
import { Container, LeftContainer, MainContainer } from '../styles';
import { SummaryInfo } from './style';
import Expertise from './Expertise/Expertise';
import PrincipalBusinessActivity from './PrincipalBusinessActivity/PrincipalBusinessActivity';
import Competitors from './Competitors/Competitors';
import Investors from './Investors';
import Funding from './Funding/Funding';
import { IItechnologies, InsightsDataProps } from './types';

const {
  summary,
  orgType,
  companyType,
  yearFounded,
  headcount,
  hq,
  website,
} = lang.orgInsightsTab;
const InsightsData = ({
  companyInfo,
}: InsightsDataProps) => {
  const isMobile = useIsMobile();
  const competitorList = JSON.parse(companyInfo.competitor_list);
  const listOfInvestors = JSON.parse(companyInfo.list_of_investors);
  const technologiesUsed: IItechnologies = JSON.parse(companyInfo.technologies_used);
  return (
    <Container isMobile={isMobile}>
      <LeftContainer isMobile={isMobile}>
        <DarkGrayContainer>
          <TextComp component="h2Small">{summary}</TextComp>
          <SummaryInfo>
            <InfoBlock title={orgType} info={<SkillTagLight>{companyInfo.type}</SkillTagLight>} />
            <InfoBlock title={companyType} info={companyInfo.company_type} />
            <InfoBlock title={yearFounded} info={companyInfo.year_founded} />
            <InfoBlock title={headcount} info={companyInfo.headcount} />
            <InfoBlock title={hq} info={companyInfo.hq_location} />
            <InfoBlock title={website} info={companyInfo.url} />
          </SummaryInfo>
        </DarkGrayContainer>
      </LeftContainer>
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
