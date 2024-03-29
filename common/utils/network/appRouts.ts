import { stringToKebabCase } from '../stringToKebabCase';

export const loginUrl = '/account/signin';
export const signUpUrl = '/account/signup';
export const joinInUrl = 'join-in';
export const businessPageUrl = '/business';
export const onboardingUpUrl = '/profile/onboarding/create';
export const onboardingUrl = '/profile/onboarding';
export const feedUrl = '/feed';
export const messagesUrl = '/messages';
export const org = '/org';
export const pro = '/pro';
export const job = '/job';
export const createJob = '/jobs/create';
export const createLink = '/link/create';
export const jobAtSlugRoute = '-job-at-';
export const userProfileUrl = (username: string) => `/pro/${username}`;
export const userResumeUrl = (username: string) => `/pro/${username}/resume`;
export const userContentUrl = (username: string) => `/pro/${username}/content`;
export const orgProfileUrl = (username: string) => `/org/${username}`;
export const orgJobsUrl = (username: string) => `/org/${username}/jobs`;
export const orgContentUrl = (username: string) => `/org/${username}/content`;
export const orgInsightUrl = (username: string) => `/org/${username}/insights`;
export const jobDetailsUrl = (id: number) => `/jobs/details/${id}`;
export const articleUrl = (id: number, title: string) => `/article/${stringToKebabCase(title)}-${id}`;
export const articleEditUrl = (id: number) => `/article/edit/${id}`;
export const postUrl = (id: number) => `/posts/${id}`;
export const viewLinkPostUrl = (id: number) => `/link/view/${id}`;
export const privacyPolicyUrl = '/privacy-policy';
export const TermsUseUrl = '/terms-of-use';
