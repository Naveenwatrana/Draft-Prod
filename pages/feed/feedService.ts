import { search, searchV2 } from 'common/utils/network/endpoints';
import { baseApi } from 'common/store/baseApi';

export const feedApi = baseApi
  .enhanceEndpoints({ addTagTypes: [] })
  .injectEndpoints({
    endpoints: (builder) => ({
      feedSearch: builder.mutation({
        query: (args) => ({
          url: `${search}?page=${args.page}&keyword=${args.keyword}${args.filter ? `&filter=${args.filter}` : ''}${args.username ? `&company=${args.username}` : ''}`,
          method: 'GET',
        }),
      }),
      feedSearchV2: builder.mutation({
        query: (args) => ({
          url: `${searchV2}?page=${args.page}${args.keyword ? `&keyword=${args.keyword}` : ''}${args.filter ? `&filter=${args.filter}` : ''}${args.username ? `&company=${args.username}` : ''}`,
          method: 'GET',
        }),
      }),
    }),
  });

export const { useFeedSearchMutation, useFeedSearchV2Mutation } = feedApi;
