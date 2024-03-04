import Navbar from 'components/Molecules/Content/Navbar';
import { useEffect, useState } from 'react';
import { ArticleSteps } from 'pages/article/create/types';
import lang from 'common/lang';
import { useAppDispatch } from 'common/hooks/state';
import { resetState } from 'components/CardCreationWizard/slice';
import { IOption } from 'components/MultipleInputTextArea/types';
import { useNavigate } from 'common/utils/router-fill';
import { useRouter } from 'next/router';
import Loader from 'components/Loader/Loader';
import usePosts from 'common/hooks/usePosts';
import { useWindowDimensions } from 'common/hooks';
import { postUrl } from 'common/utils/network/appRouts';
import { ArticlePreviewContainer } from './styles';
import PostsStepCreate from './Step1';
import PostsStepTags from './Step2';
import CreatePostsMobile from './CreateMobile';

const { pageTitle } = lang.posts;

const Posts = () => {
  const { isDesktopView } = useWindowDimensions();
  const [step, setStep] = useState(ArticleSteps.CREATE);
  const { addPostUser, isLoading } = usePosts();
  const navigate = useNavigate();
  const [tags, setTags] = useState<IOption[]>([]);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const handleUpdateStep = (newStep: ArticleSteps) => {
    setStep(newStep);
  };
  const handleBack = () => {
    dispatch(resetState());
    router.back();
  };
  const onSubmit = async () => {
    const selectedTags = tags.map((tag) => tag.value);
    const id = await addPostUser(selectedTags);
    dispatch(resetState());
    navigate(postUrl(id));
  };
  useEffect(() => {
    dispatch(resetState());
  }, [dispatch]);
  if (!isDesktopView) {
    return (
      <>
        {isLoading && <Loader />}
        <CreatePostsMobile tags={tags} setTags={setTags} onSubmit={onSubmit} />
      </>
    );
  }
  return (
    <div>
      {isLoading && <Loader />}
      <ArticlePreviewContainer>
        <Navbar step={step} title={pageTitle} handleBack={handleBack} />
        {step === ArticleSteps.CREATE && <PostsStepCreate setStep={handleUpdateStep} />}
        {step === ArticleSteps.TAGS && <PostsStepTags onSubmit={onSubmit} tags={tags} setTags={setTags} setStep={handleUpdateStep} />}
      </ArticlePreviewContainer>
    </div>
  );
};

export default Posts;
