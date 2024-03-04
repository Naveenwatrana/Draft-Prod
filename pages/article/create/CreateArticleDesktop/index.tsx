import { IOption } from 'components/MultipleInputTextArea/types';
import { useNavigate } from 'common/utils/router-fill';
import { defaultEditorState, emptyBreakTag } from 'pages/article/const';
import React, { useEffect, useMemo, useState } from 'react';
import { setCurrentTab } from 'pages/workspace/workspaceSlice';
import { useAppDispatch } from 'common/hooks/state';
import { resetState } from 'components/CardCreationWizard/slice';
import NewArticleFlow from 'pages/article/components/NewArticleFlow';
import Navbar from 'components/Molecules/Content/Navbar';
import Loader from 'components/Loader/Loader';
import lang from 'common/lang';
import { articleUrl } from 'common/utils/network/appRouts';
import { IImage } from 'components/ImageUpload/types';
import { ICreateArticle } from 'pages/article/components/NewArticleFlow/types';
import { ICreatePost } from 'pages/post/create/type';
import { useRouter } from 'next/router';
import { Tabs } from 'pages/workspace/type';
import useArticle from 'pages/article/hooks/articles';
import { ArticleSteps } from '../types';
import { Container } from './style';

const { creatingArticle } = lang.article;

const CreateArticleDesktop = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [step, setStep] = useState(ArticleSteps.CREATE);
  const [data, setData] = useState<string>(defaultEditorState);
  const router = useRouter();
  const [tags, setTags] = useState<IOption[]>([]);
  const { publishArticle } = useArticle();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');

  useEffect(() => {
    dispatch(resetState());
  }, [dispatch]);

  const disabled: boolean = useMemo(() => {
    const mySubString = data.substring(
      data.indexOf('>') + 1,
      data.lastIndexOf('<'),
    );
    return mySubString === emptyBreakTag || tags?.length === 0 || !title;
    return false;
  }, [data, tags]);

  const handleCancel = () => {
    dispatch(setCurrentTab(Tabs.CONTENT));
    dispatch(resetState());
    navigate('/workspace');
  };

  const handleBack = () => {
    dispatch(setCurrentTab(Tabs.CONTENT));
    dispatch(resetState());
    router.back();
  };

  const publish = async (values: ICreateArticle | ICreatePost) => {
    try {
      const articleTitle = 'title' in values ? values.title : '';
      setLoading(true);
      const { success, response } = await publishArticle({
        content: data,
        tags: values.tags,
        title: articleTitle,
        subTitle: values.caption,
        published_date: new Date().toDateString(),
        media: (values.media as IImage[])[0],
      });
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
        isEditing={disabled}
        tags={tags}
        onTagChange={setTags}
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

export default CreateArticleDesktop;
