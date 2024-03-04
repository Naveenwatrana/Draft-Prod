import { useAppSelector } from 'common/hooks/state';
import lang from 'common/lang';
import Divider from 'components/Divider/Divider';
import { selectCurrentCompany } from 'pages/account/authSlice';
import FeedList from 'pages/feed/FeedList';
import { useFeedSearchMutation } from 'pages/feed/feedService';
import { IFeedData } from 'pages/feed/types';
import { NotificationType } from 'pages/pro/components/Projects/ViewProject/types';
import { showNotification } from 'pages/pro/components/Projects/util';
import React, { useEffect, useMemo, useState } from 'react';
import { useWindowDimensions } from 'common/hooks';
import { appendFeedInFeedsData } from 'pages/feed/util';
import { Container, MoreLikeThisText } from './style';
const { feed } = lang;

type MoreLikeThisProps = {
    keyword: string;
    data: any;
}

const MoreLikeThis = ({ keyword, data }: MoreLikeThisProps) => {
  const [searchedFeed, result] = useFeedSearchMutation();
  const [page, setPage] = useState<number>(1);
  const [feedList, setFeedList] = useState<IFeedData[][]>([]);
  const [hasMoreFeeds, setHasMoreFeeds] = useState<boolean>(true);
  const currentCompany = useAppSelector(selectCurrentCompany);
  useEffect(() => {
    setHasMoreFeeds(data.data.data.total
      > data.data.data.current_page * data.data.data.per_page);
  }, [data.data]);
  const { windowDimensions: { width } } = useWindowDimensions();
  useEffect(() => {
    if (width) setFeedList(appendFeedInFeedsData([], data.data.data, width - 300));
  }, [data.data.data, width]);
  const fetchMoreFeed = (pageNumber?: number) => {
    const searchForCompany = currentCompany
      ? { username: currentCompany?.username }
      : {};
    const args = {
      page: pageNumber || page + 1,
      ...searchForCompany,
      keyword,
    };
    searchedFeed(args)
      .unwrap()
      .then((response) => {
        if (response?.data?.data?.length) {
          setTimeout(() => {
            setFeedList((previousFeedsList) => appendFeedInFeedsData(previousFeedsList, response.data.data, width - 300));
          }, 2500);
          setPage(pageNumber || page + 1);
          setHasMoreFeeds(
            response.data.total
              > response.data.current_page * response.data.per_page,
          );
        } else setHasMoreFeeds(false);
        if (response?.message === feed.noFeedFound) {
          setFeedList([]);
        }
      })
      .catch((error: any) => {
        setFeedList([]);
        setPage(0);
        showNotification(error?.data?.message, NotificationType.ERROR);
      });
  };
  const feedListToRender = useMemo(() => {
    return width ? (
      <FeedList
        feedList={feedList}
        fetchMoreFeed={fetchMoreFeed}
        hasMoreFeed={hasMoreFeeds}
        loading={result.isLoading}
      />
    ) : null;
  }, [feedList, hasMoreFeeds, result.isLoading, width]);
  return (
    <Container>
      <Divider />
      <MoreLikeThisText>{feed.moreLikeThis}</MoreLikeThisText>
      {feedListToRender}
    </Container>
  );
};

export default MoreLikeThis;
