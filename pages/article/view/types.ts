export type ITag = { tag: string; };

export type PreviewArticleProps = {
  articleData: {
    data: IArticleData;
  };
  commentsData: ICommentsData;
  origin: string;
  moreLikeThisData: {
    data: {
      data: IMoreLikeThisData[];
    }
  };
  loggedInUser: ILoggedInUser;
};
export interface IArticleData {
  id: number;
  content: string;
  published_date: string;
  creator_id: number;
  created_at: string;
  updated_at: string;
  content_id?: null;
  author?: null;
  title?: string;
  domain?: null;
  url?: null;
  video_urls?: null;
  image_urls?: null;
  cronycle_feed_id?: null;
  creator_type: string;
  tag: string;
  saved: boolean;
  caption?: string;
  tags?: (TagsEntity)[] | null;
  creator: Creator;
  cards?: (CardsEntity)[] | null;
  upvotes?: (UpvotesEntity)[] | null;
}
export interface TagsEntity {
  id: number;
  tag: string;
  type?: null;
  created_at?: null;
  updated_at?: null;
  pivot: Pivot;
}

export interface Pivot {
  article_id: number;
  tag_id: number;
}
export interface CardsEntity {
  id: number;
  type: string;
  fields: Fields;
  entity_id: number;
  entity_type: string;
  user_id: number;
  created_at: string;
  updated_at: string;
}
export interface UpvotesEntity {
  id: number;
  upvoter_id: number;
  upvoter_type: string;
  upvotable_id: number;
  upvotable_type: string;
  created_at: string;
  updated_at: string;
}
export interface ICommentsData {
  id: number;
  comment: string;
  entity_id: number;
  entity_type: string;
  parent_id?: null;
  commenter_id: number;
  created_at: string;
  updated_at: string;
  commenter_type: string;
  commenter: Commenter;
}
export interface Commenter {
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
export interface IMoreLikeThisData {
  content?: string | null;
  published_date?: string | null;
  creator_type?: string | null;
  creator_id?: number | null;
  created_at: string;
  updated_at: string;
  tag?: string | null;
  saved: boolean;
  creator?: Creator | null;
  cards?: (CardsEntity | null)[] | null;
  id: string;
  type: string;
  role?: string | null;
  location?: string | null;
  job_type?: string | null;
  salary_from?: number | null;
  salary_to?: number | null;
  background?: string | null;
  description?: string | null;
  user_id?: number | null;
  location_type?: string | null;
  snapshot?: string | null;
  snapshot_background?: string | null;
  status?: boolean | null;
  uuid?: string | null;
  external_ats?: null;
  external_ats_job_id?: null;
  company_id?: number | null;
  applied?: boolean | null;
  user?: User | null;
  company?: Company | null;
  content_id?: null;
  author?: string | null;
  title?: null;
  domain?: null;
  url?: null;
  video_urls?: null;
  image_urls?: null;
  cronycle_feed_id?: null;
  tags?: (null)[] | null;
}
export interface Creator {
  id: number;
  first_name?: string | null;
  email?: string | null;
  email_verified_at?: string | null;
  created_at: string;
  updated_at: string;
  failed_login_attempt?: number | null;
  last_failed_login_date?: null;
  deleted_at?: null;
  last_name?: string | null;
  profile_cover?: string | null;
  onboarding_status?: boolean | null;
  mantra?: string | null;
  onboarding_step?: number | null;
  status?: string | null;
  username: string;
  location?: string | null;
  name: string;
  presigned_profile_cover?: string | null;
  saved: boolean;
  followed: boolean;
  url?: string | null;
  logo?: string | null;
  headcount?: string | null;
  user_id?: number | null;
  summary?: null;
  gics_sectors?: string | null;
  gics_industry_groups?: string | null;
  gics_industries?: string | null;
  gics_sub_industries?: string | null;
  number_of_funding_rounds?: string | null;
  last_funding_stage?: string | null;
  list_of_investors?: string | null;
  last_funding_announcement_date?: null;
  list_of_funding_rounds_closed?: string | null;
  total_funding_amount?: null;
  ceo_name?: string | null;
  competitor_list?: string | null;
  genz_work?: string | null;
  mission_statement?: string | null;
  technologies_used?: string | null;
  usp?: string | null;
  ceo_quote?: string | null;
  purpose?: string | null;
  linkedin_url?: string | null;
  company_tags?: string | null;
  year_founded?: string | null;
  hq_location?: string | null;
  company_type?: string | null;
  ipo_date?: null;
  market_capitalization?: string | null;
  executive_leadership_team?: string | null;
  learning_opportunities?: string | null;
  new_challenges?: string | null;
}
export interface Fields {
  mantra?: string | null;
  media?: string | null;
  heading?: string | null;
  description?: string | null;
  links?: (LinksEntity)[] | null;
}

export interface LinksEntity {
  url: string;
  name: string;
}
export interface User {
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
  profile_cover?: null;
  onboarding_status: boolean;
  mantra?: null;
  onboarding_step: number;
  status: string;
  username: string;
  name: string;
  presigned_profile_cover?: null;
  saved: boolean;
}
export interface Company {
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
  year_founded?: null;
  hq_location?: null;
  company_type?: null;
  ipo_date?: null;
  market_capitalization?: null;
  executive_leadership_team?: null;
  learning_opportunities?: null;
  new_challenges?: null;
}
export interface ILoggedInUser {
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
  education?: (EducationEntity)[] | null;
}
export interface CompaniesEntity {
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
  verified_at?: null;
  verification_code?: null;
  work_email?: null;
  saved: boolean;
  followed: boolean;
}
export interface AssociatedCompaniesEntity {
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
  verified_at?: null;
  verification_code?: null;
  work_email?: null;
  saved: boolean;
  followed: boolean;
  pivot: Pivot;
}
export interface FollowersEntity {
  id: number;
  follower_id: number;
  followable_id: number;
  followable_type: string;
  follower_type: string;
  created_at: string;
  updated_at: string;
  follower: FollowerOrFollowable;
}
export interface FollowerOrFollowable {
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
export interface BlocksEntity {
  id: number;
  type: string;
  fields: Fields;
  blockable_id: number;
  blockable_type: string;
  sort: number;
  created_at: string;
  updated_at: string;
  tags?: (null)[] | null;
}
export interface EducationEntity {
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