import { useLoggedInUser } from 'common/hooks/useLoggedInUser';
import { loginUrl } from 'common/utils/network/appRouts';
import {
  memo, useCallback, useEffect, useState,
} from 'react';
import { useNavigate } from 'common/utils/router-fill';
import FollowUserIcon from 'components/Icons/FollowUserIcon';
import { IconWrapper } from 'components/Atoms/IconWrapper';
import lang from 'common/lang';
import { FollowButtonProps } from './types';
import { Tooltip } from './style';

const { followUsers: { unFollow } } = lang;

const ProfileFollow = ({ isFollowing, onClick, isFollowingBack }: FollowButtonProps) => {
  const [following, setFollowing] = useState(isFollowing || false);
  const isUserLoggedIn = useLoggedInUser();
  const navigate = useNavigate();

  useEffect(() => {
    setFollowing(isFollowing);
  }, [isFollowing]);

  const handleClick = useCallback(() => {
    if (!isUserLoggedIn) {
      navigate(loginUrl);
      return;
    }

    setFollowing(!following);
    onClick(!following);
  }, [following, onClick, isUserLoggedIn, navigate]);

  return (
    <IconWrapper
      data-tooltip-id="followProfile"
      data-cy="followProfile"
      onClick={handleClick}
    >
      <Tooltip
        id="followProfile"
        place="top"
        variant="light"
        content={unFollow}
      />
      <FollowUserIcon active={isFollowingBack} />
    </IconWrapper>
  );
};

export default memo(ProfileFollow);
