import { IProfileData } from 'pages/pro/types';
import { ICompanyInfo, ICompanyMetaData } from './types';

export const mergeCompanyData = (companyInfo: ICompanyInfo, companyData: ICompanyMetaData, skip: boolean): ICompanyInfo => {
  if (skip) {
    return companyInfo;
  }
  if (!companyData) {
    return companyInfo;
  }
  return {
    ...companyInfo,
    saved: companyData.saved,
    followed: companyData.followed,
    followers: companyData.followers_count,
    followings: companyData.followings_count,
  };
};
export const mergeUserData = (profile: IProfileData, companyData: ICompanyMetaData, skip: boolean): IProfileData => {
  if (skip) {
    return profile;
  }
  if (!companyData) {
    return profile;
  }
  return {
    ...profile,
    saved: companyData.saved,
    followed: companyData.followed,
    followers: companyData.followers_count,
    followings: companyData.followings_count,
  };
};
