import { baseApi } from 'common/store/baseApi';
import {
  comments,
  createShareLink, getShareLink, links,
} from 'common/utils/network/endpoints';
import { ApiPayload } from './types';
export const linksApi = baseApi
  .enhanceEndpoints({ addTagTypes: ['link', 'comments', 'upvote'] })
  .injectEndpoints({
    endpoints: (builder) => ({
      createLink: builder.mutation({
        query: (body: ApiPayload) => ({
          url: createShareLink,
          method: 'POST',
          body,
        }),
      }),
      linkComments: builder.query({
        query: (id) => ({
          url: `${links}/${id}${comments}`,
          method: 'GET',
        }),
        providesTags: ['comments'],
      }),
      getLink: builder.query({
        query: ({ id }) => {
          const url = `${links}/${id}${getShareLink}`;
          return {
            url,
            method: 'GET',
          };
        },
        providesTags: ['link', 'upvote'],
      }),
    }),
  });

export const {
  useCreateLinkMutation, useGetLinkQuery, useLinkCommentsQuery,
} = linksApi;
