import { baseApi } from 'common/store/baseApi';
import {
  notifications,
} from 'common/utils/network/endpoints';
export const NotificationApi = baseApi
  .enhanceEndpoints({ addTagTypes: ['notifications'] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getNotifications: builder.query({
        query: (pageNumber) => ({
          url: `${notifications}?page=${pageNumber}`,
          method: 'GET',
        }),
        providesTags: ['notifications'],
      }),
      updateNotification: builder.mutation({
        query: (notificationId) => ({
          url: `${notifications}/${notificationId}`,
          method: 'PUT',
          body: { read: 1 },
        }),
        invalidatesTags: ['notifications'],
      }),
    }),
  });

export const {
  useGetNotificationsQuery, useUpdateNotificationMutation,
} = NotificationApi;
