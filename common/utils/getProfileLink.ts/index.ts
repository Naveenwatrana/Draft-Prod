import { orgProfileUrl, userProfileUrl } from '../network/appRouts';

export const getUserProfileUrl = (isCompanyAuthor: boolean, userId: string) => {
  const userProfileLink = userProfileUrl(userId);
  const orgProfileLink = orgProfileUrl(userId);
  if (isCompanyAuthor) {
    return orgProfileLink;
  }
  if (userId) {
    return userProfileLink;
  }
  return '';
};
