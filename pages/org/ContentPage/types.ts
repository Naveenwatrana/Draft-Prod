import { IFeedData } from 'pages/feed/types';

export type ICompanyMetaData = {
  followers_count: number;
  followings_count: number;
  saved?: boolean;
  followed?: boolean;
};
export type ICompanyInfo = {
  links?: {
    data: IFeedData[],
  };
  id: string;
  articles: {
    data: IFeedData[],
  };
  posts: {
    data: IFeedData[],
  };
  followers: number;
  followings: number;
  followers_count: number;
  followings_count: number;
  location: string;
  saved?: boolean;
  followed?: boolean;
};

export type CompanyContentPageProps = {
  ownProfile: boolean;
  companyInfo: ICompanyInfo;
};
