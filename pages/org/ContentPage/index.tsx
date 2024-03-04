import ContentTab from 'pages/company/Tab/ContentTab';
import { CompanyPageContainer } from 'pages/company/style';
import { useParams } from 'common/utils/router-fill';
import ActionSectionPublic from 'pages/pro/components/ActionSectionPublic';
import useAladdinInteraction from 'common/services/Aladdin/useAladdinInteraction';
import { IInteractionEventValueType, IInteractionItemTypes, IInteractionTypes } from 'common/services/Aladdin/types';
import { useEffect, useMemo, useState } from 'react';
import useCompany from 'common/hooks/useCompany';
import { useGetCompanyQuery } from 'pages/company/companyService';
import Loader from 'components/Loader/Loader';
import { ToastContainer } from 'react-toastify';
import CompanyNavbar from '../components/CompanyNavBar';
import { CompanyContentPageProps } from './types';
import { mergeCompanyData } from './utils';

const CompanyContentPage = ({ companyInfo, ownProfile }: CompanyContentPageProps) => {
  const params = useParams();
  const { saveInteraction } = useAladdinInteraction();
  const [skip, setSkip] = useState(true);
  const { currentCompany: userIsCompany } = useCompany();
  const { data: companyData, isLoading } = useGetCompanyQuery({
    companyName: params?.tab || userIsCompany?.username,
    company: userIsCompany?.username,
  }, {
    skip,
  });
  const company = useMemo(() => {
    return mergeCompanyData(companyInfo, companyData?.data, skip);
  }, [companyData?.data, companyInfo, skip]);
  // Aladdin interaction event
  useEffect(() => {
    if (company.id) {
      saveInteraction({
        itemId: company.id,
        itemType: IInteractionItemTypes.companies,
        eventType: IInteractionTypes.ViewPage,
        eventValue: IInteractionEventValueType.companyContentTab,
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
        activeTab={2}
        data={{
          followersCount: company?.followers_count,
          followingsCount: company?.followings_count,
          username: (params?.tab as string) || '',
          name: (params?.tab as string) || '',
        }}
      />
      <ContentTab userLinks={company?.links?.data || []} userArticles={company?.articles?.data} userPosts={company?.posts?.data} />
      {!ownProfile && (
        <ActionSectionPublic
          user={company}
          setSkip={() => setSkip(false)}
          profileType={IInteractionItemTypes.companies}
        />
      )}
    </CompanyPageContainer>
  );
};

export default CompanyContentPage;
