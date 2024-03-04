/* eslint-disable @typescript-eslint/naming-convention */
import { articleApi, usePinArticleMutation } from 'pages/article/articleService';
import { linksApi } from 'pages/link/create/LinkService';
import { showNotification } from 'pages/pro/components/Projects/util';
import { selectCurrentCompany } from 'pages/account/authSlice';
import { NotificationType } from 'pages/pro/components/Projects/ViewProject/types';
import useAladdinInteraction from 'common/services/Aladdin/useAladdinInteraction';
import { PINS_TYPES } from 'common/types';
import { IInteractionEventValueType, IInteractionItemTypes, IInteractionTypes } from 'common/services/Aladdin/types';
import { postsApi } from 'pages/posts/postsService';
import { userApi } from 'pages/account/userService';
import lang from 'common/lang';
import { useAppDispatch, useAppSelector } from './state';

type ISaveApiResponse = {
  data: boolean | {
    id: string;
    type: string;
  };
};
const {
  companyRemovedSuccess, companySavedSuccess, articleSaveError, articleSavedSuccess, articleRemovedSuccess,
  jobsRemovedSuccess, jobsSavedSuccess, jobsSaveError, userRemovedSuccess, userSavedSuccess, userSaveError, postSavedSuccess, postSaveError, postRemovedSuccess,
  linkSavedSuccess, linkSaveError, linkRemovedSuccess,
} = lang.article;

const messages = {
  [PINS_TYPES.COMPANIES]: {
    success: companySavedSuccess,
    error: articleSaveError,
    removeSuccess: companyRemovedSuccess,
  },
  [PINS_TYPES.ARTICLES]: {
    success: articleSavedSuccess,
    error: articleSaveError,
    removeSuccess: articleRemovedSuccess,
  },
  [PINS_TYPES.JOBS]: {
    success: jobsSavedSuccess,
    error: jobsSaveError,
    removeSuccess: jobsRemovedSuccess,
  },
  [PINS_TYPES.USER]: {
    success: userSavedSuccess,
    error: userSaveError,
    removeSuccess: userRemovedSuccess,
  },
  [PINS_TYPES.POSTS]: {
    success: postSavedSuccess,
    error: postSaveError,
    removeSuccess: postRemovedSuccess,
  },
  [PINS_TYPES.LINKS]: {
    success: linkSavedSuccess,
    error: linkSaveError,
    removeSuccess: linkRemovedSuccess,
  },
};

export const useSaveContent = () => {
  const [pinArticleApi, pinArticleApiResponse] = usePinArticleMutation();
  const userIsCompany = useAppSelector(selectCurrentCompany);
  const dispatch = useAppDispatch();
  const { saveInteraction } = useAladdinInteraction();

  const saveContent = async (itemId: string, contentType: PINS_TYPES, itemType: IInteractionItemTypes) => {
    const companyDetails = {
      saver_type: 'companies',
      saver_id: userIsCompany?.id,
    };
    const userDetails = {
      savable_id: itemId,
      savable_type: contentType,
    };
    await pinArticleApi({
      ...userDetails,
      ...(userIsCompany ? companyDetails : {}),
    }).unwrap().then((pinnedData: ISaveApiResponse) => {
      // Aladdin interaction event
      saveInteraction({
        itemId,
        itemType,
        eventType: IInteractionTypes.Save,
        eventValue: IInteractionEventValueType.brandTab,
      });
      // Aladdin interaction event
      dispatch(postsApi.util.invalidateTags(['posts']));
      dispatch(articleApi.util.invalidateTags(['articles']));
      dispatch(linksApi.util.invalidateTags(['link']));
      dispatch(userApi.util.invalidateTags(['User']));

      if (typeof pinnedData.data === 'boolean') {
        showNotification(`${messages[contentType as keyof typeof messages].removeSuccess}!`, NotificationType.SUCCESS);
        return;
      }
      showNotification(`${messages[contentType as keyof typeof messages].success}!`, NotificationType.SUCCESS);
    })
      .catch(() => {
        showNotification(`${messages[contentType as keyof typeof messages].error}!`, NotificationType.ERROR);
      });
  };

  return {
    saveContent,
    isLoading: pinArticleApiResponse.isLoading,
  };
};
