export type UserContentTabProps = {
  userName: string;
  ownProfile: boolean;
  data: {
    articles: any, // TODO: type
    posts: any, // TODO: type
    followings: number;
    followers: number;
    location?: string | null;
    id: string;
    name?: string;
  };
  previousRoute?: string;
};
