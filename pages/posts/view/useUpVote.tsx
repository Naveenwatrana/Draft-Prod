import { articleApi, useUpvoteArticleMutation } from 'pages/article/articleService';
import { useAppDispatch, useAppSelector } from 'common/hooks/state';
import { selectCurrentCompany, selectCurrentUser } from 'pages/account/authSlice';
import {
  IUpVote, MODAL_TYPES_DATA, UPVOTER_TYPES, PINS_TYPES,
} from 'common/types';
import { postsApi } from '../postsService';

const useUpVote = () => {
  const [upVoteArticleApi, upVoteArticleResponse] = useUpvoteArticleMutation();
  const currentCompany = useAppSelector(selectCurrentCompany);
  const currentUser = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();

  const handleUpVoteAPI = async (id: string, contentType: PINS_TYPES) => {
    const upVoter = currentCompany
      ? {
        upvoter_type: UPVOTER_TYPES.COMPANIES,
        upvoter_id: currentCompany.id,
      }
      : { upvoter_type: UPVOTER_TYPES.USERS, upvoter_id: currentUser.id };
    await upVoteArticleApi({
      ...upVoter,
      upvotable_type: contentType,
      upvotable_id: id,
    });
    dispatch(postsApi.util.invalidateTags(['posts']));
    dispatch(articleApi.util.invalidateTags(['articles']));
  };

  const hasUserUpVoted = (upVotes: IUpVote[]) => upVotes?.some((upVote: IUpVote) => {
    if (currentCompany) {
      return upVote.upvoter_id === currentCompany?.id && upVote.upvoter_type === MODAL_TYPES_DATA.COMPANY;
    }
    return (upVote.upvoter_id === currentUser?.id && upVote.upvoter_type === MODAL_TYPES_DATA.USER);
  });

  return {
    handleUpVoteAPI, upVoteArticleResponse, hasUserUpVoted,
  };
};

export default useUpVote;
