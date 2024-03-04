import { GetServerSidePropsContext } from 'next';
import { getHeaders, getLocalCompany, getLocalUser } from 'utils/getApiHeaders';
import axios from 'axios';
import { apiRootUrl, getProfile } from 'common/utils/network/endpoints';
import { getOrigin } from 'utils/getOrigin';
import { ProfileProps } from 'pages/pro/types';
import { ToastContainer } from 'react-toastify';
import { useIsMobile } from 'common/hooks/useIsMobile';
import { useMemo, useState } from 'react';
import TabsLayout from 'components/Molecules/TabsLayout';
import LayoutWithNavbar from 'components/LayoutWithNavbar/LayoutWithNavbar';
import Blocks from 'pages/pro/components/Blocks';
import {
  DetailsContainer,
  NoDetailsContainer,
} from 'pages/pro/styles';
import NoBlocks from 'pages/pro/basicDetails/components/NoBlocks';
import { profileTabs } from 'pages/pro/utils';
import { useParams } from 'next/navigation';
import { useAppSelector } from 'common/hooks/state';
import { selectCurrentCompany, selectCurrentUser } from 'pages/account/authSlice';
import { useProfileQuery } from 'pages/pro/profileService';
import { IInteractionItemTypes, IInteractionTypes } from 'common/services/Aladdin/types';
import { PINS_TYPES } from 'common/types';
import ProfileBio from 'components/Organisms/ProfileBio';
import BackIcon from 'components/Icons/BackIcon';
import lang from 'common/lang';
import { useRouter } from 'next/router';
import { useInView } from 'react-intersection-observer';
import useFollow from 'common/hooks/useFollow';
import useAladdinInteraction from 'common/services/Aladdin/useAladdinInteraction';
import ActionSection from 'pages/pro/components/ActionSection';
import { ITagResponse } from 'pages/pro/components/Projects/types';
import {
  ActionContainer, Container, NavbarContainer, NavbarFollowBtn, ProfileContent, UserImage, UserName, Wrapper,
} from './new/style';
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const currentUser = {
    data: {},
  };
  try {
    const localUser = getLocalUser(context.req.headers.cookie as string);
    const localCompany = getLocalCompany(context.req.headers.cookie || '');
    const userToken = localUser?.token;
    const userId = context.params?.username ? `?username=${context.params.username}` : '';
    const company = localCompany?.username ? `&company=${localCompany.username}` : '';
    const { data } = await axios.get(`${apiRootUrl}${getProfile}${userId}${company}`, getHeaders(userToken as string));
    return {
      props: {
        profileData: data.data,
        currentUser: currentUser.data,
        isCurrentUser: localUser?.username === context.params?.username,
        newlyOnboarded: localUser?.username === data?.data?.username && (localUser?.newlyOnboarded || ''),
        origin: context.req.headers.host,
        globals: { origin: getOrigin(context) },
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

const {
  followUsers: {
    follow, unFollow,
  },
} = lang;
const UserProfile = ({ profileData, isCurrentUser }: ProfileProps) => {
  const isResponsiveBlock = false;
  const activeTab = 0;

  const [skip, setSkip] = useState(true);
  const params = useParams();
  const router = useRouter();
  const userIsCompany = useAppSelector(selectCurrentCompany);
  const [, setFilterPopupOpen] = useState<boolean>(false);
  const { isLoading, data, isFetching } = useProfileQuery({
    username: params.username,
    company: userIsCompany?.username,
  }, { skip });

  const userProfileData = (data?.data || profileData);
  const currentUser = useAppSelector(selectCurrentUser);

  const openFilterPopup = () => setFilterPopupOpen(true);
  const userData = useMemo(() => {
    if (userProfileData) {
      return { ...userProfileData, data: { ...userProfileData, location: userProfileData?.location } };
    }
  }, [userProfileData]);
  const handleBack = () => {
    router.back();
  };
  const [ref, inView] = useInView({
    threshold: 0,
    triggerOnce: false,
  });

  const {
    followUser,
  } = useFollow();

  const { saveInteraction } = useAladdinInteraction();

  const handleFollowButton = () => {
    followUser(userProfileData?.id?.toString()?.toString());
    saveInteraction({
      itemId: userProfileData?.id?.toString()?.toString(),
      itemType: IInteractionItemTypes.users,
      eventType: IInteractionTypes.Follow,
    });
    setSkip(false);
  };
  const isMobile = useIsMobile();

  return (
    <>
      <ToastContainer
        position="top-center"
        hideProgressBar
        style={{
          width: '100%',
          maxWidth: '906px',
        }}
      />
      <LayoutWithNavbar showNavbar={!isMobile}>
        {isMobile && (
          <NavbarContainer withBorder={!inView}>
            <BackIcon onClick={handleBack} />
            {!inView && (
              <Wrapper>
                <ActionContainer>
                  <UserImage
                    media={userData?.cards?.[0]?.fields?.media || ''}
                  />
                  <UserName>{userData.name}</UserName>
                </ActionContainer>
                {currentUser?.id !== userData?.id && (
                  <NavbarFollowBtn
                    onClick={handleFollowButton}
                    following={userData.followed}
                  >
                    {!userData.followed ? follow : unFollow}
                  </NavbarFollowBtn>
                )}
              </Wrapper>
            )}
          </NavbarContainer>
        )}
        <Container>
          <ProfileBio
            ref={ref}
            media={
              userData?.profile_image || userData?.cards?.[0]?.fields?.media
            }
            title={userData?.name}
            subtitle={userData?.location}
            followers={userData?.followers_count}
            following={userData?.followings_count}
            setSkip={() => setSkip(false)}
            mantra={userData?.mantra || userData?.cards?.[0]?.fields?.mantra}
            skills={userData.skillset.map((skill: ITagResponse) => skill.tag)}
            id={userData?.id}
            isFollowing={userData?.followed}
            itemType={IInteractionItemTypes.users}
            pinType={PINS_TYPES.USER}
            isSaved={userData?.saved}
            isLoading={isLoading || isFetching}
          />
          <ProfileContent>
            <TabsLayout tabs={profileTabs} activeTab={activeTab} url="/pro">
              {activeTab === 0 && (
                <div>
                  {!userData?.blocks?.length && isCurrentUser && (
                    <NoDetailsContainer
                      isResponsiveContainer={currentUser?.id === profileData.id}
                    >
                      <NoBlocks />
                    </NoDetailsContainer>
                  )}
                  {userData?.blocks && userData?.blocks?.length > 0 && (
                    <DetailsContainer
                      isResponsiveContainer={currentUser?.id === profileData.id}
                      minWidth={isResponsiveBlock ? 700 : 600}
                    >
                      <Blocks
                        id={userData.id}
                        ownProfile={isCurrentUser}
                        blocks={userData?.blocks}
                        numberOfBlocks={(userData?.blocks?.length || 0) + 1}
                        brandLayout={userData?.brand_layout}
                        setSkip={() => setSkip(false)}
                      />
                    </DetailsContainer>
                  )}
                </div>
              )}
              {isCurrentUser && (
                <ActionSection
                  setSkip={() => setSkip(false)}
                  openFilterPopup={openFilterPopup}
                  activeTab={1}
                  user={userProfileData}
                  currentUser={currentUser}
                  isCurrentUser={isCurrentUser}
                />
              )}
            </TabsLayout>
          </ProfileContent>
        </Container>
      </LayoutWithNavbar>
    </>
  );
};

export default UserProfile;
