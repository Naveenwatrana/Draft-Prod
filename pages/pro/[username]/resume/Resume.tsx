import { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { profileTabs } from 'pages/pro/utils';
import { useInView } from 'react-intersection-observer';
import LayoutWithNavbar from 'components/LayoutWithNavbar/LayoutWithNavbar';
import {
  Container, ProfileContent, ActionContainer, NavbarContainer, NavbarFollowBtn, UserImage, UserName, Wrapper,
} from 'pages/pro/[username]/new/style';
import TabsLayout from 'components/Molecules/TabsLayout';
import ResumeContent from 'pages/pro/resume/ResumeContent';
import useResume from 'common/hooks/useResume';
import ProfileBio from 'components/Organisms/ProfileBio';
import { useProfileQuery } from 'pages/pro/profileService';
import { useAppSelector } from 'common/hooks/state';
import { selectCurrentCompany, selectCurrentUser } from 'pages/account/authSlice';
import { IInteractionItemTypes, IInteractionTypes } from 'common/services/Aladdin/types';
import { PINS_TYPES } from 'common/types';
import { ToastContainer } from 'react-toastify';
import { useIsMobile } from 'common/hooks/useIsMobile';
import BackIcon from 'components/Icons/BackIcon';
import { useRouter } from 'next/router';
import useFollow from 'common/hooks/useFollow';
import useAladdinInteraction from 'common/services/Aladdin/useAladdinInteraction';
import lang from 'common/lang';
import { ResumeProps } from './types';

const {
  followUsers: {
    follow, unFollow,
  },
} = lang;
const Resume = ({ data, profileData, ownProfile }: ResumeProps) => {
  const [skip, setSkip] = useState(true);
  const {
    educationData,
    projectsData,
    workExperienceData,
    resumeData,
    isLoading,
  } = useResume(data, skip);
  const params = useParams();
  const router = useRouter();
  const userIsCompany = useAppSelector(selectCurrentCompany);
  const { isLoading: isResumeDataLoading, data: pData, isFetching } = useProfileQuery({
    username: params.username,
    company: userIsCompany?.username,
  }, { skip });

  const userResumeProfileData = (pData?.data || profileData);
  const userResumeData = useMemo(() => {
    if (userResumeProfileData) {
      return { ...userResumeProfileData, data: { ...userResumeProfileData, location: userResumeProfileData?.location } };
    }
  }, [userResumeProfileData]);
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

  const resumeProfileCurrentUser = useAppSelector(selectCurrentUser);

  const { saveInteraction } = useAladdinInteraction();

  const handleFollowButton = () => {
    followUser(userResumeProfileData?.id?.toString()?.toString());
    saveInteraction({
      itemId: userResumeProfileData?.id?.toString()?.toString(),
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
        {isMobile
          && (
            <NavbarContainer withBorder={!inView}>
              <BackIcon onClick={handleBack} />
              {!inView && (
                <Wrapper>
                  <ActionContainer>
                    <UserImage media={userResumeData?.cards?.[0]?.fields?.media || ''} />
                    <UserName>{userResumeData.name}</UserName>
                  </ActionContainer>
                  {resumeProfileCurrentUser?.id !== userResumeData?.id && (
                    <NavbarFollowBtn
                      onClick={handleFollowButton}
                      following={userResumeData.followed}
                    >
                      {!userResumeData.followed ? follow : unFollow}
                    </NavbarFollowBtn>
                  )}
                </Wrapper>
              )}
            </NavbarContainer>
          )}
        <Container>
          <ProfileBio
            ref={ref}
            media={userResumeData?.cards?.[0]?.fields?.media}
            title={userResumeData?.name}
            subtitle={userResumeData?.location}
            followers={userResumeData?.followers_count}
            following={userResumeData?.followings_count}
            setSkip={() => setSkip(false)}
            mantra={userResumeData?.cards?.[0]?.fields?.mantra}
            skills={Object.values(userResumeData.skillset).map(
              (skill: any /** TODO: Add Type */) => skill.tag,
            )}
            id={userResumeData?.id}
            isFollowing={userResumeData?.followed}
            itemType={IInteractionItemTypes.users}
            pinType={PINS_TYPES.USER}
            isSaved={userResumeData?.saved}
            isLoading={isResumeDataLoading || isFetching}
          />
          <ProfileContent>
            <TabsLayout tabs={profileTabs} activeTab={1} url="/pro">
              <ResumeContent
                resumeData={resumeData}
                ownProfile={ownProfile}
                workExperienceData={workExperienceData}
                projectsData={projectsData}
                educationData={educationData}
                isLoading={isLoading}
                setSkip={(val) => setSkip(val)}
              />
            </TabsLayout>
          </ProfileContent>
        </Container>
      </LayoutWithNavbar>

    </>
  );
};

export default Resume;
