import { ApiCard } from 'pages/article/create/types';
import React from 'react';
import { ITag } from 'pages/article/view/types';
import { ICard, IFeedData } from 'pages/feed/types';
import { IMeltwaterSettingsValues } from './common/Settings/type';
import { IndustriesOption, JobJoiningPreferencesOption } from './common/Preferences/types';

export enum Tabs {
    JOB = 1,
    CONTENT = 2,
    SAVED = 3,
    APPLICATIONS = 4,
    SETTINGS = 5,
    MELTWATER = 7,
    POSTS = 6,
    LINKS = 9,
    PREFERENCES = 8,
}

export const TabsMapper: Record<string, Tabs> = {
  job: Tabs.JOB,
  content: Tabs.CONTENT,
  saved: Tabs.SAVED,
  application: Tabs.APPLICATIONS,
  settings: Tabs.SETTINGS,
  meltWater: Tabs.MELTWATER,
  posts: Tabs.POSTS,
  links: Tabs.LINKS,
  preferences: Tabs.PREFERENCES,
};

export enum JobStatus {
    PUBLISHED = 'open',
    UNPUBLISHED = 'close',
    PENDING = 'pending',
}

export type Option = {
    label: string;
    value?: Tabs;
    options?: Option[];
}

export type StatusVal = 'open' | 'close' | 'pending';

export type IJobData = {
    id: number,
    slug: string,
    type?: string;
    role: string;
    location: string;
    jobType: string;
    salaryFrom: number;
    salaryTo: number;
    background: string;
    description: string;
    userId: number;
    createdAt: string;
    updatedAt: string;
    locationType: string;
    snapshot: string;
    snapshotBackground: string;
    status: StatusVal;
    uuid: string;
    applicantsCount: number;
    companyId: string;
    matching_skills?: ITag[];
    applicants_count?: number;
    updated_at?: string;
    skills?: ITag[];
}

export type IJobSkills = {
    id: number;
    tag: string;
    type: string;
}

export const nullJob: IJobData = {
  id: 0,
  role: '',
  location: '',
  jobType: '',
  salaryFrom: 0,
  salaryTo: 0,
  background: '',
  description: '',
  userId: 0,
  createdAt: '',
  updatedAt: '',
  locationType: '',
  snapshot: '',
  snapshotBackground: '',
  status: 'pending',
  uuid: '',
  applicantsCount: 0,
  companyId: '',
  slug: '',
};

export type JobSelectProps = {
    Options: Option[];
    currentTab: Tabs;
    setCurrentTab: React.Dispatch<React.SetStateAction<Tabs>>;
}

export type JobListProps = {
    jobsList: IJobData[];
    fetchMoreJobsData: () => void;
    updateRow: (data: IJobData) => void;
    selectedJob: IJobData;
    setSelectedJob: React.Dispatch<React.SetStateAction<IJobData>>;
    hasMoreJobs: boolean;
}

export type JobListItemProps = {
    jobListItem: IJobData;
    selectedJob: IJobData;
    updateRow: (data: IJobData) => void;
    handleMoreClick: (job: IJobData) => void;
}

export type MoreMenuContentProps = {
    closeMenu: () => void;
    selectedJob: IJobData;
    updateRow: (data: IJobData) => void;
}

export type JobListHeaderProps = {
    jobListCount: number;
}

export type ATSAddJobModalProps = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export type IJobItemResponseData = {
    id: number,
    role: string;
    location: string;
    job_type: string;
    salary_from: number;
    salary_to: number;
    background: string;
    description: string;
    userId: number;
    created_at: string;
    updated_at: string;
    location_type: string;
    snapshot: string;
    snapshot_background: string;
    status: StatusVal;
    uuid: string;
    applicants_count: number;
    company_id: string;
    matchingSkills: ITag[];
    slug: string;
}

export type IJobResponseData = {
    data: IJobItemResponseData[];
    current_page: number;
    total: number;
    from: number;
    to: number;
}
export type IApplicationItemResponseData = {
    job: IJobItemResponseData;
    created_at: string;
};

export type IApplicationResponseData = {
    data: IApplicationItemResponseData[];
    current_page: number;
    total: number;
    from: number;
    to: number;
}

export type ICronycleFeedResponse = {
  created_at: string;
  cronycle_feed_id: string;
  id: number;
  is_connected: boolean;
  name: string;
  owner: string;
  updated_at: string;
  user_id: number;
};

export type ICronycleFeed = {
  createdAt: string;
  cronycleFeedId: string;
  id: number;
  isConnected: boolean;
  name: string;
  owner: string;
  updatedAt: string;
  userId: number;
};

export type ICronycleFeedArticleResponse = {
  id: number;
  title: string;
  published_date: string;
  url: string;
  created_at: string;
  image_urls: string;
  author: string;
  domain: string;
  meltwater_type?: string;
};

export type ICronycleFeedArticle = {
  id: number;
  header: string;
  date: Date;
  status: boolean;
  cronycleContentType: string;
  fetchDate: Date;
  image?: string;
  url?: string;
  author: string;
  domain: string;
};

export type IMeltwaterFeedArticle = {
    id: number;
    header: string;
    date?: Date;
    status: boolean;
    cronycleContentType?: string;
    fetchDate?: Date;
    image?: string;
    url?: string;
    author: string;
    domain: string;
    meltwater_type?: string;
  };
export type ISavedCard = {
    id: number;
    title: string;
    date: string;
    author: string;
    published_date: string | null;
    content: string;
    image_urls: string[];
    content_id: string;
    created_at: string;
    cronycle_feed_id: string;
    domain: string;
    saved?: boolean;
    preview_image?: string;
    organisation_type?: string;
    creator?: {
        name: string;
        type?: string;
        logo?: string;
        username: string;
        cards: ICard[];
    },
    media?: string[];
    caption?: string;
    upvotes_count: number;
    comments_count: number;
    cards: ApiCard[];
    link?: string;
    og_description?: string;
    og_image?: string;
    og_title?: string;
    website_name?: string;
    blocks?: any[];
    expertise?: string[];
    profile_image?: string;
    username?: string;
    name?: string;
    mantra?: string;
    location?: string;
    logo?: string;
    company_type?: string;
    type?: string;
};

export type WorkspaceProps = {
    postCards: ISavedCard[];
    linkCards: ISavedCard[];
    meltwaterSettings: IMeltwaterSettingsValues;
    meltwaterArticlesData?: IFeedData[] | null;
    jobJoiningPreferenceOptions: JobJoiningPreferencesOption[];
    industryOptions: IndustriesOption[];
};

export enum MELTWATER_ITEMS {
    settings= 'Feed Settings',
    newsFeed= 'Meltwater Newsfeed',
}
