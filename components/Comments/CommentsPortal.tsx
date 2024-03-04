import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { createPortal } from 'react-dom';
import useOutsideAlerter from 'common/hooks/useOutsideAlerter';
import { useNavigate } from 'common/utils/router-fill';
import { loginUrl } from 'common/utils/network/appRouts';
import { useLoggedInUser } from 'common/hooks/useLoggedInUser';
import lang from 'common/lang';
import {
  CommentsContainer,
  Modal,
  CommentsTitle,
  CommentsInput,
  AddCommentButton,
  NoComments,
} from './style';
import { Comment } from './Comment';
import { IComment } from './types';

const {
  comments: {
    title, placeholder, addComment, noComment,
  },
} = lang;

type CommentsPortalProps = {
  postComment: (comment: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  comments: IComment[];
};
const CommentsPortal = ({
  open, setOpen, postComment, comments,
}: CommentsPortalProps) => {
  const router = useRouter();
  const [commentInput, setCommentInput] = useState<string>('');
  const navigate = useNavigate();
  const loggedInUser = useLoggedInUser();
  const wrapperRef = useRef<HTMLDivElement>(null);
  useOutsideAlerter({
    ref: wrapperRef,
    outSideClick: () => {
      setOpen(false);
      if (router.query.comments) {
        router.push({ query: { id: router.query.id } });
      }
    },
  });
  const handleUnAuthUser = () => {
    if (!loggedInUser) {
      navigate(loginUrl);
    }
  };
  useEffect(() => {
    if (router.query.comments) setOpen(true);
  }, [router.query.comments]);
  return (
    <>
      {createPortal(
        <Modal open={open}>
          <CommentsContainer ref={wrapperRef}>
            <CommentsTitle>
              {`${title}${!comments.length ? '' : `(${comments.length})`}`}
            </CommentsTitle>
            <CommentsInput
              placeholder={placeholder}
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              data-cy="commentsTextArea"
              onFocus={handleUnAuthUser}
            >
            </CommentsInput>
            <AddCommentButton
              primary
              label={addComment}
              disabled={!commentInput.trim()}
              type="submit"
              data-cy="addComment"
              onClick={() => {
                postComment(commentInput);
                setCommentInput('');
              }}
            />
            {comments?.map((c) => (
              <Comment data-cy={`comment-${c.id}`} profile={c?.commenter?.presigned_profile_cover || c?.commenter?.logo} key={c.id} author={c?.commenter?.name} comment={c.comment} date={new Date(c.createdAt)} />
            ))}
            {!comments?.length && <NoComments>{noComment}</NoComments>}
          </CommentsContainer>
        </Modal>,
        document.body,
      )}
    </>
  );
};
export default CommentsPortal;
