import axios from 'axios';
import cookie from 'cookie';
import { GetServerSidePropsContext } from 'next';
import { apiRootUrl, getProfile, links } from 'common/utils/network/endpoints';
import { getHeaders } from 'utils/getApiHeaders';
import { ViewShareLinkPageProps } from './types';
import ViewShareLinkPage from './ViewLink';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  let currentUser = { data: { data: {} } };
  const cookies = cookie.parse(context.req.headers.cookie || '');
  const localUser = cookies.user ? JSON.parse(cookies.user) : null;
  const linkId = context.params?.id as string;
  const commentsData = await axios.get(`${apiRootUrl}${links}/${linkId}/comments`, getHeaders(localUser?.token as string));
  if (localUser) {
    currentUser = await axios.get(`${apiRootUrl}${getProfile}?username=${localUser.username}`);
  }
  return {
    props: {
      loggedInUser: localUser ? currentUser.data.data : false,
      commentsData: commentsData.data,
    },
  };
}

const Page = ({ loggedInUser, commentsData }: ViewShareLinkPageProps) => (
  <ViewShareLinkPage loggedInUser={loggedInUser} commentsData={commentsData} />
);
export default Page;
