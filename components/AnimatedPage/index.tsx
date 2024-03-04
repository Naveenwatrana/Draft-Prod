import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Content from './Content';
import {
  AnimatedPageContainer, ArticleContainerRelative, H1, ImageComponent, Tags, TagsContainer,
} from './styles';
import { AnimatedPageProps } from './types';

const AnimatedPage = ({
  cards, actions, info, content, moreLikeThis, title, previewImage, detailSection, tags,
}: AnimatedPageProps) => {
  const [mainDivWidth, setMainDivWidth] = useState(0);
  const mainDivRef = useRef<HTMLDivElement>(null);

  const [ref, inView] = useInView({
    threshold: 0,
    triggerOnce: false,
  });
  const [refContent, inContentView] = useInView({
    threshold: 0,
    triggerOnce: false,
  });

  const maxCardRight = mainDivWidth / 3;

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      if (entries[0]) {
        setMainDivWidth(entries[0].contentRect.width);
      }
    });
    if (mainDivRef.current) {
      observer.observe(mainDivRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [mainDivRef.current]);
  return (
    <AnimatedPageContainer ref={mainDivRef}>
      <ArticleContainerRelative>
        {content && (
          <Content inView={true} reference={ref}>
            <>
              {previewImage && <ImageComponent alt="Preview Image" src={previewImage} width={600} height={400} />}
              <H1>{title}</H1>
              {content}
            </>
            <TagsContainer>
              {tags && tags?.map((tagElement) => { return <Tags key={tagElement.tag}>{tagElement.tag}</Tags>; })}
            </TagsContainer>
          </Content>
        )}
        {detailSection}
      </ArticleContainerRelative>
      <section ref={refContent}>
        {moreLikeThis}
      </section>
    </AnimatedPageContainer>
  );
};

export default AnimatedPage;
