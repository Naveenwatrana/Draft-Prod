import {
  interactions,
} from 'common/utils/network/endpoints';
import { baseApi } from 'common/store/baseApi';

export const AladdinApi = baseApi
  .enhanceEndpoints({ addTagTypes: ['Profile'] })
  .injectEndpoints({
    endpoints: (builder) => ({
      saveInteraction: builder.mutation({
        query: (formData) => ({
          url: interactions,
          method: 'POST',
          body: formData,
        }),
      }),
    }),
  });

export const {
  useSaveInteractionMutation,
} = AladdinApi;
