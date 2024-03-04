import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'common/utils/router-fill';
import { useRouter } from 'next/router';
import { useIsMobile } from 'common/hooks/useIsMobile';
import useAladdinInteraction from 'common/services/Aladdin/useAladdinInteraction';
import { IInteractionEventValueType, IInteractionItemTypes, IInteractionTypes } from 'common/services/Aladdin/types';
import { useAppSelector } from 'common/hooks/state';
import { selectCurrentCompany } from 'pages/account/authSlice';
import { mergeUserData } from 'pages/org/ContentPage/utils';
import Loader from 'components/Loader/Loader';
import { ProfilePage } from '../styles';
import ProfileNavBar from './ProfileNavbar';
import ResumeTab from '../Tabs/ResumeTab';
import { UserResumePageProps } from './types';
import ActionSectionPublic from '../components/ActionSectionPublic';
import ResumeActionBar from '../components/ActionSectionPublic/ResumeBar';
import { useProfileQuery } from '../profileService';

const UserResumePage = ({
  userName, data, previousRoute, ownProfile,
}: UserResumePageProps) => {
  const [filterPopupOpen, setFilterPopupOpen] = useState<boolean>(false);
  const [skip, setSkip] = useState(false);
  const params = useParams();
  const isMobile = useIsMobile();
  const closeFilterPopup = () => setFilterPopupOpen(false);
  const userIsCompany = useAppSelector(selectCurrentCompany);
  const router = useRouter();
  const navigate = useNavigate();
  const { saveInteraction } = useAladdinInteraction();
  const { isLoading, data: profileData } = useProfileQuery({
    username: params?.tab?.[0],
    company: userIsCompany?.username,
  }, { skip });
  const handleBack = () => {
    if (previousRoute) {
      router.back();
    } else {
      navigate('/feed');
    }
  };
  const userProfile = useMemo(() => {
    return mergeUserData(data, profileData?.data, skip);
  }, [data, profileData?.data, skip]);

  // Aladdin interaction event
  useEffect(() => {
    if (userProfile.id) {
      saveInteraction({
        itemId: userProfile.id,
        itemType: IInteractionItemTypes.users,
        eventType: IInteractionTypes.ViewPage,
        eventValue: IInteractionEventValueType.resumeTab,
      });
    }
  }, [
    userProfile.id,
    // Needs to call only once
    // Therefore, no dependencies are needed
  ]);
  // Aladdin interaction event
  const openFilterPopup = () => setFilterPopupOpen(true);
  return (
    <ProfilePage>
      {isLoading && <Loader />}
      <ProfileNavBar
        handleBack={handleBack}
        activeTab={2}
        name={userProfile.name as string}
        followerCount={userProfile.followers}
        followingCount={userProfile.followings}
        location={userProfile.location}
        userName={userName}
      />
      <ResumeTab
        closeFilterPopup={closeFilterPopup}
        openFilter={filterPopupOpen}
        data={userProfile}
        ownProfile={ownProfile}
      />
      {!ownProfile && (
        <ActionSectionPublic
          user={userProfile}
          setSkip={() => setSkip(false)}
          profileType={IInteractionItemTypes.users}
        />
      )}
      {ownProfile && isMobile && (
        <ResumeActionBar
          openFilterPopup={openFilterPopup}
        />
      )}
    </ProfilePage>
  );
};

export default UserResumePage;
