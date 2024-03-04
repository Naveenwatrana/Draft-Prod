import { CompanyPageContainer } from 'pages/company/style';
import useAladdinInteraction from 'common/services/Aladdin/useAladdinInteraction';
import { useEffect, useState } from 'react';
import { IInteractionEventValueType, IInteractionItemTypes, IInteractionTypes } from 'common/services/Aladdin/types';
import ActionSectionPublic from 'pages/pro/components/ActionSectionPublic';
import { useParams } from 'common/utils/router-fill';
import useCompany from 'common/hooks/useCompany';
import { useGetCompanyQuery } from 'pages/company/companyService';
import Loader from 'components/Loader/Loader';
import { ToastContainer } from 'react-toastify';
import CompanyNavbar from '../components/CompanyNavBar';
import { InsightsJobPageProps } from './types';
import InsightsDataFetching from './InsightsDataFetching';
import InsightsData from './InsightsData';

const InsightsJobPage = ({ companyInfo, isOwnProfile }: InsightsJobPageProps) => {
  const { saveInteraction } = useAladdinInteraction();
  const params = useParams();
  const [skip, setSkip] = useState(true);
  const { currentCompany: userIsCompany } = useCompany();
  const { data: companyData, isLoading } = useGetCompanyQuery({
    companyName: params?.tab?.[0] || userIsCompany?.username,
    company: userIsCompany?.username,
  }, {
    skip,
  });
  const company = (companyData?.data || companyInfo);
  const dataIsFetching = !company.insights_fetched;
  // Aladdin interaction event
  useEffect(() => {
    if (company.id) {
      saveInteraction({
        itemId: company.id,
        itemType: IInteractionItemTypes.companies,
        eventType: IInteractionTypes.ViewPage,
        eventValue: IInteractionEventValueType.companyInsightsTab,
      });
    }
  }, [
    company.id,
    // Needs to call only once
    // Therefore, no dependencies are needed
  ]);
  // Aladdin interaction event
  return (
    <CompanyPageContainer>
      <ToastContainer
        position="top-center"
        hideProgressBar
        style={{
          width: '100%',
          maxWidth: '906px',
        }}
      />
      {isLoading && <Loader />}
      <CompanyNavbar
        activeTab={4}
        data={{
          name: company?.name,
          username: company?.username,
          followersCount: company?.followers_count,
          followingsCount: company?.followings_count,
        }}
      />
      {!isOwnProfile && (
        <ActionSectionPublic
          user={company}
          setSkip={() => setSkip(false)}
          profileType={IInteractionItemTypes.companies}
        />
      )}
      {dataIsFetching && <InsightsDataFetching />}
      {!dataIsFetching && <InsightsData companyInfo={company} />}
    </CompanyPageContainer>
  );
};

export default InsightsJobPage;
