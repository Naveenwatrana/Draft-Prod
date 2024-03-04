import lang from 'common/lang';
import { theme } from 'common/theme';
import { Gray50Container } from 'components/Atoms/GrayContainer';
import { IconWrapper } from 'components/Atoms/IconWrapper';
import PencilIcon from 'components/Icons/PencilIcon';
import TrashIcon from 'components/Icons/TrashIcon';
import ActionBarLogo from 'components/Atoms/ActionBarLogo';
import { ArticleAuthorView } from './types';
import { ActionButtons } from './style';
const {
  article: { publishArticle, unpublishArticle },
} = lang;

const ArticleAuthorView = ({ isAuthor }: ArticleAuthorView) => {
  const publishDate = null;
  const publishButtonLabel = publishDate ? unpublishArticle : publishArticle;
  const handleClick = () => undefined;
  return (
    <Gray50Container width={285}>
      <ActionBarLogo />
      {isAuthor && (
        <>
          <IconWrapper>
            <PencilIcon size={22} color={theme.palette.white[100].value} />
          </IconWrapper>
          <IconWrapper border="rgba(226, 35, 26, 0.15)" bg="rgba(226, 35, 26, 0.15)">
            <TrashIcon size={22} color={theme.palette.white[100].value} />
          </IconWrapper>
          <ActionButtons primary label={publishButtonLabel} onClick={handleClick} />
        </>
      )}
      {!isAuthor && (
        <IconWrapper>
          <PencilIcon size={22} color={theme.palette.white[100].value} />
        </IconWrapper>
      )}
    </Gray50Container>
  );
};

export default ArticleAuthorView;
