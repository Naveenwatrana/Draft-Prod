export type ActionBarProps = {
  userIsAuthor: boolean;
};

export type ArticleAuthorView = {
  isAuthor: boolean;
};
export type JobActionBarProps = {
  isAuthor: boolean;
  children: React.ReactNode;
  jobSavedStatus: boolean;
  id: string;
  setSkip: () => void;
  isJobOpen: boolean;
};
