import { useAppSelector } from 'common/hooks/state';
import { selectCurrentCompany, selectCurrentUser } from 'pages/account/authSlice';
import { IOption } from 'components/MultipleInputTextArea/types';
import { uploadMediaFile } from 'utils/uploadMediaFile';
import { useArticleMutation, usePublishArticleMutation, useUpdateArticleMutation } from '../articleService';
import { IArticleAPIPayload, IArticleHookResponse } from '../create/types';
import { CREATOR_TYPE } from '../components/CreateArticleStep3/types';

const useArticle = () => {
  const [saveArticle, { isLoading }] = useArticleMutation();
  const [publishArticleApi, publishArticleApiResponse] = usePublishArticleMutation();
  const [updateArticleApi] = useUpdateArticleMutation();
  const isCurrentUser = useAppSelector(selectCurrentUser);
  const currentCompany = useAppSelector(selectCurrentCompany);
  const publishArticle = async (article: IArticleAPIPayload): Promise<IArticleHookResponse> => {
    const filePath = await uploadMediaFile(article.media.file, isCurrentUser?.username);
    return new Promise((res) => {
      const creatorCompany = currentCompany ? {
        creator_id: currentCompany.id,
        creator_type: CREATOR_TYPE.COMPANIES,
      } : {};
      saveArticle({
        content: article.content,
        tag_ids: article.tags.map((tag) => tag.value),
        title: article.title,
        sub_title: article.subTitle,
        preview_image: filePath,
        published_date: article.published_date,
        ...creatorCompany,
      }).unwrap()
        .then((response) => {
          res({ success: true, response: response.data.id });
        })
        .catch((error) => {
          res({ success: false, error });
        });
    });
  };

  const publishArticles = async (userIsAuthor: boolean, postId: string, publishDate: string) => {
    const publishForCompany = currentCompany?.username ? { company: currentCompany?.username } : {};
    if (userIsAuthor) {
      await publishArticleApi({ id: postId, data: { publish: !publishDate, ...publishForCompany } }).unwrap();
    }
  };
  const editArticle = async (id: string, data: any): Promise<IArticleHookResponse> => {
    let filePath = data?.media;
    if (filePath && typeof filePath === 'object') {
      filePath = await uploadMediaFile(filePath[0].file, isCurrentUser?.username);
    }
    const payload = {
      ...data,
      preview_image: filePath,
      tag_ids: data.tags.map((tag: IOption) => tag.value),
      sub_title: data.caption,
    };
    const editForCompany = currentCompany?.username ? { company: currentCompany?.username } : {};
    return new Promise((res) => {
      updateArticleApi({ id, data: { ...payload, ...editForCompany } }).unwrap()
        .then((response) => {
          res({ success: true, response: response.data.id });
        })
        .catch((error) => {
          res({ success: false, error });
        });
    });
  };
  return {
    publishArticle, isLoading, publishArticles, publishLoading: publishArticleApiResponse.isLoading, editArticle,
  };
};

export default useArticle;
