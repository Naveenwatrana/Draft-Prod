import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import axios from 'axios';
import { apiRootUrl, getProfile } from 'common/utils/network/endpoints';
import { getHeaders, getLocalCompany, getLocalUser } from 'utils/getApiHeaders';
import { getOrigin } from 'utils/getOrigin';
import { ProfileProps } from './types';
import OwnProfile from './Profile';
import OnboardSuccess from './components/OnboardSuccess';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const currentUser = {
    data: {},
  };
  try {
    const localUser = getLocalUser(context.req.headers.cookie as string);
    const localCompany = getLocalCompany(context.req.headers.cookie || '');
    const userToken = localUser?.token;
    const userId = context.params?.username ? `?username=${context.params.username}` : '';
    const company = localCompany?.username ? `&company=${localCompany.username}` : '';
    const { data } = await axios.get(`${apiRootUrl}${getProfile}${userId}${company}`, getHeaders(userToken as string));
    return {
      props: {
        profileData: data.data,
        currentUser: currentUser.data,
        isCurrentUser: localUser?.username === context.params?.username,
        newlyOnboarded: localUser?.username === data?.data?.username && (localUser?.newlyOnboarded || ''),
        origin: context.req.headers.host,
        globals: { origin: getOrigin(context) },
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

const Profile = ({
  profileData, currentUser, isCurrentUser, newlyOnboarded, origin,
}: ProfileProps) => {
  return (
    <>
      <Head>
        <title>{`${profileData.name} | The Draft`}</title>
        <meta
          name="description"
          content={`Learn about ${profileData.name}'s career and explore their content on The Draft.`}
        />
        <link rel="canonical" href={`https://${origin}/pro/${profileData.username}`} />
      </Head>
      <OnboardSuccess newlyOnboarded={newlyOnboarded} />
      <OwnProfile
        profileData={profileData}
        loggedInUser={currentUser}
        isViewingOwnProfile={isCurrentUser}
      />
    </>
  );
};

export default Profile;
