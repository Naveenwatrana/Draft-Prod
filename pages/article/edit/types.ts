export type EditArticlePageProps = {
  loggedInUser: boolean;
  articleData: ArticleData;
};
export type EditArticleProps = {
  loggedInUser: boolean;
  articleData: ArticleData;
};
export type ArticleData = {
  id: number;
  content: string;
  published_date: string;
  creator_id: number;
  created_at: string;
  updated_at: string;
  content_id?: null;
  author?: null;
  title: string;
  domain?: null;
  url?: null;
  video_urls?: null;
  image_urls?: null;
  cronycle_feed_id?: null;
  creator_type: string;
  meltwater_doc_id?: null;
  meltwater_match_sentence?: null;
  meltwater_type?: null;
  meltwater_source_name?: null;
  sub_title: string;
  preview_image: string;
  upvotes_count: number;
  saves_count: number;
  tag: string;
  saved: boolean;
  comments_count: number;
  tags?: (TagsEntity)[] | null;
  creator: Creator;
  cards?: (null)[] | null;
  upvotes?: (UpvotesEntity)[] | null;
}
export type TagsEntity = {
  id: number;
  tag: string;
  type: string;
  pivot: Pivot;
}
export type Pivot = {
  article_id: number;
  tag_id: number;
}
export type Creator = {
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
  onboarding_status: boolean;
  onboarding_step?: null;
  status: string;
  username: string;
  location: string;
  is_personalised: boolean;
  name: string;
  saved: boolean;
  followed: boolean;
  cards?: (CardsEntity)[] | null;
}
export type CardsEntity = {
  id: number;
  type: string;
  fields: Fields;
  entity_id: number;
  entity_type: string;
  user_id: number;
  created_at: string;
  updated_at: string;
}
export type Fields = {
  media: string;
  mantra?: string | null;
  description?: string | null;
}
export type UpvotesEntity = {
  id: number;
  upvoter_id: number;
  upvoter_type: string;
  upvotable_id: number;
  upvotable_type: string;
  created_at: string;
  updated_at: string;
}
