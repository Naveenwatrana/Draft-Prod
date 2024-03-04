/* eslint-disable @typescript-eslint/naming-convention */
import { useCommentMutation } from 'pages/article/articleService';
import { showNotification } from 'pages/pro/components/Projects/util';
import { useAppSelector } from 'common/hooks/state';
import { selectCurrentCompany } from 'pages/account/authSlice';
import { NotificationType } from 'pages/pro/components/Projects/ViewProject/types';
import { COMMENTER_TYPE, PINS_TYPES } from 'common/types';

const useComments = () => {
  const [commentAddApi, addCommentResult] = useCommentMutation();
  const currentCompany = useAppSelector(selectCurrentCompany);

  const postCommentAPI = async (comment: string, postId: string, entityType: PINS_TYPES) => {
    const commenterCompany = currentCompany ? {
      commenter_id: currentCompany.id,
      commenter_type: COMMENTER_TYPE.COMPANIES,
    } : {};
    commentAddApi({
      comment,
      entity_type: entityType,
      entity_id: postId,
      ...commenterCompany,
    }).catch((error) => showNotification(error?.data?.message, NotificationType.ERROR));
  };

  return {
    postCommentAPI, addCommentResult,
  };
};

export default useComments;
