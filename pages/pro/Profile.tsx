import {
  ProfilePage,
} from 'pages/pro/styles';
import { useNavigate, useParams } from 'common/utils/router-fill';
import {
  selectCurrentCompany,
  selectCurrentUser,
} from 'pages/account/authSlice';
import { useAppDispatch, useAppSelector } from 'common/hooks/state';
import {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { useRouter } from 'next/router';
import { useIsMobile } from 'common/hooks/useIsMobile';
import { IInteractionEventValueType, IInteractionItemTypes, IInteractionTypes } from 'common/services/Aladdin/types';
import useAladdinInteraction from 'common/services/Aladdin/useAladdinInteraction';
import {
  getIsCurrentUser,
  isUserEditing,
  setIsCurrentUser,
} from './profileSlice';
import { useProfileQuery } from './profileService';
import { OwnProfileProps } from './types';
import BrandTab from './Tabs/BrandTab';
import ProfileNavBar from './resume/ProfileNavbar';
import ActionSection from './components/ActionSection';

const OwnProfile = ({
  previousRoute, profileData, loggedInUser, isViewingOwnProfile,
}: OwnProfileProps) => {
  const [skip, setSkip] = useState(true);
  const dispatch = useAppDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const router = useRouter();
  const currentUser = (useAppSelector(selectCurrentUser) || loggedInUser);
  const { saveInteraction } = useAladdinInteraction();
  const userIsCompany = useAppSelector(selectCurrentCompany);
  const { isError, isLoading, data } = useProfileQuery({
    username: params.username || params.tab?.[0],
    company: userIsCompany?.username,
  }, { skip });
  const isMobile = useIsMobile();
  const isCurrentUser = (useAppSelector(getIsCurrentUser) || isViewingOwnProfile);
  const [open, setOpen] = useState(false);
  const [filterPopupOpen, setFilterPopupOpen] = useState<boolean>(false);
  const isEditing = useAppSelector(isUserEditing);
  const [addCardStep, setAddCardStep] = useState(false);
  const userProfileData = (data?.data || profileData);
  const brandTabData = useMemo(() => {
    if (userProfileData) {
      return { ...userProfileData, data: { ...userProfileData, location: userProfileData?.location } };
    }
  }, [userProfileData]);

  // Aladdin interaction event
  useEffect(() => {
    saveInteraction({
      itemId: userProfileData?.id,
      itemType: IInteractionItemTypes.users,
      eventType: IInteractionTypes.ViewPage,
      eventValue: IInteractionEventValueType.brandTab,
    });
    saveInteraction({
      itemId: userProfileData?.id,
      itemType: IInteractionItemTypes.users,
      eventType: IInteractionTypes.ViewCard,
      eventValue: IInteractionEventValueType.viewFirstCard,
    });
  }, [
    // Needs to call only once
    // Therefore, no dependencies are needed
  ]);
  // Aladdin interaction event

  useEffect(() => {
    dispatch(
      setIsCurrentUser(
        currentUser.username === params.username || !params.username,
      ),
    );
  }, [currentUser, params]);

  const handleBack = () => {
    if (previousRoute) {
      router.back();
    } else {
      navigate('/feed');
    }
  };
  const handleCloseWizard = useCallback((state: boolean) => {
    setOpen(state);
    setAddCardStep(!state);
    setSkip(false);
  }, []);

  const openFilterPopup = () => setFilterPopupOpen(true);

  return (
    <ProfilePage>
      <ProfileNavBar
        activeTab={1}
        setSkip={() => setSkip(false)}
        followerCount={userProfileData?.followers_count}
        followingCount={userProfileData?.followings_count}
        name={userProfileData?.name}
        handleBack={handleBack}
        location={userProfileData?.location}
        userName={params.username as string}
      />
      <BrandTab
        isDesktopView={!isMobile}
        addCardStep={addCardStep}
        onCloseWizard={handleCloseWizard}
        open={open}
        data={brandTabData}
        isLoading={isLoading}
        isError={isError}
        isCurrentUser={isCurrentUser}
        setSkip={() => setSkip(false)}
      />
      {!isEditing && (
        <ActionSection
          setSkip={() => setSkip(false)}
          openFilterPopup={openFilterPopup}
          activeTab={1}
          user={userProfileData}
          currentUser={currentUser}
          isCurrentUser={isCurrentUser}
        />
      )}
    </ProfilePage>
  );
};

export default OwnProfile;
