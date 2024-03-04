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
import ProfileBio from 'components/Organisms/ProfileBio';
import { PINS_TYPES } from 'common/types';
import { useInView } from 'react-intersection-observer';
import { useRouter } from 'next/router';
import { useIsMobile } from 'common/hooks/useIsMobile';
import lang from 'common/lang';
import {
  NavbarContainer, Wrapper, ActionContainer, UserName, NavbarFollowBtn, UserImage,
} from 'pages/org/[tab]/components/CompanyProfileLayout/style';
import BackIcon from 'components/Icons/BackIcon';
import { useAppSelector } from 'common/hooks/state';
import { selectCurrentCompany } from 'pages/account/authSlice';
import useFollow from 'common/hooks/useFollow';
import CompanyProfileLayout from '../../components/CompanyProfileLayout';
import { mergeCompanyData } from '../../../ContentPage/utils';
import { CompanyContentPageProps } from '../../../ContentPage/types';

const {
  followUsers: {
    follow, unFollow,
  },
} = lang;

const CompanyContentPage = ({ companyInfo, ownProfile }: CompanyContentPageProps) => {
  const params = useParams();
  const router = useRouter();
  const isMobile = useIsMobile();
  const {
    followCompany, companyResults,
  } = useFollow();
  const { saveInteraction } = useAladdinInteraction();
  const [skip, setSkip] = useState(true);
  const { currentCompany: userIsCompany } = useCompany();
  const { data: companyData, isLoading, isFetching } = useGetCompanyQuery({
    companyName: params?.tab || userIsCompany?.username,
    company: userIsCompany?.username,
  }, {
    skip,
  });
  const data = (companyData?.data || companyInfo);
  const company = useMemo(() => {
    return mergeCompanyData(companyInfo, companyData?.data, skip);
  }, [companyData?.data, companyInfo, skip]);
  useEffect(() => {
    if (company.id) {
      saveInteraction({
        itemId: company.id,
        itemType: IInteractionItemTypes.companies,
        eventType: IInteractionTypes.ViewPage,
        eventValue: IInteractionEventValueType.companyContentTab,
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
    followCompany(data?.id?.toString()?.toString());
    saveInteraction({
      itemId: data?.id?.toString()?.toString(),
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
                    <UserImage media={data?.cards?.[0]?.fields?.media || ''} />
                    <UserName>{data?.name}</UserName>
                  </ActionContainer>
                  {currentCompany?.id !== data?.id && (
                    <NavbarFollowBtn
                      onClick={handleFollowButton}
                      following={data?.followed}
                    >
                      {!data?.followed ? follow : unFollow}
                    </NavbarFollowBtn>
                  )}
                </Wrapper>
              )}
            </NavbarContainer>
          )}
            <ProfileBio
              ref={ref}
              media={data?.cards?.[0]?.fields?.media}
              title={data?.name}
              subtitle={data?.company_type}
              followers={data?.followers_count}
              following={data?.followings_count}
              setSkip={() => setSkip(false)}
              mantra={data?.cards?.[0]?.fields?.mantra}
              skills={[]}
              id={data?.id}
              isFollowing={data?.followed}
              itemType={IInteractionItemTypes.companies}
              pinType={PINS_TYPES.COMPANIES}
              isSaved={data?.saved}
              isLoading={isLoading || isFetching || companyResults.isLoading}
            />
          </>
        )
      }
      activeTab={2}
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

        <ContentTab userLinks={company?.links?.data || []} userArticles={company?.articles?.data} userPosts={company?.posts?.data} />
        {!ownProfile && (
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

export default CompanyContentPage;
