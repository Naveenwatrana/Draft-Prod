import CardCreationWizard from 'components/CardCreationWizard';
import { data } from 'pages/article/cardsMockData';

const Posts = () => {
  return (
    <CardCreationWizard
      onClose={() => undefined}
      onSave={() => undefined}
      maxCards={3}
      activeCardId={1}
      cardData={data}
      title="Edit Cards"
      setIsOpen={() => undefined}
      isOpen
    />
  );
};

export default Posts;
