/* eslint-disable @typescript-eslint/naming-convention */
import { dateFormatYMD } from 'common/constants';
import { useAppSelector } from 'common/hooks/state';
import { formatDate } from 'common/utils/date/dateFormat';
import { useRouter } from 'next/router';
import { getCardData, uploadMediaFilesToAkamai } from 'common/utils/uploadMediaFilesToAkamai';
import { getCards } from 'components/CardCreationWizard/slice';
import { selectCurrentCompany, selectCurrentUser } from 'pages/account/authSlice';
import { ICreatePost } from 'pages/post/create/type';
import { useCreatePostMutation, useDeletePostMutation, useUpdatePostMutation } from 'pages/posts/postsService';
import { NotificationType } from 'pages/pro/components/Projects/ViewProject/types';
import { showNotification } from 'pages/pro/components/Projects/util';
import { useCallback, useState } from 'react';
import { uploadMediaFile } from 'utils/uploadMediaFile';

const usePosts = () => {
  const [updatePostAPi, updatePostResults] = useUpdatePostMutation();
  const [deletePostApi, deletePostResults] = useDeletePostMutation();
  const currentCompany = useAppSelector(selectCurrentCompany);
  const router = useRouter();
  const isCurrentUser = useAppSelector(selectCurrentUser);
  const [createPostApi, result] = useCreatePostMutation();
  const savedCards = useAppSelector(getCards);
  const [loading, setLoading] = useState(false);

  const publishApi = async (userIsAuthor: boolean, id: string, body: { publish: number }) => {
    const publishForCompany = currentCompany?.username ? currentCompany?.username : '';
    if (userIsAuthor) {
      await updatePostAPi({ id, companyUsername: publishForCompany, body }).unwrap();
    }
  };
  const addPostUser = useCallback(async (tags: string[]) => {
    const companyDetails = {
      creator_type: 'companies',
      creator_id: currentCompany?.id,
    };
    setLoading(true);
    const cardsData = getCardData(savedCards);
    const cardsWithMedia = await uploadMediaFilesToAkamai(cardsData, isCurrentUser?.username);

    const response = await createPostApi({
      tag_ids: tags,
      cards: cardsWithMedia,
      ...(currentCompany ? companyDetails : {}),
    }).unwrap();
    setLoading(false);
    return response.data.id;
  }, [
    savedCards, isCurrentUser?.username, createPostApi, currentCompany,
  ]);

  const createPost = useCallback(async (postData: ICreatePost) => {
    setLoading(true);
    const creatorDetails = {
      creator_type: currentCompany?.id ? 'companies' : 'users',
      creator_id: currentCompany?.id || isCurrentUser.id,
    };
    const uploadedImages = postData?.media?.map(async (mediaToUpload) => {
      if (mediaToUpload.file) {
        const media = await uploadMediaFile(
          mediaToUpload.file,
          isCurrentUser.username,
        );
        return media;
      }
    });
    const media = uploadedImages ? await Promise.all(uploadedImages) : [];
    return createPostApi({
      tag_ids: postData.tags.map((tag) => Number(tag.value)),
      media,
      ...creatorDetails,
      caption: postData.caption,
      published_date: formatDate(new Date().toString(), dateFormatYMD),
    })
      .unwrap()
      .then((data) => {
        router.replace({ pathname: `/posts/${data.data.id}`, query: { created: 1 } });
      })
      .catch((error) => showNotification(error?.data?.message, NotificationType.ERROR))
      .finally(() => setLoading(false));
  }, [createPostApi, currentCompany?.id, isCurrentUser?.id, isCurrentUser?.username]);

  const handleDelete = useCallback((id: string) => {
    deletePostApi(id).unwrap().then(() => {
      router.replace('/');
    }).catch((error) => showNotification(error?.data?.message, NotificationType.ERROR));
  }, [deletePostApi]);

  return {
    publishApi, publishLoading: updatePostResults.isLoading, addPostUser, isLoading: loading || result.isLoading || deletePostResults.isLoading, createPost, handleDelete,
  };
};

export default usePosts;
