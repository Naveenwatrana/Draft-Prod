import PostCards from 'components/CardCreationWizard/components/Cards/Post';
import { Content } from '../style';
import { ViewCardProps } from './type';

const ViewContent = ({ postCardData }: ViewCardProps) => {
  return (
    <Content>
      <PostCards key={postCardData?.caption} card={postCardData} />
    </Content>
  );
};

export default ViewContent;
