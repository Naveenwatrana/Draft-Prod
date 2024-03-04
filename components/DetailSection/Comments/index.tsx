import CommentIcon from 'components/Icons/CommentIcon';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { IInteractionItemTypes, IInteractionTypes, ISaveInteractionPayload } from 'common/services/Aladdin/types';
import useAladdinInteraction from 'common/services/Aladdin/useAladdinInteraction';
import { IconWrapper } from 'components/Atoms/IconWrapper';
import {
  CommentsCount,

} from './style';
import { IComment } from './types';

const CommentsPortal = dynamic(() => import('./CommentsPortal'), {
  ssr: false,
});

type CommentsProps = {
  data: IComment[];
  postComment: (comment: string) => void;
  articleId: string;
  itemType: IInteractionItemTypes;
}

const Comments = ({
  data: comments, postComment, articleId, itemType,
}: CommentsProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const { saveInteraction } = useAladdinInteraction();
  useEffect(() => {
    if (open) document.documentElement.style.overflow = 'hidden';
    else document.documentElement.style.overflow = 'auto';
    return () => { document.documentElement.style.overflow = 'auto'; };
  }, [open]);
  const showComments = () => {
    setOpen(!open);
    const eventDetail: ISaveInteractionPayload = {
      itemId: articleId,
      itemType,
      eventType: IInteractionTypes.comments,
      eventValue: 1,
    };
    saveInteraction(eventDetail);
  };
  return (
    <>
      <IconWrapper data-testid="commentsIcon" data-cy="commentsIcon" onClick={showComments}>
        <CommentIcon />
        {!!comments.length && <CommentsCount>{comments.length}</CommentsCount>}
      </IconWrapper>
      <CommentsPortal postComment={postComment} comments={comments} />
    </>
  );
};

export default Comments;
