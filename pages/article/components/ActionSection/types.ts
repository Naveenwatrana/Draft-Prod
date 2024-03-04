import { IInteractionItemTypes } from 'common/services/Aladdin/types';
import { IComment } from 'components/Comments/types';

export type ActionSectionProps = {
  publishDate: string | null;
  handleClick: () => void;
  isAuthor: boolean;
  saveArticle: () => void;
  handleUpvote?: () => void;
  upvoteCount?: number;
  hasUserUpvoted?: boolean;
  comments: IComment[];
  postComment: (comment: string) => void;
  pinned: boolean;
  disablePinButton: boolean;
  articleId: string;
  itemType?: IInteractionItemTypes;
  onDelete?: () => void;
};
