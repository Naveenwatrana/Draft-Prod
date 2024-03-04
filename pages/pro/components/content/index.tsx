import ContentTab from 'pages/pro/Tabs/ContentTab';
import ProfileNavBar from 'pages/pro/resume/ProfileNavbar';
import { useRouter } from 'next/router';
import { useNavigate, useParams } from 'common/utils/router-fill';
import { ProfilePage } from 'pages/pro/styles';
import { useEffect, useState } from 'react';
import useAladdinInteraction from 'common/services/Aladdin/useAladdinInteraction';
import { useProfileQuery } from 'pages/pro/profileService';
import { IInteractionEventValueType, IInteractionItemTypes, IInteractionTypes } from 'common/services/Aladdin/types';
import Loader from 'components/Loader/Loader';
import { useAppSelector } from 'common/hooks/state';
import { selectCurrentCompany } from 'pages/account/authSlice';
import { ToastContainer } from 'react-toastify';
import { UserContentTabProps } from './types';
import ActionSectionPublic from '../ActionSectionPublic';

const UserContentTab = ({
  userName, data, previousRoute, ownProfile,
}: UserContentTabProps) => {
  const navigate = useNavigate();
  const params = useParams();
  const { saveInteraction } = useAladdinInteraction();
  const userIsCompany = useAppSelector(selectCurrentCompany);
  const [skip, setSkip] = useState(true);
  const { isLoading, data: profileData } = useProfileQuery({
    username: params?.tab?.[0],
    company: userIsCompany?.username,
  }, { skip });
  const userProfile = (profileData?.data || data);
  const router = useRouter();
  const handleBack = () => {
    if (previousRoute) {
      router.back();
    } else {
      navigate('/feed');
    }
  };
  const followerCount = userProfile.followers || userProfile.followers_count || 0;
  const followingCount = userProfile.followings || userProfile.followings_count || 0;

  // Aladdin interaction event
  useEffect(() => {
    saveInteraction({
      itemId: userProfile.id,
      itemType: IInteractionItemTypes.users,
      eventType: IInteractionTypes.ViewPage,
      eventValue: IInteractionEventValueType.contentTab,
    });
  }, [
    // Needs to call only once
    // Therefore, no dependencies are needed
  ]);
  // Aladdin interaction event
  return (
    <ProfilePage>
      <ToastContainer
        position="top-center"
        hideProgressBar
        style={{
          width: '100%',
          maxWidth: '906px',
        }}
      />
      {isLoading && <Loader />}
      <ProfileNavBar
        handleBack={handleBack}
        activeTab={3}
        name={userProfile.name as string}
        userName={userName}
        followerCount={followerCount}
        followingCount={followingCount}
        location={userProfile.location}
      />
      <ContentTab data={userProfile} />
      {!ownProfile && (
        <ActionSectionPublic
          user={userProfile}
          setSkip={() => setSkip(false)}
          profileType={IInteractionItemTypes.users}
        />
      )}
    </ProfilePage>
  );
};

export default UserContentTab;
