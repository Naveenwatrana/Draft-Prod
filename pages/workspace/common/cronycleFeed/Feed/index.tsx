import { formatCronycleFeedArticleData } from 'common/utils/helpers';
import Loader from 'components/Loader/Loader';
import { ICronycleFeed, ICronycleFeedArticle, ICronycleFeedArticleResponse } from 'pages/workspace/type';
import React, { useMemo } from 'react';
import { useCronycleFeedArticlesQuery } from '../cronycleFeedService';
import { FeedCard } from '../FeedCard.tsx';
import { CardsContainer, Container, FeedHeader } from './style';

type FeedProps = {
  cronycleFeed: ICronycleFeed;
};

export const Feed = (props: FeedProps) => {
  const {
    cronycleFeed: { name, id },
  } = props;
  const { data, isLoading, isFetching } = useCronycleFeedArticlesQuery(id);

  const feeds : ICronycleFeedArticle[] = useMemo(() => data?.data?.map((d: ICronycleFeedArticleResponse) => formatCronycleFeedArticleData(d)), [data]);

  if (isLoading || isFetching) {
    return <Loader fullScreen={false} />;
  }
  return (
    <Container>
      <FeedHeader data-cy={`cronycleFeed${id}`}>{name}</FeedHeader>
      <CardsContainer>
        {feeds?.map((feed) => (
          <FeedCard {...feed} key={`cronycleFeed${feed.id}`} />
        ))}
      </CardsContainer>
    </Container>
  );
};
