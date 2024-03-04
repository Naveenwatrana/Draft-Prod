import { useMemo, useState } from 'react';
import lang from 'common/lang';
import { ViewContentProps } from 'components/Molecules/ViewContent/types';
import { Avatar } from 'components/NavBar/styles';
import TextWithHashtags from 'components/CardCreationWizard/components/HashtagOutput';
import {
  IInteractionEventValueType,
  IInteractionTypes, IInteractorTypes, ISaveInteractionPayload,
} from 'common/services/Aladdin/types';
import { IComment, ICommentDataResponse } from 'components/Comments/types';
import { formatCommentsData } from 'common/utils/helpers';
import useComments from 'common/hooks/useComments';
import { useSaveContent } from 'common/hooks/useSaveContent';
import useAladdinInteraction from 'common/services/Aladdin/useAladdinInteraction';
import { useAppSelector } from 'common/hooks/state';
import { selectCurrentCompany } from 'pages/account/authSlice';
import { AddCommentButton } from 'components/Comments/style';
import { useLoggedInUser } from 'common/hooks/useLoggedInUser';
import { useNavigate } from 'common/utils/router-fill';
import { loginUrl } from 'common/utils/network/appRouts';
import {
  DetailContainer,
  DetailDataContainer,
  UserInfo,
  UserName,
  CaptionContainer,
  Caption,
  MoreSection,
  ActionContainer,
  MessageInputSection,
  DividerHr,
} from './styles';
import ActionSection from './ActionSection';
import CommentsPortal from './Comments/CommentsPortal';
import { CommentDivider, PostCommentContainer, CommentsInput } from './Comments/style';

const {
  comments: {
    placeholder, post,
  },
} = lang;
const DetailSection = ({
  hasUserUpVoted, handleUpVote, data, userIsAuthor, publish, postId, commentsData, pinType, itemType, setSkip, comments, onEdit,
  onDelete, saveCard,
}: ViewContentProps) => {
  const [fullCaption, setFullCaption] = useState(false);
  const navigate = useNavigate();
  const currentCompany = useAppSelector(selectCurrentCompany);
  const [commentInput, setCommentInput] = useState<string>('');
  const { postCommentAPI } = useComments();
  const { saveContent, isLoading: pinArticleLoading } = useSaveContent();
  const { saveInteraction } = useAladdinInteraction();
  const loggedInUser = useLoggedInUser();

  const commentsD: IComment[] = useMemo(
    () => commentsData?.data?.length ? commentsData.data.map((commentData : ICommentDataResponse) => formatCommentsData(commentData)) : [],
    [commentsData],
  );
  const handleUnAuthUser = () => {
    if (!loggedInUser) {
      navigate(loginUrl);
    }
  };

  const postComment = async (comment: string) => {
    await postCommentAPI(comment, postId, pinType);
    if (setSkip) {
      setSkip(false);
    }
    const eventDetail: ISaveInteractionPayload = {
      itemId: postId,
      itemType,
      eventType: IInteractionTypes.comments,
      eventValue: IInteractionEventValueType.postComment,
    };
    if (currentCompany) {
      eventDetail.interactorType = IInteractorTypes.companies;
    }
    saveInteraction(eventDetail);
  };

  const saveArticle = async (articleId: string) => {
    if (saveCard) {
      return saveCard(articleId);
    }
    return saveContent(articleId, pinType, itemType);
  };
  return (
    <DetailContainer itemType={itemType}>
      <DetailDataContainer>
        <UserInfo>
          <Avatar
            rectangle={!(data.creator?.type === "Company")}
            url={data.creator?.type === "Company" ? data.creator?.logo : data.creator?.cards?.[0]?.fields?.media}
          >
            {!data.creator?.cards?.[0]?.fields?.media && data.creator?.first_name.charAt(0)}
          </Avatar>
          <UserName onClick={() => { navigate(`/${data.creator?.type === "Company" ? 'org' : 'pro'}/${data.creator.username}`); }}>{data.creator?.name}</UserName>
        </UserInfo>
        {data?.caption && (
          <CaptionContainer>
            <Caption style={{ height: !fullCaption && data?.caption?.length > 90 ? '36px' : 'auto' }}>
              {data?.caption?.length > 90 && fullCaption ? <TextWithHashtags text={data?.caption || ''} showLess={() => { setFullCaption(!fullCaption); }} />
                : <TextWithHashtags text={data?.caption || ''} />}
              {data?.caption?.length > 90 && !fullCaption && <MoreSection onClick={() => { setFullCaption(!fullCaption); }}>{`... ${fullCaption ? 'Less' : 'More'}`}</MoreSection>}
            </Caption>
          </CaptionContainer>
        )}
        <ActionContainer>
          <ActionSection
            comments={commentsD}
            publishDate={data.published_date}
            handleClick={publish}
            isAuthor={userIsAuthor}
            saveArticle={() => saveArticle(data.id)}
            postComment={postComment}
            handleUpvote={handleUpVote}
            upvoteCount={data.upvotes_count}
            savedCount={data.saves_count}
            hasUserUpvoted={hasUserUpVoted(data.upvotes)}
            pinned={data.saved}
            disablePinButton={pinArticleLoading}
            articleId={data.id}
            itemType={itemType}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        </ActionContainer>
        <DividerHr />
        <CommentsPortal postComment={postComment} comments={comments || commentsD} />
      </DetailDataContainer>
      <MessageInputSection>
        <CommentDivider />
        <PostCommentContainer>
          <CommentsInput
            placeholder={placeholder}
            value={commentInput}
            onChange={(e) => {
              if (e.target.value.length <= 150) {
                setCommentInput(e.target.value.replace(/\n/g, ''));
              } else {
                setCommentInput(e.target.value.replace(/\n/g, '').substring(0, 150));
              }
            }}
            data-cy="commentsTextArea"
            onFocus={handleUnAuthUser}
          >
          </CommentsInput>
          <AddCommentButton
            primary
            label={post}
            type="submit"
            variant="link"
            data-cy="addComment"
            onClick={() => {
              postComment(commentInput);
              setCommentInput('');
            }}
          />
        </PostCommentContainer>
      </MessageInputSection>
    </DetailContainer>
  );
};

export default DetailSection;
