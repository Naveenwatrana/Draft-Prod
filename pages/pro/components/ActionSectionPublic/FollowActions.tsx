import React, { useEffect, useState } from 'react';
import SaveContent from 'components/Icons/SaveContent';
import { IconWrapper } from 'components/Atoms/IconWrapper';
import { PINS_TYPES } from 'common/types';
import useFollow from 'common/hooks/useFollow';
import { useSaveContent } from 'common/hooks/useSaveContent';
import { useLoggedInUser } from 'common/hooks/useLoggedInUser';
import ProfileFollow from 'components/Atoms/FollowButton/ProfileFollow';
import { useNavigate } from 'common/utils/router-fill';
import { loginUrl, messagesUrl } from 'common/utils/network/appRouts';
import useAladdinInteraction from 'common/services/Aladdin/useAladdinInteraction';
import { IInteractionItemTypes, IInteractionTypes } from 'common/services/Aladdin/types';
import ShareProfile from 'components/Atoms/ShareProfile';
import ButtonComp from 'components/buttonComp';
import lang from 'common/lang';
import { horizontalPositionValues } from 'components/KebabMenu/types';
import Loader from 'components/Loader/Loader';

const { messages: { message }, followUsers } = lang;

export type FollowActionsProps = {
  userSavedStatus: boolean;
  id: string;
  followed: boolean;
  setSkip? : () => void;
  profileType: IInteractionItemTypes;
  username: string;
};
const FollowActions = ({
  userSavedStatus, id, followed, setSkip, profileType, username,
}: FollowActionsProps) => {
  const {
    followUser, followCompany, companyResults, results,
  } = useFollow();
  const { saveContent } = useSaveContent();
  const navigate = useNavigate();
  const [saved, setSaved] = useState<boolean>(userSavedStatus || false);
  const isUserLoggedIn = useLoggedInUser();
  const { saveInteraction } = useAladdinInteraction();

  const handleMessage = () => {
    if (profileType === IInteractionItemTypes.companies) {
      navigate(`${messagesUrl}/org/${username}`);
      return;
    }
    if (followed) { navigate(`${messagesUrl}/pro/${username}`); }
  };
  const handleFollowButton = () => {
    if (setSkip) {
      setSkip();
    }
    saveInteraction({
      itemId: id,
      itemType: profileType,
      eventType: IInteractionTypes.Follow,
    });
    if (profileType === IInteractionItemTypes.companies) {
      followCompany(id);
      return;
    }
    followUser(id);
  };

  useEffect(() => {
    setSaved(userSavedStatus);
  }, [userSavedStatus]);

  const saveProfile = async () => {
    if (!isUserLoggedIn) {
      navigate(loginUrl);
      return;
    }
    if (setSkip) {
      setSkip();
    }
    saveInteraction({
      itemId: id,
      itemType: profileType,
      eventType: IInteractionTypes.Save,
    });
    const saveType = profileType === IInteractionItemTypes.companies ? PINS_TYPES.COMPANIES : PINS_TYPES.USER;
    await saveContent(id, saveType, IInteractionItemTypes.users);
    setSaved(!saved);
  };
  return (
    <>
      {(companyResults.isLoading || results.isLoading) && <Loader />}
      <IconWrapper data-cy="saveUserProfile" onClick={saveProfile}>
        <SaveContent active={saved} />
      </IconWrapper>
      <ShareProfile id={id} itemType={IInteractionItemTypes.users} horizontalPosition={horizontalPositionValues.center} primary={false} />
      {followed && <ProfileFollow onClick={handleFollowButton} isFollowing={followed} />}
      <ButtonComp onClick={followed ? handleMessage : handleFollowButton} label={followed ? message : followUsers.follow} primary />
    </>
  );
};

export default FollowActions;
