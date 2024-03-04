import { IImage } from 'components/ImageUpload/types';
import { IOption } from 'components/MultipleInputTextArea/types';
import { MyOptionType } from 'components/Select/types';
import { IFeedData } from 'pages/feed/types';
import { ICompanyInsights } from 'pages/org/Insights/types';
import { ILocalCompany } from 'pages/org/[tab]/types';

export type ICreateCompany = {
    setShowCompanyModal: React.Dispatch<React.SetStateAction<boolean>>;
}
export type ICreateCompanyFormValues = {
    companyUrl: string;
}

export type ICreateCompanyEmailValues = {
    companyEmail: string;
}

export type ICreateCompanyFormsValues = {
    companyName: string;
    headcount: MyOptionType;
    industries: IOption[];
    summary: string;
    logoImage: IImage | null | undefined;
    backgroundImage?: string | null;
    deleteJobPicture?: string;
};
export type ICompanyDetailResponse = {
    id: number,
    industries: [] | null,
    logo: string,
    name: string,
    updated_at: string,
    url: string,
    user_id: number
    username?: string;
}

export enum Tabs {
    brand = 1,
    content = 2,
    jobs = 3,
    insights = 4,
}

export type CompanyPageProps = {
    companyInfo: { data: ICompany };
    isOwnProfile: boolean;
    origin: string;
};
export type CompanyDetailsPageProps = {
  companyInfo: ICompany;
  isOwnProfile: boolean;
  tab: string;
  origin: string;
  loggedInCompany: ILocalCompany;
  companyContent: {
    followers_count: number;
    followings_count: number;
    name: string;
    username: string;
    id: string;
    articles: {
      data: IFeedData[],
    };
    saved?: boolean;
    followed?: boolean;
    posts: {
      data: IFeedData[],
    };
    followers: number;
    followings: number;
    location: string;
  };
  companyInsights: ICompanyInsights;
};
export interface ICompany {
    id: string;
    location: string;
    name: string;
    url: string;
    logo: string;
    headcount: string;
    user_id: number;
    created_at: string;
    updated_at: string;
    summary: string;
    username: string;
    gics_sectors: string;
    gics_industry_groups: string;
    gics_industries: string;
    gics_sub_industries: string;
    number_of_funding_rounds: string;
    last_funding_stage: string;
    list_of_investors: string;
    last_funding_announcement_date: string;
    list_of_funding_rounds_closed: string;
    total_funding_amount?: null;
    ceo_name: string;
    competitor_list: string;
    genz_work: string;
    mission_statement: string;
    technologies_used: string;
    usp: string;
    ceo_quote: string;
    purpose: string;
    linkedin_url: string;
    company_tags: string;
    year_founded: string;
    hq_location: string;
    company_type: string;
    ipo_date?: null;
    market_capitalization?: null;
    executive_leadership_team: string;
    learning_opportunities: string;
    new_challenges: string;
    type?: null;
    verified_at?: null;
    verification_code?: null;
    work_email?: null;
    followers_count: number;
    followings_count: number;
    saved: boolean;
    followed: boolean;
    blocks?: (BlocksEntity)[] | null;
    cards?: (CardsEntity)[] | null;
    followers?: (FollowersEntity)[] | null;
    followings?: (FollowingsEntity)[] | null;
    published_jobs?: (null)[] | null;
  }
export interface BlocksEntity {
    id: number;
    type: string;
    fields: Fields;
    blockable_id: number;
    blockable_type: string;
    sort: number;
    created_at: string;
    updated_at: string;
  }
export interface Fields {
    media: string;
    title: string;
  }
export interface CardsEntity {
    id: number;
    type: string;
    fields: Fields1;
    entity_id: number;
    entity_type: string;
    user_id: number;
    created_at: string;
    updated_at: string;
  }
export interface Fields1 {
    media: string;
    mantra?: string | null;
    description?: string | null;
    links?: (LinksEntity)[] | null;
  }
export interface LinksEntity {
    url: string;
    name: string;
  }
export interface FollowersEntity {
    id: number;
    follower_id: number;
    followable_id: number;
    followable_type: string;
    follower_type: string;
    created_at: string;
    updated_at: string;
    follower: Follower;
  }
export interface Follower {
    id: number;
    first_name: string;
    email: string;
    email_verified_at: string;
    created_at: string;
    updated_at: string;
    failed_login_attempt: number;
    last_failed_login_date?: null;
    deleted_at?: null;
    last_name: string;
    profile_cover: string;
    onboarding_status: boolean;
    mantra: string;
    onboarding_step?: null;
    status: string;
    username: string;
    location: string;
    name: string;
    presigned_profile_cover: string;
    saved: boolean;
    followed: boolean;
  }
export interface FollowingsEntity {
    id: number;
    follower_id: number;
    followable_id: number;
    followable_type: string;
    follower_type: string;
    created_at: string;
    updated_at: string;
    followable?: Followable | null;
  }
export interface Followable {
    id: number;
    name: string;
    url?: string | null;
    logo?: string | null;
    headcount?: string | null;
    user_id?: number | null;
    created_at: string;
    updated_at: string;
    summary?: string | null;
    username: string;
    gics_sectors?: null;
    gics_industry_groups?: null;
    gics_industries?: null;
    gics_sub_industries?: null;
    number_of_funding_rounds?: null;
    last_funding_stage?: null;
    list_of_investors?: null;
    last_funding_announcement_date?: null;
    list_of_funding_rounds_closed?: null;
    total_funding_amount?: null;
    ceo_name?: null;
    competitor_list?: null;
    genz_work?: null;
    mission_statement?: null;
    technologies_used?: null;
    usp?: null;
    ceo_quote?: null;
    purpose?: null;
    linkedin_url?: null;
    company_tags?: null;
    year_founded?: null;
    hq_location?: null;
    company_type?: null;
    ipo_date?: null;
    market_capitalization?: null;
    executive_leadership_team?: null;
    learning_opportunities?: null;
    new_challenges?: null;
    type?: null;
    verified_at?: null;
    verification_code?: null;
    work_email?: null;
    saved: boolean;
    followed: boolean;
    first_name?: string | null;
    email?: string | null;
    email_verified_at?: string | null;
    failed_login_attempt?: number | null;
    last_failed_login_date?: null;
    deleted_at?: null;
    last_name?: string | null;
    profile_cover?: string | null;
    onboarding_status?: boolean | null;
    mantra?: string | null;
    onboarding_step?: number | null;
    status?: string | null;
    location?: string | null;
    presigned_profile_cover?: string | null;
  }

export type CompanyProps = {
  companyInfo: { data: ICompany };
  isOwnProfile: boolean;
};
