/* eslint-disable @typescript-eslint/naming-convention */
export type IProjectPicture = {
    file?: File;
    featured?: boolean;
    imagePath? : string;
};
export type IProjectPictureNames = {
    name: string;
    featured?: boolean;
};

export enum Tabs {
    brand = 1,
    resume = 2,
    content = 3,
}
export type ProfileProps = {
  profileData: UserProfile;
  currentUser: UserProfile;
  isCurrentUser: boolean;
  newlyOnboarded?: boolean;
  origin: string;
};
export enum AddBlockType {
    PROJECT = 1,
    TEXT_BLOCK= 2,
    HIGHLIGHT_BLOCK=3,
    LINK_BLOCK = 4,
}

export enum BlockType {
    HIGHLIGHT = 'highlight',
    TEXT = 'text',
    PROJECT = 'project',
    LINK = 'link',
}
export type UserProfile = {
    id: number;
    user_type?: string;
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
    onboarding_step: number;
    status: string;
    username: string;
    location: string;
    followers_count: number;
    followings_count: number;
    name: string;
    presigned_profile_cover: string;
    saved: boolean;
    followed: boolean;
    companies?: (CompaniesEntity)[] | null;
    associated_companies?: (AssociatedCompaniesEntity)[] | null;
    followers?: (FollowersEntity)[] | null;
    followings?: (FollowingsEntity)[] | null;
    blocks?: (BlocksEntity)[] | null;
    cards?: (CardsEntity)[] | null;
    type?: string;
    education?: (EducationEntity)[] | null;
    skillset: any; // TODO: add type
    expertise?: string[];
    profile_image?: string;
    past_application_count?: number;
  }
export type CompaniesEntity = {
    id: number;
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
    saved: boolean;
    followed: boolean;
  }
export type AssociatedCompaniesEntity = {
    id: number;
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
    saved: boolean;
    followed: boolean;
    pivot: Pivot;
  }
export type Pivot = {
    user_id: number;
    company_id: number;
    created_at: string;
    updated_at: string;
  }
export type FollowersEntity = {
    id: number;
    follower_id: number;
    followable_id: number;
    followable_type: string;
    follower_type: string;
    created_at: string;
    updated_at: string;
    follower: FollowerOrFollowable;
  }
export type FollowerOrFollowable = {
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
    onboarding_step: number;
    status: string;
    username: string;
    location: string;
    name: string;
    presigned_profile_cover: string;
    saved: boolean;
    followed: boolean;
  }
export type FollowingsEntity = {
    id: number;
    follower_id: number;
    followable_id: number;
    followable_type: string;
    follower_type: string;
    created_at: string;
    updated_at: string;
    followable?: Followable | null;
  }
export type Followable = {
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
export type BlocksEntity = {
    id: number;
    type: string;
    fields: Fields;
    blockable_id?: number;
    blockable_type?: string;
    sort: number;
    created_at?: string;
    updated_at?: string;
    tags?: (null)[] | null;
  }
export type Fields = {
    title?: string;
    description?: string;
    media?: string;
    url?: string;
    domain?: string;
    button?: string;
  }
export type CardsEntity = {
    id: number;
    type: string;
    fields: Fields1;
    entity_id: number;
    entity_type: string;
    user_id: number;
    created_at: string;
    updated_at: string;
  }
export type Fields1 = {
    media: string;
    mantra: string;
  }
export type EducationEntity = {
    id: number;
    institution_name: string;
    education_type: string;
    field_of_study: string;
    start_date: string;
    end_date?: string | null;
    grade?: string | null;
    description?: string | null;
    created_at: string;
    updated_at: string;
    user_id: number;
    tags?: (TagsEntity | null)[] | null;
  }
export type OwnProfileProps = {
  previousRoute?: string, profileData: UserProfile; loggedInUser: UserProfile;
  isViewingOwnProfile: boolean;
}
export interface IProfileData {
  side_projects?: (SideProjectsEntity)[] | null;
  experience?: (ExperienceEntity)[] | null;
  education?: (EducationEntity)[] | null;
  followings: number;
  followers: number;
  location?: string | null;
  id?: string;
  name?: string;
  saved?: boolean;
  followed?: boolean;
}
export interface SideProjectsEntity {
  id: number;
  user_id: number;
  experience_id?: null;
  name: string;
  role?: null;
  start_date: string;
  end_date?: string | null;
  ongoing: boolean;
  description: string;
  created_at: string;
  updated_at: string;
  tags?: (null)[] | null;
  project_media?: (ProjectMediaEntity | null)[] | null;
}
export interface ProjectMediaEntity {
  id: number;
  project_id: number;
  url: string;
  created_at: string;
  updated_at: string;
}
export interface ExperienceEntity {
  id: number;
  user_id: number;
  company_id?: null;
  role_id: number;
  role_title: string;
  company_name: string;
  employment_type: string;
  location: string;
  location_type: string;
  role_type: string;
  total_people_managed: string;
  start_date: string;
  end_date: string;
  ongoing: boolean;
  role_description?: null;
  created_at: string;
  updated_at: string;
  projects?: (null)[] | null;
  tags?: (TagsEntity)[] | null;
  company?: null;
  category: Category;
}
export interface TagsEntity {
  id: number;
  tag: string;
  type?: string | null;
  created_at?: null;
  updated_at?: null;
  pivot: Pivot;
}
export interface Category {
  id: number;
  name: string;
  created_at?: null;
  updated_at?: null;
  parent_id: number;
}
export interface TagsEntity1 {
  id: number;
  tag: string;
  type?: string | null;
  created_at?: null;
  updated_at?: null;
  pivot: Pivot1;
}
export interface Pivot1 {
  education_id: number;
  tag_id: number;
}

export type DetailsContainerProps = {
  minWidth?: number;
  isResponsiveContainer?: boolean;
};
