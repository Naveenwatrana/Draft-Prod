export type IBlockData = {
  blockable_id?: string;
  sort?: number;
  fields: {
    description?: string;
    title?: string;
    media?: string | string[];
    ongoing?: number;
    start_date?: string;
    end_date?: string;
  };
  tags?: [
    {
      id: string;
      tag: string;
    }
  ]
  id: string;
  type: string;
};
export type GithubBlockProps = {
  username: string;
  gitBlockTitle?: string;
  gitBlockDescription?: string;
  buttonText?: string;
  maxLength?: boolean;
  minLength?: boolean;
};
