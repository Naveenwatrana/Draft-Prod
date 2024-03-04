import { IProfileData, UserProfile } from 'pages/pro/types';

export type UserResumeProps = {
  userName: string;
  data: IProfileData;
  ownProfile: boolean;
  origin: string;
  profileData: UserProfile;
};

export type ResumeProps = {
  data: IProfileData;
  ownProfile: boolean;
  profileData: UserProfile;
};
