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
import ProfileBio from 'components/Organisms/ProfileBio';
import { PINS_TYPES } from 'common/types';
import { useInView } from 'react-intersection-observer';
import {
  NavbarContainer, Wrapper, ActionContainer, UserName, NavbarFollowBtn, UserImage,
} from 'pages/org/[tab]/components/CompanyProfileLayout/style';
import { useIsMobile } from 'common/hooks/useIsMobile';
import BackIcon from 'components/Icons/BackIcon';
import { useRouter } from 'next/router';
import lang from 'common/lang';
import { useAppSelector } from 'common/hooks/state';
import { selectCurrentCompany } from 'pages/account/authSlice';
import useFollow from 'common/hooks/useFollow';
import { InsightsJobPageProps } from '../../../Insights/types';
import InsightsDataFetching from '../../../Insights/InsightsDataFetching';
import InsightsData from './InsightsData';
import CompanyProfileLayout from '../../components/CompanyProfileLayout';

const {
  followUsers: {
    follow, unFollow,
  },
} = lang;

const InsightsJobPage = ({ companyInfo, isOwnProfile }: InsightsJobPageProps) => {
  const { saveInteraction } = useAladdinInteraction();
  const params = useParams();
  const router = useRouter();
  const isMobile = useIsMobile();
  const {
    followCompany, companyResults,
  } = useFollow();
  const [skip, setSkip] = useState(true);
  const { currentCompany: userIsCompany } = useCompany();
  const { data: companyData, isLoading, isFetching } = useGetCompanyQuery({
    companyName: params?.tab || userIsCompany?.username,
    company: userIsCompany?.username,
  }, {
    skip,
  });
  const company = (companyData?.data || companyInfo);
  const dataIsFetching = !company.insights_fetched;
  useEffect(() => {
    if (company.id) {
      saveInteraction({
        itemId: company.id,
        itemType: IInteractionItemTypes.companies,
        eventType: IInteractionTypes.ViewPage,
        eventValue: IInteractionEventValueType.companyInsightsTab,
      });
    }
  }, [company.id]);
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
      activeTab={1}
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
        {isLoading && <Loader />}
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
    </CompanyProfileLayout>
  );
};

export default InsightsJobPage;
