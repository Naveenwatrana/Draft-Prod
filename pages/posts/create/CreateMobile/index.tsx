import CardCreationWizardMobile from 'components/CardCreationWizard/Mobile';
import { data } from 'pages/article/cardsMockData';
import { ArticleStepsMobile } from 'pages/article/create/types';
import { useState } from 'react';
import lang from 'common/lang';
import { useRouter } from 'next/router';
import Navbar from 'components/Molecules/Content/Navbar';
import { Container } from './styles';
import PostsStepTags from '../Step2';
import { ArticlePreviewContainerMobile } from '../styles';
import { CreatePostsMobileProps } from './types';

const { pageTitle } = lang.posts;
const { article } = lang;
const { next } = lang.buttonText;

const CreatePostsMobile = ({
  tags, setTags, onSubmit,
}: CreatePostsMobileProps) => {
  const [step, setStep] = useState(ArticleStepsMobile.CARDS);
  const router = useRouter();

  return (
    <Container>
      {step === ArticleStepsMobile.CARDS && (
        <CardCreationWizardMobile
          onSave={() => setStep(step + 1)}
          cardData={data}
          maxCards={3}
          title={pageTitle}
          onClose={router.back}
          saveButtonText={next}
        />
      )}
      {step === ArticleStepsMobile.TAGS && (
        <ArticlePreviewContainerMobile>
          <Navbar step={step} title={article.step.tags} handleBack={() => setStep(ArticleStepsMobile.CARDS)} />
          <PostsStepTags
            onSubmit={onSubmit}
            tags={tags}
            setTags={setTags}
            setStep={() => setStep(ArticleStepsMobile.CARDS)}
          />
        </ArticlePreviewContainerMobile>
      )}
    </Container>
  );
};

export default CreatePostsMobile;
