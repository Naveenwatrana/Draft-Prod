import { IOption } from 'components/MultipleInputTextArea/types';
import { useNavigate } from 'common/utils/router-fill';
import { defaultEditorState, emptyBreakTag } from 'pages/article/const';
import React, { useEffect, useMemo, useState } from 'react';
import { setCurrentTab } from 'pages/workspace/workspaceSlice';
import { useAppDispatch } from 'common/hooks/state';
import { resetState } from 'components/CardCreationWizard/slice';
import NewArticleFlow from 'pages/article/components/NewArticleFlow/EditArticle';
import Navbar from 'components/Molecules/Content/Navbar';
import Loader from 'components/Loader/Loader';
import lang from 'common/lang';
import { articleUrl } from 'common/utils/network/appRouts';
import { ICreateArticle } from 'pages/article/components/NewArticleFlow/types';
import { ICreatePost } from 'pages/post/create/type';
import { useRouter } from 'next/router';
import { useParams } from 'next/navigation';
import { Tabs } from 'pages/workspace/type';
import useArticle from 'pages/article/hooks/articles';
import { ArticleSteps } from '../create/types';
import { Container } from '../create/CreateArticleDesktop/style';
import { EditArticleProps } from './types';

const { creatingArticle } = lang.article;

const EditArticlePage = ({ loggedInUser, articleData }: EditArticleProps) => {
  const [step, setStep] = useState(ArticleSteps.CREATE);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState<IOption[]>([]);
  const [data, setData] = useState<string>(articleData.content ? articleData.content : defaultEditorState);
  const { editArticle } = useArticle();
  const { id } = useParams();
  const [title, setTitle] = useState(articleData.title);
  const router = useRouter();
  const navigate = useNavigate();
  useEffect(() => {
    if (articleData.tags) {
      const apiTags = articleData.tags.map((tag) => ({ label: tag.tag, value: `${tag.id}` }));
      setTags([...apiTags]);
    }
  }, [articleData.tags]);

  const handleBack = () => {
    dispatch(setCurrentTab(Tabs.CONTENT));
    dispatch(resetState());
    router.back();
  };

  const handleCancel = () => {
    dispatch(setCurrentTab(Tabs.CONTENT));
    dispatch(resetState());
    navigate('/workspace');
  };

  const disabled: boolean = useMemo(() => {
    const mySubString = data.substring(
      data.indexOf('>') + 1,
      data.lastIndexOf('<'),
    );
    return mySubString === emptyBreakTag || tags?.length === 0 || !title;
    return false;
  }, [data, tags]);

  const publish = async (values: ICreateArticle | ICreatePost) => {
    const articleTitle = 'title' in values ? values.title : '';
    try {
      setLoading(true);
      const { success, response } = await editArticle(id as string, values);
      setLoading(false);
      if (success && response) {
        navigate(articleUrl(parseInt(response), articleTitle));
      }
    } catch (error) {
      console.error('Error in saving article.');
    }
  };
  return (
    <Container>
      {loading && <Loader />}
      <Navbar step={step} noStepper={false} title={creatingArticle} handleBack={handleBack} />
      <NewArticleFlow
        value={data}
        onChange={setData}
        articleTitle={articleData.title}
        isEditing={disabled}
        tags={tags}
        onTagChange={setTags}
        image={articleData.preview_image}
        caption={articleData.sub_title}
        setStep={(articleTitle) => {
          setStep(step + 1);
          setTitle(articleTitle);
        }}
        disabled={disabled}
        cancelArticle={handleCancel}
        publish={publish}
      />
    </Container>
  );
};

export default EditArticlePage;
