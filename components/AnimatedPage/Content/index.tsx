import { ContentProps } from '../types';
import { ContentContainer, ArticalContainer } from './styles';

const Content = ({ children, inView, reference }: ContentProps) => {
  return (
    <ContentContainer
      ref={reference}
      animate={{ opacity: inView ? 1 : 0 }}
      transition={{
        type: 'easeInOut',
        duration: 0.3,
      }}
      data-cy="contentContainer"
    >
      <ArticalContainer>
        {children}
      </ArticalContainer>
    </ContentContainer>
  );
};

export default Content;
