import { ActionBarProps } from './types';
import ArticleAuthorView from './ArticleAuthorView';

const ActionBar = ({ userIsAuthor }: ActionBarProps) => {
  return (
    <ArticleAuthorView isAuthor={userIsAuthor} />
  );
};

export default ActionBar;
