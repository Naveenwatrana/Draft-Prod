import React, { useEffect, useState } from 'react';
import SaveContent from 'components/Icons/SaveContent';
import { IconWrapper } from 'components/Atoms/IconWrapper';
import ProfileFollow from 'components/Atoms/FollowButton/ProfileFollow';
import { PINS_TYPES } from 'common/types';
import useFollow from 'common/hooks/useFollow';
import { useSaveContent } from 'common/hooks/useSaveContent';
import { useLoggedInUser } from 'common/hooks/useLoggedInUser';
import { useNavigate, useParams } from 'common/utils/router-fill';
import { loginUrl, messagesUrl } from 'common/utils/network/appRouts';
import useAladdinInteraction from 'common/services/Aladdin/useAladdinInteraction';
import { IInteractionItemTypes, IInteractionTypes } from 'common/services/Aladdin/types';
import ButtonComp from 'components/buttonComp';
import { horizontalPositionValues } from 'components/KebabMenu/types';
import lang from 'common/lang';
import ShareProfile from 'components/Atoms/ShareProfile';

const { messages: { message }, followUsers } = lang;

export type FollowActionsProps = {
  userSavedStatus: boolean;
  id: string;
  followed: boolean;
  setSkip:() => void;
};
const FollowActions = ({
  userSavedStatus, id, followed, setSkip,
}: FollowActionsProps) => {
  const params = useParams();
  const { followUser } = useFollow();
  const { saveContent } = useSaveContent();
  const navigate = useNavigate();
  const [saved, setSaved] = useState<boolean>(userSavedStatus || false);
  const isUserLoggedIn = useLoggedInUser();
  const { saveInteraction } = useAladdinInteraction();

  const handleFollowButton = () => {
    followUser(id);
    saveInteraction({
      itemId: id,
      itemType: IInteractionItemTypes.users,
      eventType: IInteractionTypes.Follow,
    });
    setSkip();
  };
  const handleMessage = () => {
    if (followed) { navigate(`${messagesUrl}/${params.username}`); }
  };

  useEffect(() => {
    setSaved(userSavedStatus);
  }, [userSavedStatus]);

  const saveProfile = async () => {
    if (!isUserLoggedIn) {
      navigate(loginUrl);
      return;
    }
    await saveContent(id, PINS_TYPES.USER, IInteractionItemTypes.users);
    saveInteraction({
      itemId: id,
      itemType: IInteractionItemTypes.users,
      eventType: IInteractionTypes.Save,
    });
    setSaved(!saved);
  };

  return (
    <>
      <IconWrapper data-cy="saveUserProfile" onClick={saveProfile}>
        <SaveContent active={saved} />
      </IconWrapper>

      <ShareProfile id={id} itemType={IInteractionItemTypes.users} primary={false} horizontalPosition={horizontalPositionValues.center} />
      {followed && <ProfileFollow onClick={handleFollowButton} isFollowing={followed} />}
      <ButtonComp onClick={followed ? handleMessage : handleFollowButton} label={followed ? message : followUsers.follow} primary />
    </>
  );
};

export default FollowActions;
