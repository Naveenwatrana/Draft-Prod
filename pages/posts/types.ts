export type IAuthorInfo = {
    first_name: string;
    last_name: string;
    presigned_profile_cover: string;
    logo?: string;
    name: string;
    id: string;
    followed: boolean;
    username: string;
    type?: string;
    cards?: IUserCard[]
  };
export type IUserCard = {
    id: string;
    type: string;
    fields: {
      mantra: string;
      description: string;
      heading: string;
      links: {
        name: string;
        url: string;
      }[];
      media: string;
    };
  };
