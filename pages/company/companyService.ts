import { companyUrl, toggleFollow } from 'common/utils/network/endpoints';
import { baseApi } from 'common/store/baseApi';

export const companiesApi = baseApi
  .enhanceEndpoints({ addTagTypes: ['company'] })
  .injectEndpoints({
    endpoints: (builder) => ({
      checkCompany: builder.mutation({
        query: (url) => ({
          url: companyUrl,
          params: { url },
          method: 'GET',
        }),
      }),
      checkCompanyDraftURL: builder.mutation({
        query: (username) => ({
          url: companyUrl,
          params: { username },
          method: 'GET',
        }),
      }),
      addCompany: builder.mutation({
        query: (data) => ({
          url: companyUrl,
          body: data,
          method: 'POST',
        }),
      }),
      getCompany: builder.query({
        query: ({ companyName, company }) => ({
          url: `${companyUrl}/${companyName}${company ? `?company=${company}` : ''}`,
          method: 'GET',
        }),
        providesTags: ['company'],
      }),
      getCompanies: builder.mutation({
        query: ({ keyword, filter }) => ({
          url: `${companyUrl}${keyword ? `?keyword=${keyword}` : ''}${filter ? `&filter=${filter}` : ''}`,
          method: 'GET',
        }),
      }),
      updateCompany: builder.mutation({
        query: (data) => ({
          url: `${companyUrl}/${data.id}`,
          body: data.payload,
          method: 'PUT',
        }),
        invalidatesTags: ['company'],
      }),
      updateOrgBrandLayout: builder.mutation({
        query: (data) => ({
          url: `${companyUrl}/${data.id}`,
          body: { brand_layout: data.brandLayout },
          method: 'PUT',
        }),
      }),
      followCompany: builder.mutation({
        query: (data) => ({
          url: toggleFollow,
          method: 'POST',
          body: data,
        }),
        invalidatesTags: ['company'],
      }),
      verifyOtp: builder.mutation({
        query: (data) => ({
          url: `${companyUrl}/verify`,
          method: 'POST',
          body: data,
        }),
      }),
    }),
  });

export const {
  useCheckCompanyMutation, useCheckCompanyDraftURLMutation, useAddCompanyMutation, useGetCompanyQuery,
  useUpdateCompanyMutation, useUpdateOrgBrandLayoutMutation, useFollowCompanyMutation, useGetCompaniesMutation,
  useVerifyOtpMutation,
} = companiesApi;
