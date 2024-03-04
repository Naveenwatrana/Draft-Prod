import { ICommentsData } from 'pages/article/view/types';

export type ViewShareLinkPageProps = {
  loggedInUser: boolean;
  commentsData?: ICommentsData;
};
