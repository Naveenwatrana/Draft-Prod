import lang from 'common/lang';
import ButtonComp from 'components/buttonComp';
import Loader from 'components/Loader/Loader';
import { showNotification } from 'pages/pro/components/Projects/util';
import { NotificationType } from 'pages/pro/components/Projects/ViewProject/types';
import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import {
  useCronycleFeedRefreshMutation, useCronycleFeedsConnectMutation, useCronycleFeedsQuery,
} from './cronycleFeedService';
import NotLinked from './NotLinked';
import {
  ButtonContainer,
  FeedContainer,
  FeedHeader,
  FeedIndex,
  FeedName,
  FeedsContainer,
  StyledCheckBox,
} from './styles';
type CronycleFeed = {
  id: number;
  name: string;
  owner: string;
  checked?: boolean;
};
const {
  cronycleFeed: { connectButtonText, refreshButtonText, title },
} = lang;

const CronycleFeed = () => {
  const { data: feedsData, isFetching } = useCronycleFeedsQuery('');
  const [cronycleFeedsConnect, { isLoading }] = useCronycleFeedsConnectMutation();
  const [cronycleFeedsRefresh, { isLoading: refreshLoading }] = useCronycleFeedRefreshMutation();
  const [feeds, setFeeds] = useState<CronycleFeed[]>([]);

  const refreshFeeds = () => {
    cronycleFeedsRefresh('')
      .then(({ data }: any) => {
        setFeeds(data.data.map(((feedData: { is_connected: boolean }) => {
          return {
            ...feedData,
            checked: feedData?.is_connected,
          };
        })));
      })
      .catch((error: any) => {
        showNotification(error?.data?.message, NotificationType.ERROR);
      });
  };

  useEffect(() => {
    if (feedsData?.data) {
      setFeeds(feedsData?.data?.map(((feedData: { is_connected: boolean }) => {
        return {
          ...feedData,
          checked: feedData?.is_connected,
        };
      })));
    }
  }, [feedsData]);

  const handleCheck = (feedToUpdate: CronycleFeed) => {
    setFeeds(
      feeds.map((feed: CronycleFeed) => {
        return feed.id === feedToUpdate.id
          ? { ...feed, checked: !feedToUpdate.checked }
          : { ...feed };
      }),
    );
  };

  const handleConnect = () => {
    cronycleFeedsConnect({ ids: feeds.filter((f) => f.checked).map((f) => f.id) });
  };

  return (
    <>
      {(isFetching || isLoading || refreshLoading) && <Loader />}
      <ToastContainer
        position="top-center"
        hideProgressBar
        style={{
          width: '100%',
          maxWidth: '906px',
        }}
      />
      {feeds?.length ? (
        <FeedsContainer>
          <FeedHeader>{title}</FeedHeader>
          {feeds.map((feed: CronycleFeed, index: number) => (
            <FeedContainer key={`${feed.id}feed`}>
              <FeedIndex>{`${index + 1}.`}</FeedIndex>
              <FeedName>{feed.name}</FeedName>
              <StyledCheckBox
                type="checkbox"
                checked={feed.checked}
                onClick={() => handleCheck(feed)}
                data-cy={`feedCheck${feed.id}`}
              />
            </FeedContainer>
          ))}
          <ButtonContainer>
            <ButtonComp
              primary
              variant="link"
              label={refreshButtonText}
              onClick={refreshFeeds}
              data-cy="refreshCronycleFeeds"
            />
            <ButtonComp
              primary
              label={connectButtonText}
              onClick={handleConnect}
              data-cy="connectCronycleFeeds"
            />
          </ButtonContainer>
        </FeedsContainer>
      ) : (
        <NotLinked />
      )}
    </>
  );
};

export default CronycleFeed;
