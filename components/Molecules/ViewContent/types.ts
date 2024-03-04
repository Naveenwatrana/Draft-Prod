import { IInteractionItemTypes } from 'common/services/Aladdin/types';
import { CONTENT_TYPE, IUpVote, PINS_TYPES } from 'common/types';
import { PostCard } from 'components/CardCreationWizard/components/Cards/type';
import { IComment } from 'components/Comments/types';
import { IAuthorInfo, IUserCard } from 'pages/posts/types';
import { TagsEntity } from 'pages/pro/types';

export type ViewContentProps = {
    hasUserUpVoted: (upVotes: IUpVote[]) => boolean;
    setSkip?: (value: boolean) => void;
    comments?: IComment[]
    handleUpVote: () => void;
    data: PostViewResponse;
    postCardData?: PostCard;
    userIsAuthor: boolean;
    publish: () => void;
    publishLoading: boolean;
    postId: string;
    withFollowButton?: boolean;
    tertiaryText?: string;
    commentsData: any;
    contentType: CONTENT_TYPE;
    pinType: PINS_TYPES;
    itemType: IInteractionItemTypes;
    onDelete?: () => void;
    onEdit?: () => void;
    saveCard?: (value: string) => void;
  };

export type PostViewResponse = {
    content?: string;
    caption?: string;
    creator: IAuthorInfo;
    published_date: string | null;
    id: string;
    saved: boolean;
    cards: IUserCard[];
    upvotes: IUpVote[];
    saves_count: number;
    upvotes_count: number;
    creator_type: string;
    tags: TagsEntity[];
  }
