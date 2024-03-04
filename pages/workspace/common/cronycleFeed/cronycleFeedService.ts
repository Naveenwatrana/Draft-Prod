import {
  cronycleFeed, connected, connect, article, cronycle, refresh,
} from 'common/utils/network/endpoints';
import { baseApi } from 'common/store/baseApi';

export const cronycleFeedApi = baseApi
  .enhanceEndpoints({ addTagTypes: ['cronycleFeed'] })
  .injectEndpoints({
    endpoints: (builder) => ({
      cronycleFeeds: builder.query({
        query: () => `${cronycleFeed}`,
        providesTags: ['cronycleFeed'],
      }),
      cronycleFeedsConnected: builder.query({
        query: () => `${cronycleFeed}${connected}`,
        providesTags: ['cronycleFeed'],
      }),
      cronycleFeedsConnect: builder.mutation({
        query: (data: { ids: number[]}) => ({
          url: `${cronycleFeed}${connect}`,
          method: 'POST',
          body: data,
        }),
        invalidatesTags: ['cronycleFeed'],
      }),
      cronycleFeedArticles: builder.query({
        query: (feedId) => `${article}${cronycle}?feed_id=${feedId}`,
        providesTags: ['cronycleFeed'],
      }),
      cronycleFeedRefresh: builder.mutation({
        query: () => ({
          url: `${cronycleFeed}${refresh}`,
          method: 'POST',
        }),
        invalidatesTags: ['cronycleFeed'],
      }),
    }),
  });

export const {
  useCronycleFeedsQuery,
  useLazyCronycleFeedsQuery,
  useCronycleFeedsConnectedQuery,
  useCronycleFeedsConnectMutation,
  useCronycleFeedArticlesQuery,
  useCronycleFeedRefreshMutation,
} = cronycleFeedApi;
