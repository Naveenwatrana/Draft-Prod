import ContentCreateFooter from 'components/Organisms/ContentCreateFooter';
import { ArticleSteps } from 'pages/article/create/types';
import TagsForContent from 'components/Organisms/TagsForContent';
import lang from 'common/lang';
import { CardsContainer } from '../styles';
import { PostsStepTagsProps } from './types';

const { back, preview } = lang.buttonText;

const PostsStepTags = ({
  setStep, tags, setTags, onSubmit,
}: PostsStepTagsProps) => {
  return (
    <>
      <CardsContainer>
        <TagsForContent
          onTagChange={setTags}
          tagsValue={tags}
        />
      </CardsContainer>
      <ContentCreateFooter
        onBack={() => setStep(ArticleSteps.CREATE)}
        onNext={onSubmit}
        nextLabel={preview}
        backLabel={back}
        nextDisabled={tags.length < 1}
        backDisabled={false}
      />
    </>
  );
};

export default PostsStepTags;
