import { GetServerSidePropsContext } from 'next';
import axios from 'axios';
import { getOrigin } from 'utils/getOrigin';
import {
  apiRootUrl, getProfile, resume,
} from 'common/utils/network/endpoints';
import cookie from 'cookie';
import { getHeaders } from 'utils/getApiHeaders';
import Head from 'next/head';
import UserResumePage from './resume/Resume';
import UserContentTab from './components/content';
import { IProfileData, UserProfile } from './types';
import { getContentApiUrl } from './utils';
import OwnProfile from './Profile';

const notFoundPage = { notFound: true };
const isResumeTab = (tab: string) => tab === 'resume';
const isBrandTab = (tab: string) => tab === 'brand';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const currentUser = {
      data: {},
    };
    const params = context.params?.tab || [];
    const cookies = cookie.parse(context.req.headers.cookie || '');
    const localUser = cookies.user ? JSON.parse(cookies.user) : null;
    const localCompany = JSON.parse(cookies.company || '{}');
    if (params && params.length < 1) {
      return notFoundPage;
    }

    const userName = params[0];
    const tab = params[1];
    const userToken = localUser?.token;

    if (['resume', 'content', 'brand'].indexOf(tab) < 0) {
      return notFoundPage;
    }
    const userData = (await axios.get(`${apiRootUrl}${getProfile}?username=${userName}`, getHeaders(localUser?.token as string))).data?.data;

    const apiUrl = isResumeTab(tab) ? `${apiRootUrl}${resume}?username=${userName}` : getContentApiUrl(userName, localCompany?.username);

    const { data } = await axios.get(apiUrl, getHeaders(localUser?.token as string));
    const userId = userName ? `?username=${userName}` : '';
    const company = localCompany?.username ? `&company=${localCompany.username}` : '';
    const { data: { data: profileData } } = await axios.get(`${apiRootUrl}${getProfile}${userId}${company}`, getHeaders(userToken as string));
    return {
      props: {
        tab,
        userName,
        currentUser: currentUser.data,
        profileData,
        isCurrentUser: localUser?.username === context.params?.username,
        data: {
          ...data.data,
          id: userData.id,
          saved: userData.saved,
          name: userData.name,
        },
        origin: context.req.headers.host,
        ownProfile: localUser?.username === userName,
        globals: { origin: getOrigin(context) },
      },
    };
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('error', e);
    return notFoundPage;
  }
}
export type UserResumeProps = {
  tab: string;
  userName: string;
  data: IProfileData;
  ownProfile: boolean;
  origin: string;
  currentUser: UserProfile;
  profileData: UserProfile;
  isCurrentUser: boolean;
};
const UserResume = ({
  tab, userName, data, ownProfile, origin, currentUser, isCurrentUser, profileData,
}: UserResumeProps) => {
  if (isBrandTab(tab)) {
    return (
      <>
        <Head>
          <title>{`${data.name} Brand | The Draft`}</title>
          <meta
            name="description"
            content={`Learn about ${data.name}'s brand to explore their work experience, education and skill set.`}
          />
          <link rel="canonical" href={`https://${origin}/pro/${userName}/brand`} />
        </Head>
        <OwnProfile
          profileData={profileData}
          loggedInUser={currentUser}
          isViewingOwnProfile={isCurrentUser}
        />
      </>
    );
  }
  if (isResumeTab(tab)) {
    return (
      <>
        <Head>
          <title>{`${data.name} Resume | The Draft`}</title>
          <meta
            name="description"
            content={`Learn about ${data.name}'s resume to explore their work experience, education and skill set.`}
          />
          <link rel="canonical" href={`https://${origin}/pro/${userName}/resume`} />
        </Head>
        <UserResumePage ownProfile={ownProfile} userName={userName} data={data} />
      </>
    );
  }
  return (
    <>
      <Head>
        <title>{`${data.name} Content | The Draft`}</title>
        <meta
          name="description"
          content={`Learn about ${data.name}'s content to explore their ideas and thoughts on key topics.`}
        />
        <link rel="canonical" href={`https://${origin}/pro/${userName}/content`} />
      </Head>
      <UserContentTab ownProfile={ownProfile} userName={userName} data={data as any} />
    </>
  );
};

export default UserResume;
