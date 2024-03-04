import { GetServerSidePropsContext } from 'next';
import axios from 'axios';
import ContentTab from 'pages/pro/Tabs/ContentTab';
import { getOrigin } from 'utils/getOrigin';
import {
  apiRootUrl, getProfile,
} from 'common/utils/network/endpoints';
import cookie from 'cookie';
import { IProfileData, UserProfile } from 'pages/pro/types';
import {
  Container, ProfileContent, ActionContainer, NavbarContainer, NavbarFollowBtn, UserImage, UserName, Wrapper,
} from 'pages/pro/[username]/new/style';
import { getHeaders } from 'utils/getApiHeaders';
import { getContentApiUrl, profileTabs } from 'pages/pro/utils';
import LayoutWithNavbar from 'components/LayoutWithNavbar/LayoutWithNavbar';
import { ToastContainer } from 'react-toastify';
import TabsLayout from 'components/Molecules/TabsLayout';
import PageHead from 'components/Atoms/PageHead';
import { formatMetaTagsText } from 'common/utils/textParser';
import lang from 'common/lang';
import { userContentUrl } from 'common/utils/network/appRouts';
import { useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useAppSelector } from 'common/hooks/state';
import { selectCurrentCompany, selectCurrentUser } from 'pages/account/authSlice';
import { useProfileQuery } from 'pages/pro/profileService';
import { useInView } from 'react-intersection-observer';
import useFollow from 'common/hooks/useFollow';
import useAladdinInteraction from 'common/services/Aladdin/useAladdinInteraction';
import { IInteractionItemTypes, IInteractionTypes } from 'common/services/Aladdin/types';
import { useIsMobile } from 'common/hooks/useIsMobile';
import BackIcon from 'components/Icons/BackIcon';
import ProfileBio from 'components/Organisms/ProfileBio';
import { PINS_TYPES } from 'common/types';

const notFoundPage = { notFound: true };
const { title, description } = lang.SEO.userContentPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const currentUser = {
      data: {},
    };
    const userName = context?.params?.username as string ?? '';
    const cookies = cookie.parse(context.req.headers.cookie || '');
    const localUser = cookies.user ? JSON.parse(cookies.user) : null;
    const localCompany = JSON.parse(cookies.company || '{}');

    const userToken = localUser?.token;

    const userData = (await axios.get(`${apiRootUrl}${getProfile}?username=${userName}`, getHeaders(localUser?.token as string))).data?.data;

    const apiUrl = getContentApiUrl(userName, localCompany?.username);

    const { data } = await axios.get(apiUrl, getHeaders(localUser?.token as string));
    const userId = userName ? `?username=${userName}` : '';
    const company = localCompany?.username ? `&company=${localCompany.username}` : '';
    const { data: { data: profileData } } = await axios.get(`${apiRootUrl}${getProfile}${userId}${company}`, getHeaders(userToken as string));
    return {
      props: {
        userName,
        currentUser: currentUser.data,
        profileData,
        isCurrentUser: localUser?.username === context.params?.username,
        data: {
          ...data.data,
          id: userData.id,
          saved: userData.saved,
          name: userData.name,
        },
        origin: context.req.headers.host,
        ownProfile: localUser?.username === userName,
        globals: { origin: getOrigin(context) },
      },
    };
  } catch (e) {
    console.error('error', e);
    return notFoundPage;
  }
}
export type UserResumeProps = {
  userName: string;
  data: IProfileData;
  origin: string;
  profileData: UserProfile;
};

const {
  followUsers: {
    follow, unFollow,
  },
} = lang;
const UserResume = ({
  userName, data, origin, profileData,
}: UserResumeProps) => {
  const pageTitle = formatMetaTagsText(title, [userName]);
  const pageDescription = formatMetaTagsText(description, [userName]);
  const [skip, setSkip] = useState(true);
  const params = useParams();
  const router = useRouter();
  const userIsCompany = useAppSelector(selectCurrentCompany);
  const { isLoading: isResumeDataLoading, data: pData, isFetching } = useProfileQuery({
    username: params.username,
    company: userIsCompany?.username,
  }, { skip });

  const userContentProfileData = (pData?.data || profileData);
  const userContentData = useMemo(() => {
    if (userContentProfileData) {
      return { ...userContentProfileData, data: { ...userContentProfileData, location: userContentProfileData?.location } };
    }
  }, [userContentProfileData]);
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

  const resumeProfilecurrentUser = useAppSelector(selectCurrentUser);

  const { saveInteraction } = useAladdinInteraction();

  const handleFollowButton = () => {
    followUser(userContentProfileData?.id?.toString()?.toString());
    saveInteraction({
      itemId: userContentProfileData?.id?.toString()?.toString(),
      itemType: IInteractionItemTypes.users,
      eventType: IInteractionTypes.Follow,
    });
    setSkip(false);
  };
  const isMobile = useIsMobile();
  return (
    <>
      <PageHead
        title={pageTitle}
        description={pageDescription}
        canonical={`https://${origin}/${userContentUrl(userName)}`}
      />
      <LayoutWithNavbar showNavbar={!isMobile}>
        <ToastContainer
          position="top-center"
          hideProgressBar
          style={{
            width: '100%',
            maxWidth: '906px',
          }}
        />
        {isMobile
          && (
            <NavbarContainer withBorder={!inView}>
              <BackIcon onClick={handleBack} />
              {!inView && (
                <Wrapper>
                  <ActionContainer>
                    <UserImage media={userContentData?.cards?.[0]?.fields?.media || ''} />
                    <UserName>{userContentData.name}</UserName>
                  </ActionContainer>
                  {resumeProfilecurrentUser?.id !== userContentData?.id && (
                    <NavbarFollowBtn
                      onClick={handleFollowButton}
                      following={userContentData.followed}
                    >
                      {!userContentData.followed ? follow : unFollow}
                    </NavbarFollowBtn>
                  )}
                </Wrapper>
              )}
            </NavbarContainer>
          )}
        <Container>
          <ProfileBio
            ref={ref}
            media={userContentData?.cards?.[0]?.fields?.media}
            title={userContentData?.name}
            subtitle={userContentData?.location}
            followers={userContentData?.followers_count}
            following={userContentData?.followings_count}
            setSkip={() => setSkip(false)}
            mantra={userContentData?.cards?.[0]?.fields?.mantra}
            skills={Object.values(userContentData.skillset).map(
              (skill: any /** TODO: Add Type */) => skill.tag,
            )}
            id={userContentData?.id}
            isFollowing={userContentData?.followed}
            itemType={IInteractionItemTypes.users}
            pinType={PINS_TYPES.USER}
            isSaved={userContentData?.saved}
            isLoading={isResumeDataLoading || isFetching}
          />
          <ProfileContent>
            <TabsLayout tabs={profileTabs} activeTab={2} url="/pro">
              <ContentTab data={data} />
            </TabsLayout>
          </ProfileContent>
        </Container>
      </LayoutWithNavbar>
    </>
  );
};

export default UserResume;
