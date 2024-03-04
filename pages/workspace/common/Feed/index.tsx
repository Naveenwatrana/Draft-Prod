import React, { useEffect, useState } from 'react';
import TextComp from 'components/textComp';
import Loader from 'components/Loader/Loader';
import { formatMeltwaterFeedArticleData } from 'common/utils/helpers';
import {
  IMeltwaterFeedArticle,
} from 'pages/workspace/type';
import InfiniteScrollComponent from 'components/InfiniteScroll/InfiniteScroll';
import lang from 'common/lang';
import { IFeedData } from 'pages/feed/types';
import { showNotification } from 'pages/pro/components/Projects/util';
import { NotificationType } from 'pages/pro/components/Projects/ViewProject/types';
import { useListMeltwaterArticlesMutation } from '../Meltwater/meltwaterService';
import { FeedCard } from './Card';
import { Container, Form } from './style';
import { CardsContainer } from '../Settings/styles';
import { FeedProps } from './types';
const { meltwater: { newsFeed } } = lang;
const Feed = ({ meltwaterArticlesData }: FeedProps) => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [feedsApi, feedsApiResult] = useListMeltwaterArticlesMutation();
  const [feeds, setFeeds] = useState<IMeltwaterFeedArticle[]>(meltwaterArticlesData?.map((meltwater) => formatMeltwaterFeedArticleData(meltwater)) || []);
  useEffect(() => {
    feedsApi({ pageNumber })
      .unwrap()
      .then((data) => {
        const feedsData = data.data?.data?.map((d: IFeedData) => formatMeltwaterFeedArticleData(d));
        setFeeds((feed: IMeltwaterFeedArticle[]) => pageNumber === 1 ? [...feedsData] : [...feed, ...feedsData]);
        setHasMore(data?.data?.to < data?.data?.total);
      }).catch((error) => showNotification(error?.data?.message, NotificationType.ERROR));
    // Only be called after new page or filter change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber]);

  return (
    <Container>
      <Form className="infinite-scroll">
        <TextComp component="h3">{newsFeed}</TextComp>
        <InfiniteScrollComponent
          data={feeds}
          fetchMoreData={() => setPageNumber((page) => page + 1)}
          hasMore={hasMore}
          scrollableTarget="infinite-scroll"
          showLoader={false}
        >
          <CardsContainer>
            {feeds?.map(
              (feed) => (
                <FeedCard {...feed} key={`meltwaterFeed${feed.id}`} />
              ),
            )}
          </CardsContainer>
          {feedsApiResult.isLoading && <Loader fullScreen={false} />}
        </InfiniteScrollComponent>
      </Form>
    </Container>
  );
};

export default Feed;
