import { baseApi } from 'common/store/baseApi';
import {
  tags, article, userArticles, comments, togglePin, upvoteContent, toggleFollow,
} from 'common/utils/network/endpoints';
export const articleApi = baseApi
  .enhanceEndpoints({ addTagTypes: ['articles', 'comments', 'singleArticle', 'savedPins', 'upvote', 'company', 'Profile'] })
  .injectEndpoints({
    endpoints: (builder) => ({
      tags: builder.mutation({
        query: ({ keyword, filter }) => ({
          url: `${tags}?keyword=${keyword}${filter ? `&filter=${filter}` : ''}`,
          method: 'GET',
        }),
      }),
      article: builder.mutation({
        query: (data) => ({
          url: article,
          method: 'POST',
          body: data,
        }),
        invalidatesTags: ['articles'],
      }),
      userArticles: builder.query({
        query: (params) => ({
          url: `${userArticles}?page=${params.page || 1}&company=${params.username || ''}`,
          method: 'GET',
        }),
        providesTags: ['articles'],
      }),
      getArticle: builder.query({
        query: ({ id, companyUsername }) => {
          const url = companyUsername ? `${article}/${id}?company=${companyUsername}` : `${article}/${id}`;
          return {
            url,
            method: 'GET',
          };
        },
        providesTags: ['singleArticle', 'articles', 'upvote'],
      }),
      publishArticle: builder.mutation({
        query: ({ id, data }) => {
          return {
            url: `${article}/${id}`,
            method: 'PUT',
            body: data,
          };
        },
        invalidatesTags: ['articles'],
      }),
      updateArticle: builder.mutation({
        query: ({ id, data }) => {
          return {
            url: `${article}/${id}`,
            method: 'PUT',
            body: data,
          };
        },
        invalidatesTags: ['articles'],
      }),
      pinArticle: builder.mutation({
        query: (data) => ({
          url: `${togglePin}`,
          method: 'POST',
          body: data,
        }),
        invalidatesTags: ['singleArticle', 'savedPins', 'company', 'Profile'],
      }),
      listPinArticle: builder.query({
        query: (query) => {
          const url = query?.type ? `${togglePin}?company=${query.type}` : togglePin;
          return {
            url,
            method: 'GET',
          };
        },
        providesTags: ['savedPins'],
      }),
      comment: builder.mutation({
        query: (data) => ({
          url: comments,
          method: 'POST',
          body: data,
        }),
        invalidatesTags: ['comments'],
      }),
      comments: builder.query({
        query: (id) => ({
          url: `${article}/${id}${comments}`,
          method: 'GET',
        }),
        providesTags: ['comments'],
      }),
      upvoteArticle: builder.mutation({
        query: (data) => ({
          url: upvoteContent,
          method: 'POST',
          body: data,
        }),
        invalidatesTags: ['upvote'],
      }),
      followArticleUser: builder.mutation({
        query: (data) => ({
          url: toggleFollow,
          method: 'POST',
          body: data,
        }),
        invalidatesTags: ['articles'],
      }),
      deleteArticle: builder.mutation({
        query: (id) => ({
          url: `${article}/${id}`,
          method: 'DELETE',
        }),
      }),
    }),
  });

export const {
  useTagsMutation, useArticleMutation, useUserArticlesQuery, useGetArticleQuery,
  usePublishArticleMutation, usePinArticleMutation,
  useListPinArticleQuery, useCommentsQuery, useCommentMutation, useUpvoteArticleMutation,
  useFollowArticleUserMutation, useDeleteArticleMutation, useUpdateArticleMutation,
} = articleApi;
