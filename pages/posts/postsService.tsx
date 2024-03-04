import { baseApi } from 'common/store/baseApi';
import {
  posts, comments, toggleFollow, userPosts,
} from 'common/utils/network/endpoints';
export const postsApi = baseApi
  .enhanceEndpoints({ addTagTypes: ['posts', 'comments'] })
  .injectEndpoints({
    endpoints: (builder) => ({
      createPost: builder.mutation({
        query: (body) => ({
          url: posts,
          method: 'POST',
          body,
        }),
      }),
      viewPost: builder.query({
        query: ({ id, companyUsername }) => {
          const url = companyUsername ? `${posts}/${id}?company=${companyUsername}` : `${posts}/${id}`;
          return {
            url,
            method: 'GET',
          };
        },
        providesTags: ['posts'],
      }),
      updatePost: builder.mutation({
        query: ({ id, companyUsername, body }) => {
          const url = companyUsername ? `${posts}/${id}?company=${companyUsername}` : `${posts}/${id}`;
          return {
            url,
            method: 'PUT',
            body,
          };
        },
        invalidatesTags: ['posts'],
      }),
      addComment: builder.mutation({
        query: (data) => ({
          url: comments,
          method: 'POST',
          body: data,
        }),
        invalidatesTags: ['comments'],
      }),
      viewComments: builder.query({
        query: (id) => ({
          url: `${posts}/${id}${comments}`,
          method: 'GET',
        }),
        providesTags: ['comments'],
      }),
      followPostsUser: builder.mutation({
        query: (data) => ({
          url: toggleFollow,
          method: 'POST',
          body: data,
        }),
        invalidatesTags: ['posts'],
      }),
      userPosts: builder.query({
        query: (params) => ({
          url: `${userPosts}?page=${params.page || 1}&company=${params.username || ''}`,
          method: 'GET',
        }),
        providesTags: ['posts'],
      }),
      deletePost: builder.mutation({
        query: (id) => ({
          url: `${posts}/${id}`,
          method: 'DELETE',
        }),
      }),
    }),
  });

export const {
  useCreatePostMutation, useViewPostQuery, useUpdatePostMutation,
  useAddCommentMutation, useViewCommentsQuery, useFollowPostsUserMutation,
  useUserPostsQuery, useDeletePostMutation,
} = postsApi;
