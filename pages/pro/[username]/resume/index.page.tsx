import { GetServerSidePropsContext } from 'next';
import axios from 'axios';
import { getOrigin } from 'utils/getOrigin';
import {
  apiRootUrl, getProfile, resume,
} from 'common/utils/network/endpoints';
import cookie from 'cookie';
import { getHeaders } from 'utils/getApiHeaders';
import lang from 'common/lang';
import PageHead from 'components/Atoms/PageHead';
import { formatMetaTagsText } from 'common/utils/textParser';
import { userResumeUrl } from 'common/utils/network/appRouts';
import Resume from './Resume';
import { UserResumeProps } from './types';

const notFoundPage = { notFound: true };

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const currentUser = {
      data: {},
    };
    console.error('no params >>', context.params);
    const cookies = cookie.parse(context.req.headers.cookie || '');
    const localUser = cookies.user ? JSON.parse(cookies.user) : null;
    const localCompany = JSON.parse(cookies.company || '{}');

    const userName = context.params?.username;
    const userToken = localUser?.token;
    const apiUrl = `${apiRootUrl}${resume}?username=${userName}`;
    const userId = userName ? `?username=${userName}` : '';
    const company = localCompany?.username ? `&company=${localCompany.username}` : '';
    const resumeApi = axios.get(apiUrl, getHeaders(localUser?.token as string));
    const userDataApi = axios.get(`${apiRootUrl}${getProfile}?username=${userName}`, getHeaders(localUser?.token as string));
    const profileApi = axios.get(`${apiRootUrl}${getProfile}${userId}${company}`, getHeaders(userToken as string));

    const promises = await Promise.all([userDataApi, resumeApi, profileApi]);
    const userData = (promises[0]).data?.data;

    const { data } = promises[1];
    const { data: { data: profileData } } = promises[2];
    return {
      props: {
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
    console.error('error', e);
    return notFoundPage;
  }
}

const UserResume = ({
  userName, data, ownProfile, origin, profileData,
}: UserResumeProps) => {
  const { title, description } = lang.SEO.userResumePage;
  const pageTitle = formatMetaTagsText(title, [data.name as string]);
  const pageDescription = formatMetaTagsText(description, [data.name as string]);

  return (
    <>
      <PageHead
        title={pageTitle}
        description={pageDescription}
        canonical={`https://${origin}${userResumeUrl(userName)}`}
      />
      <Resume data={data} profileData={profileData} ownProfile={ownProfile} />
    </>
  );
};

export default UserResume;
