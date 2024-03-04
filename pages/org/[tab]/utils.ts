import axios from 'axios';
import { apiRootUrl, companyContent } from 'common/utils/network/endpoints';
import cookie from 'cookie';
import { GetServerSidePropsContext } from 'next';
import { getHeaders, getLocalUser } from 'utils/getApiHeaders';
import { stringifyToJson } from 'common/utils/jsonParser';
import { ILocalCompany } from './types';

export const getLocalUserData = async (context: GetServerSidePropsContext, apiLink: string) => {
  const localUser = getLocalUser(context.req.headers.cookie || '');
  const cookies = cookie.parse(context.req.headers.cookie || '');
  const localCompany: ILocalCompany = stringifyToJson(cookies.company);

  const apiUrl = localCompany.username ? `${apiLink}?company=${localCompany.username}` : apiLink;
  const { data } = await axios.get(apiUrl, getHeaders(localUser?.token ?? ''));
  return { data: data.data, localCompany };
};

export const getCompanyContent = async (context: GetServerSidePropsContext) => {
  const localUser = getLocalUser(context.req.headers.cookie || '');
  const cookies = cookie.parse(context.req.headers.cookie || '');
  const localCompany = stringifyToJson(cookies.company);
  const userName = context.params?.tab;

  let apiUrl = `${apiRootUrl}${companyContent}?username=${userName}&page=1`;
  apiUrl = localCompany ? `${apiUrl}&company=${localCompany?.username}` : apiUrl;
  const { data } = await axios.get(apiUrl, getHeaders(localUser?.token ?? ''));
  return data.data;
};
