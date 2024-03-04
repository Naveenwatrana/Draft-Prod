import {
  conversations, messages, jobsUrl, usersApplications, unreadConversations,
} from 'common/utils/network/endpoints';
import { baseApi } from 'common/store/baseApi';

export const messagesApi = baseApi
  .enhanceEndpoints({ addTagTypes: ['message', 'conversation'] })
  .injectEndpoints({
    endpoints: (builder) => ({
      addConversations: builder.mutation({
        query: (body) => ({
          url: `${conversations}`,
          method: 'POST',
          body,
        }),
        invalidatesTags: ['message', 'conversation'],
      }),
      addJobConversations: builder.mutation({
        query: ({ body, id }) => ({
          url: `${jobsUrl}/${id}${conversations}`,
          method: 'POST',
          body,
        }),
        invalidatesTags: ['message', 'conversation'],
      }),
      addMessageConversations: builder.mutation({
        query: ({ body, uuid }) => ({
          url: `${conversations}/${uuid}${messages}`,
          method: 'POST',
          body,
        }),
        invalidatesTags: ['message', 'conversation'],
      }),
      getMessageConversations: builder.query({
        query: (uuid) => ({
          url: `${conversations}/${uuid}${messages}`,
          method: 'GET',
        }),
        providesTags: ['message'],
      }),
      getConversations: builder.query({
        query: ({ id, type }) => ({
          url: `${conversations}?participant_id=${id}&participant_type=${type}`,
          method: 'GET',
        }),
        providesTags: ['conversation'],
      }),
      getUserJobConversations: builder.query({
        query: () => ({
          url: `${usersApplications}${conversations}`,
          method: 'GET',
        }),
        providesTags: ['conversation'],
      }),
      getJobConversations: builder.query({
        query: ({ id }) => ({
          url: `${jobsUrl}/${id}${conversations}`,
          method: 'GET',
        }),
        providesTags: ['conversation'],
      }),
      getUnreadConversations: builder.query({
        query: (company) => ({
          url: `${unreadConversations}${company ? `?company=${company}` : ''}`,
          method: 'GET',
        }),
      }),
    }),
  });

export const {
  useAddConversationsMutation,
  useAddJobConversationsMutation,
  useAddMessageConversationsMutation,
  useGetMessageConversationsQuery,
  useGetConversationsQuery,
  useGetUserJobConversationsQuery,
  useGetJobConversationsQuery,
  useGetUnreadConversationsQuery,
} = messagesApi;
