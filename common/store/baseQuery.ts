import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from 'common/store/types';
import { apiRootUrl } from 'common/utils/network/endpoints';

const baseQuery = fetchBaseQuery({
  baseUrl: apiRootUrl,
  prepareHeaders: (headers, { getState }) => {
    const { token } = (getState() as RootState).auth;

    if (token) {
      headers.set('authorization', `Bearer ${token.token}`);
    }

    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json, text/plain, */*');

    return headers;
  },
});

export default baseQuery;
