import { getHeaders, getLocalUser } from 'utils/getApiHeaders';
import { GetServerSidePropsContext } from 'next';
import cookie from 'cookie';
import axios from 'axios';
import { apiRootUrl, companyUrl } from 'common/utils/network/endpoints';
import { getOrigin } from 'utils/getOrigin';
import { getIsSsrMobile } from 'utils/mobileDetect';
import PageHead from 'components/Atoms/PageHead';
import { CompanyDetailsPageProps } from '../../../company/types';
import CompanyJobPage from '../new/jobs/CompanyJobsPage';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const localUser = getLocalUser(context.req.headers.cookie || '');
    const cookies = cookie.parse(context.req.headers.cookie || '');
    const localCompany = JSON.parse(cookies.company || '{}');

    const userName = context.params?.tab;

    const jobsUrl = `${apiRootUrl}${companyUrl}/${userName}`;
    const { data } = await axios.get(
      localCompany.username ? `${jobsUrl}?company=${localCompany.username}` : jobsUrl,
      getHeaders(localUser?.token || ''),
    );
    return {
      props: {
        isSsrMobile: getIsSsrMobile(context),
        companyInfo: {
          jobs: data.data.published_jobs,
          followers_count: data.data.followers_count,
          followings_count: data.data.followings_count,
          name: data.data.name,
          location: data.data.location || '',
          username: data.data.username,
          id: data.data.id,
          saved: data.data.saved,
          followed: data.data.followed,
          ...data.data,
        },
        isOwnProfile: userName === localCompany?.username,
        globals: { origin: getOrigin(context) },
        origin: context.req.headers.host,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
const CompanyDetailsPage = ({
  companyInfo, isOwnProfile, origin,
}: CompanyDetailsPageProps) => {
  return (
    <>
      <PageHead
        title={`Jobs at ${companyInfo.name} | The Draft`}
        description={`Learn about ${companyInfo.name}'s opportunities through job openings.`}
        canonical={`https://${origin}/org/${companyInfo.username}/jobs`}
      />
      <CompanyJobPage isOwnProfile={isOwnProfile} companyInfo={companyInfo} />
    </>
  );
};

export default CompanyDetailsPage;
