import React from 'react';
import lang from 'common/lang';
import {
  CommentsTitle,
  NoComments,
  NoCommentsHeader,
} from './style';
import { Comment } from './Comment';
import { IComment } from './types';

const {
  comments: {
    title, startConversation, noCommentYet,
  },
} = lang;

type CommentsPortalProps = {
  postComment?: (comment: string) => void;
  comments: IComment[];
};
const CommentsPortal = ({
  postComment, comments,
}: CommentsPortalProps) => {
  return (
    <>
      <CommentsTitle>
        {`${title}${!comments.length ? '' : ` (${comments.length})`}`}
      </CommentsTitle>
      {/* <CommentsWrapper> */}
      {comments?.map((c) => (
        <Comment data-cy={`comment-${c.id}`} profile={c?.commenter?.cards?.[0]?.fields?.media} key={c.id} author={c?.commenter?.name} comment={c.comment} date={new Date(c.createdAt)} />
      ))}
      {!comments?.length && (
        <NoComments>
          <NoCommentsHeader>{noCommentYet}</NoCommentsHeader>
          <div>{startConversation}</div>
        </NoComments>
      )}
      {/* </CommentsWrapper> */}
    </>
  );
};
export default CommentsPortal;
