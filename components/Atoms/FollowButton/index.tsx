import { useLoggedInUser } from 'common/hooks/useLoggedInUser';
import { loginUrl } from 'common/utils/network/appRouts';
import lang from 'common/lang';
import {
  memo, useCallback, useEffect, useState,
} from 'react';
import { useNavigate } from 'common/utils/router-fill';
import { FollowButtonProps } from './types';
import { FollowingButton, StyledFollowButton } from './style';

const { follow, unFollow } = lang.followUsers;

const FollowButton = ({ isFollowing, onClick }: FollowButtonProps) => {
  const [following, setFollowing] = useState(isFollowing || false);
  const isUserLoggedIn = useLoggedInUser();
  const navigate = useNavigate();
  const label = following ? unFollow : follow;

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

  return following ? (
    <FollowingButton label={label} onClick={handleClick} />
  ) : (
    <StyledFollowButton primary label={label} onClick={handleClick} />
  );
};

export default memo(FollowButton);
