import FeedSkeleton from 'components/FeedSkeleton';
import InfiniteScrollComponent from 'components/InfiniteScroll/InfiniteScroll';
import React, {
  Fragment, lazy, useEffect, useMemo, useState,
} from 'react';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'common/utils/router-fill';
import { loginUrl } from 'common/utils/network/appRouts';
import { useLoggedInUser } from 'common/hooks/useLoggedInUser';
import MeltwaterCard from 'pages/workspace/common/Feed/MeltwaterCard';
import { formatMeltwaterFeedArticleData } from 'common/utils/helpers';
import { MeltwaterCardType } from 'pages/workspace/common/Feed/types';
import { IFeedData, feedTypes } from '../types';
import { FeedsContainer, FeedContainer } from './style';
import PostCard from '../NewCards/PostCards';
import LinkCard from '../NewCards/LinkCard';

const JobCards = lazy(() => import('../NewCards/JobCards'));
const UserCards = lazy(() => import('../Cards/UserCards'));
const PersonCard = lazy(() => import('../NewCards/PersonCard'));
const ArticleCards = lazy(() => import('../Cards/ArticleCards'));
const ArticleCard = lazy(() => import('../NewCards/ArticleCards'));
const CompanyCards = lazy(() => import('../NewCards/CompanyCard'));
type FeedListProps = {
  fetchMoreFeed: () => void;
  hasMoreFeed: boolean;
  loading: boolean;
  feedList: IFeedData[][];
};
const cardHeight = 514;
const FeedList = ({
  fetchMoreFeed,
  hasMoreFeed,
  loading,
  feedList,
}: FeedListProps) => {
  const loggedInUser = useLoggedInUser();
  const navigate = useNavigate();
  const [cardWidth, setCardWidth] = useState(364);
  const handleCompanySelect = (company?: string) => {
    if (company && loggedInUser) {
      navigate(`/org/${company}`);
      return;
    }
    navigate(loginUrl);
  };
  useEffect(() => {
    const screenWidth = window.innerWidth;
    if (screenWidth < 424 && screenWidth >= 374) {
      setCardWidth(318);
    } else if (screenWidth < 374) {
      setCardWidth(270);
    }
  }, []);
  const renderCard = (data: IFeedData) => {
    switch (data?.type) {
      case feedTypes.company:
        return (
          <CompanyCards
            data={data}
            onClick={() => handleCompanySelect(data?.username)}
            width={cardWidth}
            height={cardHeight}
          />
        );
      case feedTypes.user:
        return (
          <PersonCard
            data={data}
            width={cardWidth}
            height={cardHeight}
          />
        );
      case feedTypes.job:
        return (
          <JobCards
            data={data}
            width={cardWidth}
            height={cardHeight}
          />
        );
      case feedTypes.article:
        if (!data?.meltwater_type && data?.cards && data?.cards?.length > 0) {
          return (
            <ArticleCards
              data={data}
              width={cardWidth}
              height={cardHeight}
            />
          );
        } else if (!data?.meltwater_type) {
          return (
            <ArticleCard
              data={data}
              postCard
              width={cardWidth}
              height={cardHeight}
            />
          );
        }
        return (
          <MeltwaterCard
            {...formatMeltwaterFeedArticleData(data)}
            cardType={MeltwaterCardType.horizontal}
          />
        );
      case feedTypes.post:
        if (!data?.meltwater_type && data?.cards && data?.cards?.length > 0) {
          return (
            <ArticleCards
              data={data}
              postCard
              width={cardWidth}
              height={cardHeight}
            />
          );
        }
        return (
          <PostCard
            data={data}
            postCard
            width={cardWidth}
            height={cardHeight}
          />
        );
      case feedTypes.link:
        return (
          <LinkCard
            data={data}
            width={cardWidth}
            height={cardHeight}
          />
        );
      default:
        return null;
    }
  };
  const feedData = useMemo(() => feedList.flatMap((feed) => feed), [feedList]);
  return (
    <>
      <ToastContainer
        position="top-center"
        hideProgressBar
        style={{
          width: '100%',
          maxWidth: '906px',
        }}
      />
      {!!feedList?.[0]?.length && (
        <InfiniteScrollComponent
          data={feedData}
          fetchMoreData={fetchMoreFeed}
          hasMore={hasMoreFeed}
          scrollableTarget="infinite-scroll"
          showLoader={false}
        >
          <FeedsContainer>
            {feedList?.map((feed) => (
              <FeedContainer key={`${feed?.[0]?.id}-row`}>
                {feed?.map((data: IFeedData) => (
                  <Fragment key={data.id}>
                    {renderCard(data)}
                  </Fragment>
                ))}
              </FeedContainer>
            ))}
          </FeedsContainer>
        </InfiniteScrollComponent>
      )}
      {loading && <FeedSkeleton />}
    </>
  );
};

export default FeedList;
