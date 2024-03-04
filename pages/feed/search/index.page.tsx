import React, { useEffect, useState } from 'react';
import ChevronLeft from 'components/Icons/LeftChevron';
import { useNavigate } from 'common/utils/router-fill';
import { CrossIcon, InputSearchIcon } from 'components/NavBar/styles';
import lang from 'common/lang';
import { getSearchTerm, setSearchTerm } from 'components/NavBar/slice';
import { useAppDispatch, useAppSelector } from 'common/hooks/state';
import useDebounce from 'common/hooks/useDebounce';
import { useWindowDimensions } from 'common/hooks';
import {
  SearchContainer,
  SearchInput,
  SearchingWrapper,
  Wrapper,
} from './style';
import { useFeedSearchMutation } from '../feedService';
import { IFeedData } from '../types';
import FeedList from '../FeedList';
import NoFeedFound from '../NoFeed';
import { appendFeedInFeedsData } from '../util';

const { navBarText, feed } = lang;

const Search = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchedFeed, result] = useFeedSearchMutation();
  const [page, setPage] = useState<number>(0);
  const [feedList, setFeedList] = useState<IFeedData[][]>([]);
  const [hasMoreFeeds, setHasMoreFeeds] = useState<boolean>(true);
  const searchTerm = useAppSelector(getSearchTerm);
  const debouncedValue = useDebounce(searchTerm, 1000);
  const [loading, setLoading] = useState(false);
  const [noFeedFound, setNoFeedFound] = useState(false);
  const { windowDimensions: { width } } = useWindowDimensions();
  const fetchMoreFeed = (pageNumber?: number) => {
    if (debouncedValue) {
      setLoading(true);
      const args = { page: pageNumber || page + 1, keyword: debouncedValue, filter: '' };
      searchedFeed(args)
        .unwrap()
        .then((response) => {
          if (response?.data?.data?.length) {
            setNoFeedFound(false);
            setFeedList((previousFeedsList) => appendFeedInFeedsData(previousFeedsList, response.data.data, width));
            setPage(pageNumber || page + 1);
            setHasMoreFeeds(
              response.data.total
                > response.data.current_page * response.data.per_page,
            );
          } else setHasMoreFeeds(false);
          if (response?.message === feed.noFeedFound) {
            setFeedList([]);
            setNoFeedFound(true);
          }
        })
        .catch((error: any) => {
          setFeedList([]);
          setPage(0);
        });
      if (debouncedValue) setLoading(false);
    }
  };

  useEffect(() => {
    if (debouncedValue || width) {
      setPage(1);
      setFeedList([]);
      fetchMoreFeed(1);
    }
  }, [debouncedValue, width]);

  return (
    <Wrapper>
      <SearchingWrapper>
        <ChevronLeft
          data-cy="goBackSearch"
          onClick={() => {
            dispatch(setSearchTerm(''));
            navigate('/feed');
          }}
        />
        <SearchContainer>
          <SearchInput
            placeholder={navBarText.searchPlaceholder}
            value={searchTerm}
            onChange={(e) => dispatch(setSearchTerm(e.target.value))}
          />
          <InputSearchIcon />
          {searchTerm && (
            <CrossIcon size={18} onClick={() => dispatch(setSearchTerm(''))} />
          )}
        </SearchContainer>
      </SearchingWrapper>
      {noFeedFound && !result.isLoading && (
        <NoFeedFound searchTerm={debouncedValue} />
      )}
      {debouncedValue && (
        <FeedList
          feedList={feedList}
          fetchMoreFeed={fetchMoreFeed}
          hasMoreFeed={hasMoreFeeds}
          loading={result.isLoading || loading}
        />
      )}
    </Wrapper>
  );
};

export default Search;
