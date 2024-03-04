import lang from 'common/lang';
import {
  Container, Heading, StoryImage, StoryText,
} from './style';
import { StoryPreviewProps } from './types';

const StoryPreview = ({
  title, image,
}: StoryPreviewProps) => {
  const {
    article: {
      editText: { storyPreview },
    },
  } = lang;
  return (

    <Container>
      <Heading component="h4">{storyPreview}</Heading>
      <div>
        <StoryImage width={440} height={288} src={image} alt={storyPreview} />
        <StoryText>
          <span>{title}</span>
        </StoryText>
      </div>
    </Container>
  );
};

export default StoryPreview;
