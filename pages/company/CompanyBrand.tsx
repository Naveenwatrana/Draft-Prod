import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'common/hooks/state';
import { useParams } from 'common/utils/router-fill';
import Loader from 'components/Loader/Loader';
import { setIsCurrentUser } from 'pages/pro/profileSlice';
import useCompany from 'common/hooks/useCompany';
import useAladdinInteraction from 'common/services/Aladdin/useAladdinInteraction';
import { useInView } from 'react-intersection-observer';
import { PINS_TYPES } from 'common/types';
import CompanyProfileLayout from 'pages/org/[tab]/components/CompanyProfileLayout';
import ProfileBio from 'components/Organisms/ProfileBio';
import { IInteractionEventValueType, IInteractionItemTypes, IInteractionTypes } from 'common/services/Aladdin/types';
import { useIsMobile } from 'common/hooks/useIsMobile';
import {
  NavbarContainer, Wrapper, ActionContainer, UserName, NavbarFollowBtn, UserImage,
} from 'pages/org/[tab]/components/CompanyProfileLayout/style';
import BackIcon from 'components/Icons/BackIcon';
import { useRouter } from 'next/router';
import { selectCurrentCompany } from 'pages/account/authSlice';
import useFollow from 'common/hooks/useFollow';
import lang from 'common/lang';
import {
  CompanyPageContainer,
  DetailsContainer,
} from './style';
import { useGetCompanyQuery } from './companyService';
import { CompanyProps } from './types';
import Blocks from './Blocks';
import ActionSection from './ActionSection';

const {
  followUsers: {
    follow, unFollow,
  },
} = lang;

const CompanyBrand = ({
  companyInfo, isOwnProfile,
}: CompanyProps) => {
  const [skip, setSkip] = useState(true);
  const router = useRouter();
  const params = useParams();
  const dispatch = useAppDispatch();
  const isMobile = useIsMobile();
  const {
    followCompany, companyResults,
  } = useFollow();
  const { saveInteraction } = useAladdinInteraction();
  const { currentCompany: userIsCompany } = useCompany();

  useEffect(() => {
    dispatch(
      setIsCurrentUser(
        userIsCompany?.username === params.username || !params.username,
      ),
    );
  }, [userIsCompany, params, dispatch]);

  const { data: companyData, isLoading, isFetching } = useGetCompanyQuery({
    companyName: params?.tab || userIsCompany?.username,
    company: userIsCompany?.username,
  }, {
    skip,
  });
  const data = (companyData || companyInfo);

  useEffect(() => {
    if (data.data?.id) {
      saveInteraction({
        itemId: data.data.id,
        itemType: IInteractionItemTypes.companies,
        eventType: IInteractionTypes.ViewPage,
        eventValue: IInteractionEventValueType.brandTab,
      });
      saveInteraction({
        itemId: data.data.id,
        itemType: IInteractionItemTypes.companies,
        eventType: IInteractionTypes.ViewCard,
        eventValue: IInteractionEventValueType.viewFirstCard,
      });
    }
  }, [
    data.data?.id,
  ]);
  const [ref, inView] = useInView({
    threshold: 0,
    triggerOnce: false,
  });
  const handleBack = () => {
    router.back();
  };
  const currentCompany = useAppSelector(selectCurrentCompany);
  const handleFollowButton = () => {
    followCompany(data?.data?.id?.toString()?.toString());
    saveInteraction({
      itemId: data?.data?.id?.toString()?.toString(),
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
                    <UserImage media={data?.data?.cards?.[0]?.fields?.media || ''} />
                    <UserName>{data?.data?.name}</UserName>
                  </ActionContainer>
                  {currentCompany?.id !== data?.data?.id && (
                    <NavbarFollowBtn
                      onClick={handleFollowButton}
                      following={data?.data?.followed}
                    >
                      {!data?.data?.followed ? follow : unFollow}
                    </NavbarFollowBtn>
                  )}
                </Wrapper>
              )}
            </NavbarContainer>
          )}
            <ProfileBio
              ref={ref}
              media={data?.data?.cards?.[0]?.fields?.media}
              title={data?.data?.name}
              subtitle={data?.data?.type}
              followers={data?.data?.followers_count}
              following={data?.data?.followings_count}
              setSkip={() => setSkip(false)}
              mantra={data?.data?.cards?.[0]?.fields?.mantra}
              skills={[]}
              id={data?.data?.id}
              isFollowing={data?.data?.followed}
              itemType={IInteractionItemTypes.companies}
              pinType={PINS_TYPES.COMPANIES}
              isSaved={data?.data?.saved}
              isLoading={isLoading || isFetching || companyResults.isLoading}
            />
          </>

        )
      }
    >
      <CompanyPageContainer>
        {isLoading && <Loader />}
        <DetailsContainer>
          <Blocks id={data?.data?.id} isOwnProfile={isOwnProfile} companyData={data?.data} editable setSkip={() => setSkip(false)} />
        </DetailsContainer>
      </CompanyPageContainer>
      {isOwnProfile && (
        <ActionSection
          company={data?.data}
          editable={isOwnProfile}
          numberOfBlocks={(data?.data?.blocks?.length || 0) + 1}
          companyId={data?.data?.id}
          setSkip={() => setSkip(false)}
          isSaved={data?.data?.saved}
        />
      )}
    </CompanyProfileLayout>
  );
};

export default CompanyBrand;
