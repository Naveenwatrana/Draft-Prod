import JobsTab from 'pages/company/Tab/JobsTab';
import { CompanyPageContainer, InfiniteScrollComponentContainer } from 'pages/company/style';
import { useEffect, useState } from 'react';
import useAladdinInteraction from 'common/services/Aladdin/useAladdinInteraction';
import { IInteractionEventValueType, IInteractionItemTypes, IInteractionTypes } from 'common/services/Aladdin/types';
import ActionSectionPublic from 'pages/pro/components/ActionSectionPublic';
import { useGetCompanyQuery } from 'pages/company/companyService';
import { useParams } from 'common/utils/router-fill';
import Loader from 'components/Loader/Loader';
import useCompany from 'common/hooks/useCompany';
import { ToastContainer } from 'react-toastify';
import { useCompanyJobListMutation } from 'pages/jobs/jobsService';
import { IFeedData } from 'pages/feed/types';
import InfiniteScrollComponent from 'components/InfiniteScroll/InfiniteScroll';
import lang from 'common/lang';
import { CompanyJobPageProps } from './types';
import CompanyNavbar from '../components/CompanyNavBar';

const { jobs: { status: { open } } } = lang;

const CompanyJobPage = ({ companyInfo, isOwnProfile }: CompanyJobPageProps) => {
  const { saveInteraction } = useAladdinInteraction();
  const params = useParams();
  const [skip, setSkip] = useState(true);
  const [page, setPage] = useState(1);
  const [jobs, setJobs] = useState<IFeedData[]>([]);
  const [hasNext, setHasNext] = useState<boolean>(true);
  const { currentCompany: userIsCompany } = useCompany();
  const { data: companyData, isLoading } = useGetCompanyQuery({
    companyName: params?.tab || userIsCompany?.username,
    company: userIsCompany?.username,
  }, {
    skip,
  });
  const company = (companyData?.data || companyInfo);
  // Aladdin interaction event
  useEffect(() => {
    if (companyInfo.id) {
      saveInteraction({
        itemId: company.id,
        itemType: IInteractionItemTypes.companies,
        eventType: IInteractionTypes.ViewPage,
        eventValue: IInteractionEventValueType.companyJobsTab,
      });
    }
  }, [
    company.id,
    // Needs to call only once
    // Therefore, no dependencies are needed
  ]);
  const [applicationList, result] = useCompanyJobListMutation();
  useEffect(() => {
    fetchJobsData();
  }, []);

  // Aladdin interaction event
  const fetchJobsData = () => {
    applicationList({
      id: company?.username,
      company: userIsCompany?.username,
      page,
      statusFilter: open,
    })
      .unwrap()
      .then((res) => {
        setJobs(res.data.data);
        setHasNext(!!res.data.next_page_url);
        setPage(res.data.current_page);
      }).catch(() => {
        setJobs([]);
        setHasNext(false);
        setPage(1);
      });
  };
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
      {(isLoading || result.isLoading) && <Loader />}
      <CompanyNavbar
        activeTab={3}
        data={{
          name: company?.name,
          username: company?.username,
          followersCount: company?.followers_count,
          followingsCount: company?.followings_count,
        }}
      />
      <InfiniteScrollComponentContainer id="infinite-scroll">
        <InfiniteScrollComponent
          data={jobs}
          fetchMoreData={fetchJobsData}
          hasMore={hasNext}
          scrollableTarget="infinite-scroll"
          showLoader={false}
        >
          <JobsTab jobs={jobs} />
        </InfiniteScrollComponent>
      </InfiniteScrollComponentContainer>
      {!isOwnProfile && (
        <ActionSectionPublic
          user={company}
          setSkip={() => setSkip(false)}
          profileType={IInteractionItemTypes.companies}
        />
      )}
    </CompanyPageContainer>
  );
};

export default CompanyJobPage;
