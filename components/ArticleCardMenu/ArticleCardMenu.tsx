import { ArticleCardMenuContainer } from './styles';
import { ArticleCardMenuProps } from './types';

const ArticleCardMenu = ({ children }: ArticleCardMenuProps) => {
  return (
    <ArticleCardMenuContainer>
      {children}
    </ArticleCardMenuContainer>
  );
};

export default ArticleCardMenu;
