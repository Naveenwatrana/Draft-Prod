/* eslint-disable @typescript-eslint/naming-convention */
import { profileApi, useFollowUserMutation } from 'pages/pro/profileService';
import { selectCurrentCompany } from 'pages/account/authSlice';
import { postsApi, useFollowPostsUserMutation } from 'pages/posts/postsService';
import { companiesApi, useFollowCompanyMutation } from 'pages/company/companyService';
import { articleApi, useFollowArticleUserMutation } from 'pages/article/articleService';
import { useAppDispatch, useAppSelector } from './state';

const useFollow = () => {
  const [followUserApi, results] = useFollowUserMutation();
  const [followCompanyApi, companyResults] = useFollowCompanyMutation();
  const [followArticleUserAPi, articleResults] = useFollowArticleUserMutation();
  const [followPostsUserApi] = useFollowPostsUserMutation();
  const userIsCompany = useAppSelector(selectCurrentCompany);
  const dispatch = useAppDispatch();
  const companyDetails = {
    follower_type: 'companies',
    follower_id: userIsCompany?.id,
  };

  const followUser = async (userId: string) => {
    await followUserApi({
      followable_type: 'users',
      followable_id: userId,
      ...(userIsCompany ? companyDetails : {}),
    });
    dispatch(articleApi.util.invalidateTags(['articles']));
    dispatch(postsApi.util.invalidateTags(['posts']));
    dispatch(profileApi.util.invalidateTags(['Profile']));
    dispatch(companiesApi.util.invalidateTags(['company']));
  };

  const followCompany = async (companyId: string) => {
    await followCompanyApi({
      followable_type: 'companies',
      followable_id: companyId,
      ...(userIsCompany ? companyDetails : {}),
    });
    dispatch(articleApi.util.invalidateTags(['articles']));
    dispatch(postsApi.util.invalidateTags(['posts']));
    dispatch(profileApi.util.invalidateTags(['Profile']));
    dispatch(companiesApi.util.invalidateTags(['company']));
  };
  const followArticleUsers = async (userId: string, isCompany: boolean) => {
    await followArticleUserAPi({
      followable_type: isCompany ? 'companies' : 'users',
      followable_id: userId,
      ...(userIsCompany ? companyDetails : {}),
    });
    dispatch(profileApi.util.invalidateTags(['Profile']));
    dispatch(companiesApi.util.invalidateTags(['company']));
  };
  const followPostsUsers = async (userId: string, isCompany: boolean) => {
    await followPostsUserApi({
      followable_type: isCompany ? 'companies' : 'users',
      followable_id: userId,
      ...(userIsCompany ? companyDetails : {}),
    });
    dispatch(profileApi.util.invalidateTags(['Profile']));
    dispatch(companiesApi.util.invalidateTags(['company']));
  };
  const unFollowUser = (userId: string) => {
    // MAKE API CALL 2
  };

  return {
    followUser,
    unFollowUser,
    followCompany,
    followArticleUsers,
    followPostsUsers,
    companyResults,
    results,
  };
};

export default useFollow;
