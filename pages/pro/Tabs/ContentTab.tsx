import React, {
  useCallback, useState, lazy,
} from 'react';
import Loader from 'components/Loader/Loader';
import ArticleCards from 'pages/feed/Cards/ArticleCards';
import PostCard from 'pages/feed/NewCards/PostCards';
import PostsCards from 'pages/feed/Cards/PostsCards';
import { useParams } from 'common/utils/router-fill';
import InfiniteScrollComponent from 'components/InfiniteScroll/InfiniteScroll';
import { IFeedData } from 'pages/feed/types';
import NoContent from 'pages/company/Tab/NoContent';
import LinkCard from 'pages/feed/NewCards/LinkCard';
import { useContentMutation } from '../profileService';
import { ContentContainer, InfiniteScrollComponentContainer } from './style';
const ArticleCard = lazy(() => import('pages/feed/NewCards/ArticleCards'));

export type ContentTabProps = {
  data: any; // TODO: Add type
};

const ContentTab = ({ data }: ContentTabProps) => {
  const params = useParams();
  const [contentApi, contentApiResult] = useContentMutation();
  const [page, setPage] = useState(2);
  const [hasMore, setHasMore] = useState(false);
  const [articles, setArticles] = useState<IFeedData[]>(data?.articles?.data);
  const [posts, setPosts] = useState<IFeedData[]>(data?.posts?.data);
  const [links, setLinks] = useState<IFeedData[]>(data?.links?.data);
  const username = params?.tab && params?.tab[0];
  const fetchData = useCallback(() => {
    if (hasMore || page === 1) {
      contentApi({ page, user: username })
        .unwrap()
        .then((res) => {
          setHasMore(
            !!res?.data?.articles?.links?.[2]?.url
              || !!res?.data?.posts?.links?.[2]?.url,
          );
          const articlesData = res?.data?.articles?.data || [];
          const postData = res?.data?.posts?.data || [];
          const linkData = res?.data?.links?.data || [];
          setArticles((article) => page === 1 ? [...articlesData] : [...article, ...articlesData]);
          setPosts((post) => page === 1 ? [...postData] : [...post, ...postData]);
          setLinks((link) => page === 1 ? [...linkData] : [...link, ...linkData]);
          setPage((p) => p + 1);
        });
    }
  }, [contentApi, hasMore, page, username]);

  const getOldCards = (elements: IFeedData[]): IFeedData[] => {
    return elements.filter((element: IFeedData) => (element?.cards?.length || 0) > 0);
  };

  const getNewCards = (elements: IFeedData[]): IFeedData[] => {
    return elements.filter((element: IFeedData) => !element?.cards || element?.cards.length === 0);
  };

  if (contentApiResult.isLoading) {
    return <Loader />;
  }
  return (articles?.length || posts?.length || links?.length)
    ? (
      <InfiniteScrollComponentContainer id="infinite-scroll">
        <InfiniteScrollComponent
          data={articles}
          fetchMoreData={fetchData}
          hasMore={hasMore}
          scrollableTarget="infinite-scroll"
          showLoader={false}
        >
          <ContentContainer>
            {getNewCards(articles).map((article: IFeedData) => (
              <ArticleCard
                data={article}
                key={`${article.id}article`}
                hideHeader={!params?.username}
                width={358}
              />
            ))}
            {getOldCards(articles).map((article: IFeedData) => (
              <ArticleCards
                data={article}
                key={`${article.id}article`}
                hideHeader={!params?.username}
                width={358}
              />
            ))}
            {getNewCards(posts).map((post: IFeedData) => (
              <PostCard
                data={post}
                key={`${post.id}post`}
                hideHeader={!params?.username}
                width={358}
              />
            ))}
            {getOldCards(posts).map((post: IFeedData) => (
              <PostsCards
                data={post}
                key={`${post.id}post`}
                hideHeader={!params?.username}
              />
            ))}
            {links?.map((link: IFeedData) => (
              <LinkCard
                data={link}
                key={`${link.id}links`}
                hideHeader={!params?.username}
                width={358}
              />
            ))}
          </ContentContainer>
        </InfiniteScrollComponent>
      </InfiniteScrollComponentContainer>
    )
    : <NoContent />;
};

export default ContentTab;
