import { baseApi } from 'common/store/baseApi';
import {
  toggleFollow,
} from 'common/utils/network/endpoints';
export const NotificationApi = baseApi
  .enhanceEndpoints({ addTagTypes: ['follow'] })
  .injectEndpoints({
    endpoints: (builder) => ({
      followUser: builder.mutation({
        query: (data) => ({
          url: toggleFollow,
          method: 'POST',
          body: data,
        }),
        invalidatesTags: ['follow'],
      }),
    }),
  });

export const {
  useFollowUserMutation,
} = NotificationApi;
