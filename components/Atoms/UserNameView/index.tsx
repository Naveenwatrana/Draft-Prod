import { useCallback } from 'react';
import { getUserProfileUrl } from 'common/utils/getProfileLink.ts';
import { UserNameViewProps } from './types';
import { Button, Primary, UserName } from './styles';

const UserNameView = ({
  userNameClickable, primaryText, size, isAuthorCompany, userId,
}: UserNameViewProps) => {
  const getProfileUrl = useCallback(() => {
    const companyAuthor = !!isAuthorCompany && !!userId;
    const user = userId ?? '';
    return getUserProfileUrl(companyAuthor, user);
  }, [
    isAuthorCompany,
    userId,
  ]);

  if (userNameClickable) {
    return (
      <Primary role="link" size={size} href={getProfileUrl()}>{primaryText}</Primary>
    );
  }

  return (
    <Button role="button">
      <UserName size={size} component="h5">{primaryText}</UserName>
    </Button>
  );
};

export default UserNameView;
