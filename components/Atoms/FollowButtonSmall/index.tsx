import lang from 'common/lang';
import {
  memo, useCallback, useEffect, useState,
} from 'react';
import { useLoggedInUser } from 'common/hooks/useLoggedInUser';
import { FollowButtonSmallProps } from './types';
import { BorderedButton } from '../BorderButton/styles';

const { follow, unFollow } = lang.followUsers;

const FollowButtonSmall = ({
  isFollowing, onClick, ...rest
}: FollowButtonSmallProps) => {
  const loggedInUser = useLoggedInUser();
  const [following, setFollowing] = useState(isFollowing || false);
  const label = following ? unFollow : follow;

  useEffect(() => {
    setFollowing(isFollowing);
  }, [isFollowing]);

  const handleClick = useCallback(() => {
    if (!loggedInUser) {
      onClick(!following);
      return;
    }
    setFollowing(!following);
    onClick(!following);
  }, [following, onClick, loggedInUser]);

  return following ? (
    <BorderedButton label={label} onClick={handleClick} {...rest} />
  ) : (
    <BorderedButton primary label={label} onClick={handleClick} {...rest} />
  );
};

export default memo(FollowButtonSmall);
