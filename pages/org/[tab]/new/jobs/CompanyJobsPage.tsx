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
import ProfileBio from 'components/Organisms/ProfileBio';
import { useInView } from 'react-intersection-observer';
import { PINS_TYPES } from 'common/types';
import {
  NavbarContainer, Wrapper, ActionContainer, UserName, NavbarFollowBtn, UserImage,
} from 'pages/org/[tab]/components/CompanyProfileLayout/style';
import { useRouter } from 'next/router';
import { useIsMobile } from 'common/hooks/useIsMobile';
import BackIcon from 'components/Icons/BackIcon';
import { useAppSelector } from 'common/hooks/state';
import { selectCurrentCompany } from 'pages/account/authSlice';
import useFollow from 'common/hooks/useFollow';
import CompanyProfileLayout from '../../components/CompanyProfileLayout';
import { CompanyJobPageProps } from '../../../JobsPage/types';

const {
  jobs: { status: { open } }, followUsers: {
    follow, unFollow,
  },
} = lang;

const CompanyJobPage = ({ companyInfo, isOwnProfile }: CompanyJobPageProps) => {
  const { saveInteraction } = useAladdinInteraction();
  const params = useParams();
  const router = useRouter();
  const isMobile = useIsMobile();
  const {
    followCompany, companyResults,
  } = useFollow();
  const [skip, setSkip] = useState(true);
  const [page, setPage] = useState(1);
  const [jobs, setJobs] = useState<IFeedData[]>([]);
  const [hasNext, setHasNext] = useState<boolean>(true);
  const { currentCompany: userIsCompany } = useCompany();
  const { data: companyData, isLoading, isFetching } = useGetCompanyQuery({
    companyName: params?.tab || userIsCompany?.username,
    company: userIsCompany?.username,
  }, {
    skip,
  });

  const company = (companyData?.data || companyInfo);
  useEffect(() => {
    if (company.id) {
      saveInteraction({
        itemId: company.id,
        itemType: IInteractionItemTypes.companies,
        eventType: IInteractionTypes.ViewPage,
        eventValue: IInteractionEventValueType.companyJobsTab,
      });
    }
  }, [company.id]);
  const [applicationList, result] = useCompanyJobListMutation();
  useEffect(() => {
    fetchJobsData();
  }, []);

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
  const [ref, inView] = useInView({
    threshold: 0,
    triggerOnce: false,
  });
  const handleBack = () => {
    router.back();
  };
  const currentCompany = useAppSelector(selectCurrentCompany);
  const handleFollowButton = () => {
    followCompany(company?.id?.toString()?.toString());
    saveInteraction({
      itemId: company?.id?.toString()?.toString(),
      itemType: IInteractionItemTypes.companies,
      eventType: IInteractionTypes.Follow,
    });
    setSkip(false);
  };

  return (
    <CompanyProfileLayout
      bio={
        (
          <>
            {isMobile
          && (
            <NavbarContainer withBorder={!inView}>
              <BackIcon onClick={handleBack} />
              {!inView && (
                <Wrapper>
                  <ActionContainer>
                    <UserImage media={company?.cards?.[0]?.fields?.media || ''} />
                    <UserName>{company?.name}</UserName>
                  </ActionContainer>
                  {currentCompany?.id !== company?.id && (
                    <NavbarFollowBtn
                      onClick={handleFollowButton}
                      following={company?.followed}
                    >
                      {!company?.followed ? follow : unFollow}
                    </NavbarFollowBtn>
                  )}
                </Wrapper>
              )}
            </NavbarContainer>
          )}
            <ProfileBio
              ref={ref}
              media={company?.cards?.[0]?.fields?.media}
              title={company?.name}
              subtitle={company?.company_type}
              followers={company?.followers_count}
              following={company?.followings_count}
              setSkip={() => setSkip(false)}
              mantra={company?.cards?.[0]?.fields?.mantra}
              skills={[]}
              id={company?.id}
              isFollowing={company?.followed}
              itemType={IInteractionItemTypes.companies}
              pinType={PINS_TYPES.COMPANIES}
              isSaved={company?.saved}
              isLoading={isLoading || isFetching || companyResults.isLoading}
            />
          </>
        )
      }
      activeTab={3}
    >
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

    </CompanyProfileLayout>
  );
};

export default CompanyJobPage;
