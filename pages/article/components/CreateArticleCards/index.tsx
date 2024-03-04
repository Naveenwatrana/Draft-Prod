import CardCreationWizardMobile from 'components/CardCreationWizard/Mobile';
import { data } from 'pages/article/cardsMockData';
import lang from 'common/lang';
import { Container } from './styles';

const {
  article: {
    creatingArticle,
  },
} = lang;
const CreateArticleCards = () => {
  return (
    <Container>
      <CardCreationWizardMobile onSave={() => undefined} cardData={data} maxCards={5} title={creatingArticle} onClose={() => { /**/ }} />
    </Container>
  );
};

export default CreateArticleCards;
