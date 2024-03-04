import {
  companyUrl, locations, jobsUrl, userJobs, applyJob, userApplications, userApplicants,
  getProfile, jobPreferences, shortlist, userCandidate, recommendations,
} from 'common/utils/network/endpoints';
import { baseApi } from 'common/store/baseApi';

export const jobsApi = baseApi
  .enhanceEndpoints({ addTagTypes: ['Jobs', 'ApplyJob', 'company', 'preference'] })
  .injectEndpoints({
    endpoints: (builder) => ({
      location: builder.query({
        query: (keyword) => ({
          url: locations,
          params: { keyword },
        }),
        providesTags: ['Jobs'],
      }),
      getLocation: builder.mutation({
        query: (keyword) => ({
          url: locations,
          params: { keyword },
        }),
      }),
      jobDetail: builder.query({
        query: (uuid) => `${jobsUrl}/${uuid}`,
        providesTags: ['Jobs', 'ApplyJob'],
      }),
      jobList: builder.mutation({
        query: (page) => ({
          url: `${userJobs}?page=${page}`,
          method: 'GET',
        }),
      }),
      companyJobList: builder.mutation({
        query: ({
          id, page, statusFilter, company,
        }) => ({
          url: `${companyUrl}/${id}${jobsUrl}?page=${page}${company ? `&company=${company}` : ''}&${
            statusFilter && statusFilter !== '' ? `&&status=${statusFilter}` : ''
          }`,
          method: 'GET',
        }),
      }),
      addJob: builder.mutation({
        query: (formData) => ({
          url: jobsUrl,
          body: formData,
          method: 'POST',
        }),
      }),
      applyJob: builder.mutation({
        query: (uuid) => ({
          url: `${jobsUrl}/${uuid}${applyJob}`,
          method: 'POST',
        }),
        invalidatesTags: ['ApplyJob'],
      }),
      editJob: builder.mutation({
        query: ({ formData, id }) => ({
          url: `${jobsUrl}/${id}`,
          method: 'PUT',
          body: formData,
        }),
        invalidatesTags: ['Jobs', 'company'],
      }),
      deleteJob: builder.mutation({
        query: (id) => ({
          url: `${jobsUrl}/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['Jobs', 'company'],
      }),
      // TODO: Keep it in separate file
      loginWithLever: builder.mutation<
        void,
        { access_token: string; refresh_token: string }
      >({
        query: (formData) => ({
          url: '/lever-token',
          method: 'POST',
          body: formData,
        }),
      }),
      applicationList: builder.mutation({
        query: (page) => ({
          url: `${userApplications}?page=${page}`,
          method: 'GET',
        }),
      }),
      jobApplicantsList: builder.query({
        query: ({
          id, page, company, search, shortlisted, skill, messaged,
        }) => ({
          url: `${jobsUrl}/${id}${userApplicants}?page=${page}&company=${company}&skill=${skill}&keyword=${search}${shortlisted ? '&shortlisted=1' : ''}${messaged ? '&conversed=1' : ''}`,
          method: 'GET',
        }),
      }),
      jobRecommendationsList: builder.mutation({
        query: ({
          id, page, company, search, shortlisted, skill, applied, messaged,
        }) => ({
          url: `${jobsUrl}/${id}${userCandidate}${recommendations}?page=${page}${shortlisted ? '&shortlisted=1' : ''}${applied ? '&applied=1' : ''}${messaged ? '&conversed=1' : ''}${search.length > 0 ? (`&keyword=${search}`) : ''}`,
          method: 'GET',
        }),
      }),
      filteredApplicationList: builder.mutation({
        query: ({ keyword, id }) => ({
          url: `${jobsUrl}/${id}${userApplicants}?keyword=${keyword}`,
          method: 'GET',
        }),
      }),
      jobPreferences: builder.mutation({
        query: (body) => ({
          url: `${getProfile}${jobPreferences}`,
          method: 'POST',
          body,
        }),
        invalidatesTags: ['preference'],
      }),
      getJobPreferences: builder.query({
        query: () => ({
          url: `${getProfile}${jobPreferences}`,
        }),
        providesTags: ['preference'],
      }),
      shortListApplicant: builder.mutation({
        query: (applicantId) => ({
          url: `${userApplicants}/${applicantId}${shortlist}`,
          method: 'POST',
        }),
      }),
    }),
  });

export const {
  useLocationQuery,
  useJobDetailQuery,
  useAddJobMutation,
  useJobListMutation,
  useCompanyJobListMutation,
  useApplyJobMutation,
  useEditJobMutation,
  useDeleteJobMutation,
  useLoginWithLeverMutation,
  useApplicationListMutation,
  useGetLocationMutation,
  useJobApplicantsListQuery,
  useJobRecommendationsListMutation,
  useFilteredApplicationListMutation,
  useJobPreferencesMutation,
  useGetJobPreferencesQuery,
  useShortListApplicantMutation,
} = jobsApi;
