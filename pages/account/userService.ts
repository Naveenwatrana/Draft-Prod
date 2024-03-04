import {
  RecoverPassDTO,
  ResetPassDTO,
  SignInDTO,
  SignInResponseDTO,
  SignUpDTO,
} from 'pages/account/types';
import {
  signInUrl,
  signUpUrl,
  verifyUrl,
  recoverPassUrl,
  resetPassUrl,
  signOutUrl,
  resendEmailUrl,
} from 'common/utils/network/endpoints';
import { baseApi } from 'common/store/baseApi';

export const userApi = baseApi
  .enhanceEndpoints({ addTagTypes: ['User'] })
  .injectEndpoints({
    endpoints: (builder) => ({
      signIn: builder.mutation<SignInResponseDTO, SignInDTO>({
        query: (formData) => ({
          url: signInUrl,
          method: 'POST',
          body: formData,
        }),
      }),
      signUp: builder.mutation<void, SignUpDTO>({
        query: (formData) => ({
          url: signUpUrl,
          method: 'POST',
          body: formData,
        }),
      }),
      verify: builder.query({
        query: (token) => `${verifyUrl}/${token}`,
      }),
      resendEmail: builder.mutation({
        query: (email) => ({
          method: 'POST',
          url: resendEmailUrl,
          body: { email },
        }),
      }),
      recoverPass: builder.mutation<void, RecoverPassDTO>({
        query: (formData) => ({
          url: recoverPassUrl,
          method: 'POST',
          body: formData,
        }),
      }),
      resetPass: builder.mutation<void, ResetPassDTO>({
        query: (formData) => ({
          url: resetPassUrl,
          method: 'POST',
          body: formData,
        }),
      }),
      signOut: builder.mutation<void, void>({
        query: () => ({
          url: signOutUrl,
          method: 'POST',
        }),
      }),
    }),
  });

export const {
  useSignInMutation,
  useSignUpMutation,
  useVerifyQuery,
  useRecoverPassMutation,
  useResetPassMutation,
  useSignOutMutation,
  useResendEmailMutation,
} = userApi;
