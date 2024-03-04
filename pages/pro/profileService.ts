import {
  addProject,
  getProfile,
  updateBio,
  onboardingUrl,
  completeOnboardingUrl,
  addBlock,
  content,
  toggleFollow,
  experiences,
  categories,
  education,
  resume,
} from 'common/utils/network/endpoints';
import { baseApi } from 'common/store/baseApi';

export const profileApi = baseApi
  .enhanceEndpoints({ addTagTypes: ['Profile', 'Projects', 'company', 'experience', 'education'] })
  .injectEndpoints({
    endpoints: (builder) => ({
      profile: builder.query({
        query: ({ username, company }) => username ? `${getProfile}?username=${username}${company ? `&company=${company}` : ''}` : getProfile,
        providesTags: ['Profile'],
      }),
      updateUser: builder.mutation({
        query: (formData) => ({
          url: updateBio,
          method: 'PUT',
          body: formData,
        }),
        invalidatesTags: ['Profile'],
      }),
      addProject: builder.mutation({
        query: (formData) => ({
          url: addProject,
          body: formData,
          method: 'POST',
        }),
        invalidatesTags: ['Projects'],
      }),
      addBlock: builder.mutation({
        query: (body) => ({
          url: addBlock,
          body,
          method: 'POST',
        }),
        invalidatesTags: ['Profile', 'company'],
      }),
      editBlock: builder.mutation({
        query: (formData) => ({
          url: `${addBlock}/${formData.id}`,
          body: formData.payload,
          method: 'PUT',
        }),
        invalidatesTags: ['Profile', 'company'],
      }),
      deleteBlock: builder.mutation({
        query: ({ id, body }) => ({
          url: `${addBlock}/${id}`,
          method: 'DELETE',
          body,
        }),
        invalidatesTags: ['Profile', 'company'],
      }),
      projects: builder.query({
        query: ({ side }) => `${addProject}?${side ? 'side=1' : ''}`,
        providesTags: ['Projects'],
      }),
      editProject: builder.mutation({
        query: ({ body, id }) => ({
          url: `${addProject}/${id}`,
          body,
          method: 'PUT',
        }),
        invalidatesTags: ['Projects'],
      }),
      content: builder.mutation({
        query: ({ page, company, user }) => `${content}?page=${page}${company ? `&company=${company}` : ''}${user ? `&user=${user}` : ''}`,
      }),
      followUser: builder.mutation({
        query: (data) => ({
          url: toggleFollow,
          method: 'POST',
          body: data,
        }),
        invalidatesTags: ['Profile'],
      }),
      addExperience: builder.mutation({
        query: (data) => ({
          url: experiences,
          method: 'POST',
          body: data,
        }),
        invalidatesTags: ['experience'],
      }),
      editExperience: builder.mutation({
        query: ({ body, id }) => ({
          url: `${experiences}/${id}`,
          method: 'PUT',
          body,
        }),
        invalidatesTags: ['experience'],
      }),
      getCategories: builder.mutation({
        query: ({ keyword }) => ({
          url: `${categories}?${keyword ? `&keyword=${keyword}` : ''}`,
          method: 'GET',
        }),
      }),
      getExperience: builder.mutation({
        query: ({ keyword }) => ({
          url: `${experiences}?${keyword ? `keyword=${keyword}` : ''}`,
          method: 'GET',
        }),
      }),
      experience: builder.query({
        query: () => ({
          url: experiences,
          method: 'GET',
        }),
        providesTags: ['experience', 'Projects'],
      }),
      education: builder.query({
        query: () => ({
          url: education,
          method: 'GET',
        }),
        providesTags: ['education'],
      }),
      addEducation: builder.mutation({
        query: (body) => ({
          url: education,
          method: 'POST',
          body,
        }),
        invalidatesTags: ['education', 'Profile'],
      }),
      editEducation: builder.mutation({
        query: ({ body, id }) => ({
          url: `${education}/${id}`,
          method: 'PUT',
          body,
        }),
        invalidatesTags: ['education', 'Profile'],
      }),
      resume: builder.query({
        query: (username) => ({
          url: `${resume}?username=${username}`,
          method: 'GET',
        }),
        providesTags: ['Projects', 'experience', 'education'],
      }),
      deleteExperience: builder.mutation({
        query: ({ id, body }) => ({
          url: `${experiences}/${id}`,
          method: 'DELETE',
          body,
        }),
        invalidatesTags: ['experience'],
      }),
      deleteProject: builder.mutation({
        query: ({ id, body }) => ({
          url: `${addProject}/${id}`,
          method: 'DELETE',
          body,
        }),
        invalidatesTags: ['Projects'],
      }),
      deleteEducation: builder.mutation({
        query: ({ id, body }) => ({
          url: `${education}/${id}`,
          method: 'DELETE',
          body,
        }),
        invalidatesTags: ['Projects', 'experience', 'education'],
      }),
    }),
  });

export const onBoardingApi = baseApi
  .enhanceEndpoints({ addTagTypes: ['Onboarding'] })
  .injectEndpoints({
    endpoints: (builder) => ({
      onboarding: builder.mutation({
        query: (formData) => ({
          url: onboardingUrl,
          method: 'PUT',
          body: formData,
        }),
      }),
      completeOnboarding: builder.mutation({
        query: () => ({
          url: completeOnboardingUrl,
          method: 'GET',
        }),
      }),
    }),
  });

export const {
  useProfileQuery,
  useUpdateUserMutation,
  useAddProjectMutation,
  useProjectsQuery,
  useEditProjectMutation,
  useAddBlockMutation,
  useEditBlockMutation,
  useDeleteBlockMutation,
  useContentMutation,
  useFollowUserMutation,
  useAddExperienceMutation,
  useGetCategoriesMutation,
  useExperienceQuery,
  useGetExperienceMutation,
  useEducationQuery,
  useAddEducationMutation,
  useResumeQuery,
  useDeleteExperienceMutation,
  useDeleteProjectMutation,
  useDeleteEducationMutation,
  useEditExperienceMutation,
  useEditEducationMutation,
} = profileApi;

export const { useOnboardingMutation, useCompleteOnboardingMutation } = onBoardingApi;
