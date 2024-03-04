import LayoutWithNavbar from 'components/LayoutWithNavbar/LayoutWithNavbar';
import {
  lazy, useCallback, useEffect, useState,
} from 'react';
import { showNotification } from 'pages/pro/components/Projects/util';
import { NotificationType } from 'pages/pro/components/Projects/ViewProject/types';
import { useAppSelector } from 'common/hooks/state';
import { getSearchTerm } from 'components/NavBar/slice';
import useDebounce from 'common/hooks/useDebounce';
import Loader from 'components/Loader/Loader';
import { useNavigate } from 'common/utils/router-fill';
import lang from 'common/lang';
import { selectCurrentCompany } from 'pages/account/authSlice';
import { useWindowDimensions } from 'common/hooks';
import { useFeedSearchMutation } from './feedService';
import { IFeedData, IFilter } from './types';
import NoFeedFound from './NoFeed';
import FeedFilters from './Filters';
import { appendFeedInFeedsData, separateFeedData, shuffleArray } from './util';

const { feed } = lang;
const { filters: filterData } = feed;

const FeedList = lazy(() => import('./FeedList'));

const filtersData: IFilter[] = [
  { filter: filterData.users.key, label: filterData.users.label, active: false },
  { filter: filterData.articles.key, label: filterData.articles.label, active: false },
  { filter: filterData.jobs.key, label: filterData.jobs.label, active: false },
  { filter: filterData.companies.key, label: filterData.companies.label, active: false },
  { filter: filterData.posts.key, label: filterData.posts.label, active: false },
  { filter: filterData.links.key, label: filterData.links.label, active: false },
];
export async function getServerSideProps() {
  return {
    props: {
      loggedInUser: true,
    },
  };
}

const Feed = () => {
  const [searchedFeed, result] = useFeedSearchMutation();
  const [page, setPage] = useState<number>(0);
  const [feedList, setFeedList] = useState<IFeedData[][]>([]);
  const [hasMoreFeeds, setHasMoreFeeds] = useState<boolean>(true);
  const searchTerm = useAppSelector(getSearchTerm);
  const currentCompany = useAppSelector(selectCurrentCompany);
  const debouncedValue = useDebounce(searchTerm, 1000);
  const navigate = useNavigate();
  const [loadingPage, setLoadingPage] = useState(true);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<IFilter[]>(filtersData);

  useEffect(() => {
    if (!JSON.parse(window.localStorage.auth || '{}')?.user) {
      navigate('/account/signin');
    } else {
      setLoadingPage(false);
    }
  }, [navigate]);
  const { windowDimensions: { width } } = useWindowDimensions();
  const fetchMoreFeed = useCallback((pageNumber?: number) => {
    if (debouncedValue) setLoading(true);
    const searchForCompany = currentCompany ? { username: currentCompany?.username } : {};
    const args = {
      page: pageNumber || page + 1,
      keyword: debouncedValue,
      ...searchForCompany,
      filter: `${filters
        .filter((filter) => filter.active)
        .map((filter) => filter.filter)
        .join(',')}`,
    };
    searchedFeed(args)
      .unwrap()
      .then((response) => {
        if (response?.data?.data) {
          setFeedList((previousFeedsList) => appendFeedInFeedsData(pageNumber === 1 ? [] : previousFeedsList, shuffleArray(separateFeedData(response.data.data)), width));
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
    if (debouncedValue) setLoading(false);
  }, [currentCompany, debouncedValue, filters, page, searchedFeed, width]);

  useEffect(() => {
    if (width) {
      fetchMoreFeed(1);
    }
  }, [debouncedValue, width, filters]);

  const onFiltersChange = (filterToChange: string) => {
    setFilters(filters.map((filter) => filter.filter === filterToChange ? { ...filter, active: !filter.active } : { ...filter }));
  };

  if (loadingPage) {
    return <Loader />;
  }
  return (
    <LayoutWithNavbar loggedInUser>
      <FeedFilters filters={filters} onActive={onFiltersChange} />
      {debouncedValue && feedList.length === 0 && !result.isLoading && (
        <NoFeedFound searchTerm={debouncedValue} />
      )}
      <FeedList
        fetchMoreFeed={fetchMoreFeed}
        hasMoreFeed={hasMoreFeeds}
        loading={result.isLoading || loading}
        feedList={feedList}
      />
    </LayoutWithNavbar>
  );
};

export default Feed;
