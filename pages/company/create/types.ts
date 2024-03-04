import { ITagResponse } from 'pages/pro/components/Projects/types';

export enum CreateCompanySteps {
  URL = 1,
  VALIDATE_EMAIL = 2,
  COMPLETE_PROFILE = 3,
}
export enum MobileCreateCompanySteps {
  URL = 1,
  VALIDATE_EMAIL = 2,
  COMPLETE_PROFILE = 3,
  CREATE_CARDS = 4,
}

export type ICreateCompanyResponse = {
  created_at: string;
  headcount: string;
  id: number;
  tags: ITagResponse[] | null;
  logo: string;
  name: string;
  updated_at: string;
  url: string;
  user_id: number;
  username: string;
};
