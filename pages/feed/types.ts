import { ITag } from 'pages/article/view/types';

export enum feedTypes {
  company = 'company',
  article = 'article',
  post = 'post',
  user = 'user',
  job = 'job',
  link = 'link',
}

export enum MatchTypes {
  location = 'location',
  baseSalaryMatch = 'base_salary_match',
  employmentType = 'employment_type',
  locationType = 'location_type',
  officeDaysPerWeek = 'office_days_per_week',
  roleType = 'role_type',
  targetEarning = 'target_earning',
  totalPeopleManaged = 'total_people_managed',
}

export type ICard = {
  type: string;
  fields: any;
  id?: string;
  created_at: string;
};

export type IFeedData = {
  type?: string;
  name?: string;
  slug?: string;
  bio?: string;
  cards?: any[];
  cover?: string;
  logo?: string;
  author?: string;
  title?: string;
  created_at?: string;
  background?: string;
  image_urls?: string;
  mantra?: string;
  profile_cover?: string;
  presigned_profile_cover?: string;
  company?: ICompany;
  description?: string;
  snapshot?: string;
  snapshot_background?: string;
  uuid?: string;
  role?: string | { name: string }; // TODO: update type
  location?: string;
  location_type?: string;
  employment_type?: string;
  salary_from?: number;
  salary_to?: number;
  cronycle_feed_id?: number;
  url?: string;
  id: string;
  username?: string;
  saved?: boolean;
  appliedOn?: string;
  skills?: ITag[];
  meltwater_type?: string;
  preview_image?: string;
  upvotes_count?: number;
  comments_count?: number;
  caption? : string;
  media?: string[];
  match_score?: number;
  job_skills_count?: number;
  user_matched_skills_count?: number;
  expertise?: string[];
  blocks?: any[];
  company_type?: string;
  organisation_type?: string;
  matches?:{
    location: boolean;
    base_salary_match: boolean;
    employment_type: boolean;
    location_type: boolean;
    office_days_per_week: boolean;
    role_type: boolean;
    target_earning: boolean;
    total_people_managed: boolean;
  }
  creator?: {
    name: string;
    username: string;
    type?: string;
    logo?: string;
    cards: ICard[];
  },
  user?: {
    name: string;
    username: string;
  },
  published_date?: string;
  domain?: string;
  meltwater_source_name?: string;
  link?: string;
  og_description?: string;
  og_image?: string;
  og_title?: string;
  website_name?: string;
  applicants?:{
    user: {
      cards: ICard[]
      name: string;
    }
  }[];
  profile_image?: string;
};

export interface IApplicant extends IFeedData {
  applicantId?: number;
  isShortListed?: boolean;
  is_shortlisted?: boolean;
  match_skill_count?: number;
}

export type IRecommendation = {
  id: number;
  is_shortlisted?: boolean;
  match_score: string;
  past_application_count?: number;
  user_matched_skills_count?: number;
  user: {
    first_name?: string;
    last_name?: string;
    name?: string;
    id: number;
    mantra?: string;
    username: string;
    profile_image?: string;
    location?: string;
    match_skill_count?: number;
  }
}
export type IUser = {
  user: IFeedData;
  created_at: string;
  id: number;
  is_shortlisted: boolean;
};

type ICompany = {
  name: string;
  logo: string;
};

export type IFilter = {
  filter: string;
  label: string;
  active: boolean;
};

export type FeedResponse = {
  articles: IFeedData[];
  companies: IFeedData[];
  jobs: IFeedData[];
  users: IFeedData[];
  posts: IFeedData[];
}
