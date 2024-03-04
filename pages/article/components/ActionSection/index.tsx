import lang from 'common/lang';
import SaveContent from 'components/Icons/SaveContent';
import ButtonComp from 'components/buttonComp';
import Comments from 'components/Comments';
import PencilIcon from 'components/Icons/PencilIcon';
import ShareProfile from 'components/Atoms/ShareProfile';
import { IconWrapper } from 'components/Atoms/IconWrapper';
import UpvoteIcon from 'components/Icons/UpvoteIcon';
import { Gray50Container } from 'components/Atoms/GrayContainer';
import ActionBarLogo from 'components/Atoms/ActionBarLogo';
import { IInteractionItemTypes } from 'common/services/Aladdin/types';
import TrashIcon from 'components/Icons/TrashIcon';
import { theme } from 'common/theme';
import { ActionSectionProps } from './types';
import { Count } from './styles';
import PublisherMenu from '../../../../components/Molecules/PublisherMenu';

const {
  article: { publishArticle, unpublishArticle },
} = lang;

const ActionSection = ({
  publishDate,
  handleClick,
  isAuthor,
  saveArticle,
  comments,
  postComment,
  pinned,
  handleUpvote,
  upvoteCount,
  hasUserUpvoted,
  disablePinButton,
  articleId,
  itemType = IInteractionItemTypes.articles,
}: ActionSectionProps) => {
  const isPublished = !!publishDate;
  const publishButtonLabel = publishDate ? unpublishArticle : publishArticle;
  return (
    <Gray50Container>
      <ActionBarLogo />
      <IconWrapper
        onClick={saveArticle}
        type="button"
        disabled={disablePinButton}
      >
        <SaveContent active={pinned} />
      </IconWrapper>
      {isPublished && (
        <>
          <IconWrapper onClick={handleUpvote}>
            <UpvoteIcon active={hasUserUpvoted} />
            {!!upvoteCount && <Count>{upvoteCount || ''}</Count>}
          </IconWrapper>
          <Comments itemType={itemType} articleId={articleId} data={comments} postComment={postComment} />
          {!isAuthor && (
            <ShareProfile id={articleId} itemType={itemType} primary={false} />
          )}
          {isAuthor && (
            <>
              {/* TODO: Design to be confirmed
                    <IconWrapper>
                      <PencilIcon color={theme.palette.white[100].value} size={20} />
                    </IconWrapper>
               */}
              <PublisherMenu />
              <ShareProfile id={articleId} itemType={itemType} />
            </>
          )}
        </>
      )}
      {isAuthor && !isPublished && (
        <>
          <IconWrapper>
            <PencilIcon color={theme.palette.white[100].value} size={20} />
          </IconWrapper>
          <IconWrapper border="rgba(226, 35, 26, 0.15)" bg="rgba(226, 35, 26, 0.15)">
            <TrashIcon size={22} color={theme.palette.white[100].value} />
          </IconWrapper>
          <ButtonComp primary label={publishButtonLabel} onClick={handleClick} />
        </>
      )}
    </Gray50Container>
  );
};

export default ActionSection;
