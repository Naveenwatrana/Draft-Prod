import {
  getPresignedUrl,
  deleteS3ObjectUrl,
} from 'common/utils/network/endpoints';
import { baseApi } from 'common/store/baseApi';

export const profileApi = baseApi
  .injectEndpoints({
    endpoints: (builder) => ({
      presignedUrl: builder.mutation({
        query: (data) => ({
          method: 'GET',
          url: `${getPresignedUrl}?path=${data.location}/${data.fileName}`,
        }),
      }),
      deleteImageUrl: builder.mutation({
        query: (formData) => ({
          url: deleteS3ObjectUrl,
          method: 'POST',
          body: formData,
        }),
      }),
    }),
  });

export const {
  usePresignedUrlMutation,
  useDeleteImageUrlMutation,
} = profileApi;
