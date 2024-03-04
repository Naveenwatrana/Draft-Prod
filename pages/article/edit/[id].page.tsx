import axios from 'axios';
import cookie from 'cookie';
import { GetServerSidePropsContext } from 'next';
import { getHeaders, getLocalCompany } from 'utils/getApiHeaders';
import { apiRootUrl, article, getProfile } from 'common/utils/network/endpoints';
import { EditArticlePageProps } from './types';
import EditArticlePage from './EditArticle';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  let currentUser = { data: { data: {} } };
  const cookies = cookie.parse(context.req.headers.cookie || '');
  const articleId = context.params?.id || [];
  const localCompany = getLocalCompany(context.req.headers.cookie || '');
  const localUser = cookies.user ? JSON.parse(cookies.user) : null;
  if (localUser) {
    currentUser = await axios.get(`${apiRootUrl}${getProfile}?username=${localUser.username}`);
  }
  const { data } = await axios.get(`${apiRootUrl}${article}/${articleId}${localCompany ? `?company=${localCompany.username}` : ''}`, getHeaders(localUser?.token as string));
  return {
    props: {
      loggedInUser: localUser ? currentUser.data.data : false,
      articleData: data.data,
    },
  };
}

const Page = ({ loggedInUser, articleData }: EditArticlePageProps) => (
  <EditArticlePage loggedInUser={loggedInUser} articleData={articleData} />
);
export default Page;
