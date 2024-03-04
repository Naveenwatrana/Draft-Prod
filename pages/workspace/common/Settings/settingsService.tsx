import { baseApi } from 'common/store/baseApi';
import {
  posts, greenhouse, toggleFollow, userPosts,
} from 'common/utils/network/endpoints';
export const postsApi = baseApi
  .enhanceEndpoints({ addTagTypes: ['settings', 'greenhouse'] })
  .injectEndpoints({
    endpoints: (builder) => ({
      addGreenHouseHarvestKey: builder.mutation({
        query: (body) => ({
          url: `${greenhouse}/save-key`,
          method: 'POST',
          body,
        }),
      }),
      getGreenHouseSecreat: builder.mutation({
        query: (id) => ({
          url: `${greenhouse}/secret-key?company_id=${id}`,
          method: 'GET',
        }),
      }),
      getGreenHouseStatus: builder.query({
        query: (id) => ({
          url: `${greenhouse}/check-status?company_id=${id}`,
          method: 'GET',
        }),
      }),
      getGreenHouseStatusData: builder.mutation({
        query: (id) => ({
          url: `${greenhouse}/check-status?company_id=${id}`,
          method: 'GET',
        }),
      }),
      resetGreenHouse: builder.mutation({
        query: (id) => ({
          url: `${greenhouse}/reset?company_id=${id}`,
          method: 'GET',
        }),
      }),
    }),
  });

export const {
  useAddGreenHouseHarvestKeyMutation, useGetGreenHouseSecreatMutation, useGetGreenHouseStatusQuery, useResetGreenHouseMutation, useGetGreenHouseStatusDataMutation,
} = postsApi;
