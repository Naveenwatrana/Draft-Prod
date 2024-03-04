import lang from 'common/lang';
import SaveContent from 'components/Icons/SaveContent';
import ButtonComp from 'components/buttonComp';
import PencilIcon from 'components/Icons/PencilIcon';
import ShareProfile from 'components/Atoms/ShareProfile';
import { IconWrapper } from 'components/Atoms/IconWrapper';
import UpvoteIcon from 'components/Icons/UpvoteIcon';
import { IInteractionItemTypes } from 'common/services/Aladdin/types';
import TrashIcon from 'components/Icons/TrashIcon';
import { theme } from 'common/theme';
import PublisherMenu from 'components/Molecules/PublisherMenu';
import EllipsisIcon from 'components/Icons/EllipsisIcon';
import KebabMenu from 'components/KebabMenu';
import { ListItem } from 'components/KebabMenu/styles';
import { ActionSectionProps } from './types';
import { Count } from './styles';

const {
  article: { publishArticle, unpublishArticle },
} = lang;

const ActionSection = ({
  publishDate,
  handleClick,
  isAuthor,
  saveArticle,
  pinned,
  handleUpvote,
  upvoteCount,
  savedCount,
  hasUserUpvoted,
  disablePinButton,
  articleId,
  itemType = IInteractionItemTypes.articles,
  onDelete,
  onEdit,
}: ActionSectionProps) => {
  const isPublished = !!publishDate;
  const publishButtonLabel = publishDate ? unpublishArticle : publishArticle;
  return (
    <>
      <IconWrapper
        onClick={saveArticle}
        type="button"
        disabled={disablePinButton}
        data-cy="saveButton"
      >
        <SaveContent active={pinned} />
        {!!savedCount && <Count>{savedCount || ''}</Count>}
      </IconWrapper>
      {isPublished && (
        <>
          <IconWrapper onClick={handleUpvote} data-cy="upvoteButton">
            <UpvoteIcon active={hasUserUpvoted} />
            {!!upvoteCount && <Count>{upvoteCount || ''}</Count>}
          </IconWrapper>
          {!isAuthor && (
            <>
              <ShareProfile id={articleId} itemType={itemType} primary={false} />
              <KebabMenu
                position="top"
                icon={(
                  <IconWrapper data-cy="moreButton">
                    <EllipsisIcon />
                  </IconWrapper>
                )}
                list={(
                  <ListItem>
                    Report
                  </ListItem>
                )}
              />
            </>
          )}
          {isAuthor && (
            <>
              <ShareProfile id={articleId} itemType={itemType} primary={false} />
              <PublisherMenu onDelete={onDelete} onEdit={onEdit} />
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
    </>
  );
};

export default ActionSection;
