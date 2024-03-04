import { useParams } from 'common/utils/router-fill';
import Loader from 'components/Loader/Loader';
import { IFeedData } from 'pages/feed/types';
import { useContentMutation } from 'pages/pro/profileService';
import React, {
  useCallback, useState, lazy,
} from 'react';
import ArticleCards from 'pages/feed/Cards/ArticleCards';
import InfiniteScrollComponent from 'components/InfiniteScroll/InfiniteScroll';
import LogoIcon from 'components/Icons/icon';
import { useAppSelector } from 'common/hooks/state';
import { selectCurrentCompany } from 'pages/account/authSlice';
import PostCard from 'pages/feed/NewCards/PostCards';
import PostsCards from 'pages/feed/Cards/PostsCards';
import LinkCard from 'pages/feed/NewCards/LinkCard';
import { ContentContainer, InfiniteScrollComponentContainer } from './styles';
import NoContent from './NoContent';
import { LogoWrapper } from '../style';
const ArticleCard = lazy(() => import('pages/feed/NewCards/ArticleCards'));

export type ContentTabProps = {
  userArticles: IFeedData[];
  userPosts: IFeedData[];
  userLinks: IFeedData[];
};

const ContentTab = ({ userArticles, userPosts, userLinks }: ContentTabProps) => {
  const params = useParams();
  const currentCompany = useAppSelector(selectCurrentCompany);
  const [contentApi, contentApiResult] = useContentMutation();
  const [page, setPage] = useState(2);
  const [hasMore, setHasMore] = useState(false);
  const [articles, setArticles] = useState<IFeedData[]>(userArticles);
  const [posts, setPosts] = useState<IFeedData[]>(userPosts);
  const [links, setLinks] = useState<IFeedData[]>(userLinks);
  const fetchData = useCallback(() => {
    if (hasMore || page === 1) {
      contentApi({
        page,
        company: params?.companyName || currentCompany?.username,
      })
        .unwrap()
        .then((res) => {
          setHasMore(
            !!res?.data?.articles?.links?.[2]?.url
              || !!res?.data?.posts?.links?.[2]?.url
              || !!res?.data?.links?.links?.[2]?.url,
          );
          const articlesData = res?.data?.articles?.data || [];
          const postData = res?.data?.posts?.data || [];
          const linksData = res?.data?.links?.data || [];
          setArticles((article) => page === 1 ? [...articlesData] : [...article, ...articlesData]);
          setPosts((post) => page === 1 ? [...postData] : [...post, ...postData]);
          setLinks((link) => page === 1 ? [...linksData] : [...link, ...linksData]);
          setPage((p) => p + 1);
        });
    }
  }, [contentApi, hasMore, page, params?.username]);

  const getOldCards = (elements: IFeedData[]): IFeedData[] => {
    return elements.filter((element: IFeedData) => (element?.cards?.length || 0) > 0);
  };

  const getNewCards = (elements: IFeedData[]): IFeedData[] => {
    return elements.filter((element: IFeedData) => !element?.cards || element?.cards.length === 0);
  };

  if (contentApiResult.isLoading) {
    return <Loader />;
  }
  if (!articles?.length && !posts?.length) {
    return <NoContent />;
  }
  return (
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
            />
          ))}
          {getOldCards(articles).map((article: IFeedData) => (
            <ArticleCards
              data={article}
              key={`${article.id}article`}
              hideHeader={!params?.username}
            />
          ))}
          {getNewCards(posts).map((post: IFeedData) => (
            <PostCard
              data={post}
              key={`${post.id}post`}
              hideHeader={!params?.username}
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
            />
          ))}
          <LogoWrapper>
            <LogoIcon theme="grey" />
          </LogoWrapper>
        </ContentContainer>
      </InfiniteScrollComponent>
    </InfiniteScrollComponentContainer>
  );
};

export default ContentTab;
