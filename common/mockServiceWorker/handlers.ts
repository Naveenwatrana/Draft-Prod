import { rest } from 'msw';
import {
  recoverPassUrl,
  signInUrl,
  signUpUrl,
  verifyUrl,
  resetPassUrl,
  onboardingUrl,
  addProject,
  jobsUrl,
  getProfile,
  article,
  notifications,
  togglePin,
} from 'common/utils/network/endpoints';

const apiMatcher = '*/api/v1';
export const handlers = [
  rest.post(`${apiMatcher}${signInUrl}`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: {
          username: 'admin',
          token: 'some-token',
          type: 'some-token-type',
        },
      }),
    );
  }),

  rest.post(`${apiMatcher}${signUpUrl}`, (req, res, ctx) => {
    return res(ctx.status(201));
  }),

  rest.get(`${apiMatcher}${verifyUrl}/*`, (req, res, ctx) => {
    return res(ctx.status(201));
  }),

  rest.post(`${apiMatcher}${recoverPassUrl}`, async (req, res, ctx) => {
    const { email } = await req.json();

    if (email === 'test@email.c') {
      return res(
        ctx.status(422),
        ctx.json({
          message: 'This email address is invalid. Please try again.',
        }),
      );
    }

    if (email === 'test@email.com') {
      return res(
        ctx.status(422),
        ctx.json({
          message: 'No user record found with provided email',
        }),
      );
    }

    return res(ctx.status(200));
  }),

  rest.post(`${apiMatcher}${resetPassUrl}`, (req, res, ctx) => {
    return res(
      ctx.status(422),
      ctx.json({
        message: 'Link you are trying has expired!',
      }),
    );
  }),

  rest.put(`${apiMatcher}${onboardingUrl}`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: {
          id: 218,
          first_name: 'QQQ',
          email: 'jay@founderandlightning.com',
          email_verified_at: '2022-12-07T06:45:43.000000Z',
          created_at: '2022-12-07T06:44:55.000000Z',
          updated_at: '2022-12-29T10:30:51.000000Z',
          failed_login_attempt: 0,
          last_failed_login_date: null,
          deleted_at: null,
          last_name: 'scsdc',
          profile_cover: 'project-image/2img.png',
          onboarding_status: true,
          bio: 'csvsdvsdvdsv',
          mantra: 'vsdds  fd fdfd fd',
          onboarding_step: null,
          presigned_profile_cover:
            'https://draft-api-staging.s3.eu-west-2.amazonaws.com/project-image/undefined?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQ5H7KMXNC7RKBSUK%2F20221229%2Feu-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221229T114115Z&X-Amz-SignedHeaders=host&X-Amz-Expires=1200&X-Amz-Signature=054ea3ee61b32c167c58126b33ab524897a17b3e0f8918516f6ded3e6b78616d',
        },
      }),
    );
  }),

  rest.get(`${apiMatcher}${addProject}`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: [
          {
            id: 101,
            project_or_company: 'SARAB',
            role: null,
            start_date: '2022-05-04',
            ongoing: true,
            end_date: null,
            description: 'Test image',
            show_on_timeline: false,
            created_at: '2022-12-19T07:40:05.000000Z',
            updated_at: '2022-12-19T10:05:18.000000Z',
            user_id: 185,
            project_id: null,
            sub_project: [],
          },
        ],
      }),
    );
  }),
  rest.get(`${apiMatcher}${notifications}`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: [
          {
            id: 1,
            title: 'Senior Frontend Developer',
          },
        ],
      }),
    );
  }),
  rest.get(`${apiMatcher}${togglePin}`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: [
          {
            id: 1,
            title: 'Senior Frontend Developer',
          },
        ],
      }),
    );
  }),

  rest.get(`${apiMatcher}${getProfile}`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: {
          data: {
            id: 218,
            first_name: 'QQQ',
            email: 'jay@founderandlightning.com',
            email_verified_at: '2022-12-07T06:45:43.000000Z',
            created_at: '2022-12-07T06:44:55.000000Z',
            updated_at: '2022-12-29T10:30:51.000000Z',
            failed_login_attempt: 0,
            last_failed_login_date: null,
            deleted_at: null,
            last_name: 'scsdc',
            profile_cover: 'project-image/2img.png',
            onboarding_status: true,
            bio: 'csvsdvsdvdsv',
            mantra: 'vsdds  fd fdfd fd',
            onboarding_step: null,
            presigned_profile_cover:
              'https://draft-api-staging.s3.eu-west-2.amazonaws.com/project-image/undefined?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQ5H7KMXNC7RKBSUK%2F20221229%2Feu-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221229T114115Z&X-Amz-SignedHeaders=host&X-Amz-Expires=1200&X-Amz-Signature=054ea3ee61b32c167c58126b33ab524897a17b3e0f8918516f6ded3e6b78616d',
          },
        },
      }),
    );
  }),
  rest.get(`${apiMatcher}${jobsUrl}/*`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: {
          id: 1,
          title: 'Senior Frontend Developer',
          description: 'Senior Frontend Developer',
          location: 'London',
          salary: '£100,000',
        },
      }),
    );
  }),
  rest.post(`${apiMatcher}${article}`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: {
          id: 1,
        },
      }),
    );
  }),
];
