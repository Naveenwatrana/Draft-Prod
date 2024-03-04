import { meltwaterArticles, meltwaterSettings } from 'common/utils/network/endpoints';
import { baseApi } from 'common/store/baseApi';

export const meltwaterApi = baseApi
  .enhanceEndpoints({ addTagTypes: ['meltwater'] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getMeltwaterConnection: builder.query({
        query: () => ({
          url: `${meltwaterSettings}`,
          method: 'GET',
        }),
        providesTags: ['meltwater'],
      }),
      addMeltwaterConnection: builder.mutation({
        query: (body) => ({
          url: `${meltwaterSettings}`,
          method: 'POST',
          body,
        }),
        invalidatesTags: ['meltwater'],
      }),
      updateMeltwaterConnection: builder.mutation({
        query: ({ body, id }) => ({
          url: `${meltwaterSettings}/${id}`,
          method: 'PUT',
          body,
        }),
        invalidatesTags: ['meltwater'],
      }),
      listMeltwaterArticles: builder.mutation({
        query: ({ pageNumber, meltwaterType }) => ({
          url: `${meltwaterArticles}?page=${pageNumber}${meltwaterType ? `&${meltwaterType.map((type: string) => `meltwater_types[]=${type}`).join('&')}` : ''}`,
          method: 'GET',
        }),
      }),
    }),
  });

export const {
  useGetMeltwaterConnectionQuery,
  useAddMeltwaterConnectionMutation,
  useUpdateMeltwaterConnectionMutation,
  useListMeltwaterArticlesMutation,
} = meltwaterApi;
