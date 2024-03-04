import { GetServerSidePropsContext } from 'next';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { selectCurrentCompany } from 'pages/account/authSlice';
import { apiRootUrl, getProfile, jobsUrl } from 'common/utils/network/endpoints';
import { getHeaders, getLocalUser } from 'utils/getApiHeaders';
import { ToastContainer } from 'react-toastify';
import { JOB_VIEW_TYPE } from 'common/types';
import NavbarCompact from 'components/Molecules/JobNavbarCompact';
import LayoutWithNavbar from 'components/LayoutWithNavbar/LayoutWithNavbar';
import NotFound from 'pages/404/index.page';
import { CompanyPageContainer } from './styles';
import JobDetail from './Job';
import { JobPageProps } from './types';
import ApplicantsList from './Applications/Applications';
import Recommendations from './Recommendations/Recommendations';

export async function getServerSideProps(context: GetServerSidePropsContext, jobId: number) {
  let currentUser = { data: { data: {} } };
  const { slug } = context.query;
  try {
    const localUser = getLocalUser(context.req.headers.cookie as string);
    const userToken = localUser?.token;
    const getJob = axios.get(`${apiRootUrl}${jobsUrl}/${context.params?.id || jobId}`, getHeaders(userToken as string));
    const getUser = axios.get(`${apiRootUrl}${getProfile}?username=${localUser?.username}`, getHeaders(userToken as string));
    const [{ data }, userData] = await Promise.all([getJob, getUser]);
    if (data?.data?.slug && jobId && data.data?.slug !== slug) {
      return {
        notFound: true,
      };
    }
    if (!jobId && data.data?.slug) {
      return {
        redirect: {
          permanent: false,
          destination: `/${data.data.slug}`,
        },
      };
    }
    if (localUser) {
      currentUser = userData;
    }
    const formateJobDetails = data.data;
    return {
      props: {
        jobData: {
          ...formateJobDetails,
          company: data.data.company || null,
          applications: data.data.applications || null,
        },
        loggedInUser: localUser ? currentUser.data.data : false,
        origin: context.req.headers.host,
      },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
}

const JobPage = ({
  jobData, loggedInUser, view, slug,
}: JobPageProps) => {
  const router = useRouter();
  const currentCompany = useSelector(selectCurrentCompany);
  const isUserB2B = currentCompany?.id === jobData?.company?.id;
  return (
    <LayoutWithNavbar loggedInUser>
      <ToastContainer
        position="top-center"
        hideProgressBar
        style={{
          width: '100%',
          maxWidth: '906px',
        }}
      />
      <CompanyPageContainer>
        {view !== JOB_VIEW_TYPE.JOB && (
          <NavbarCompact
            step={1}
            stepsToRender={[]}
            title={jobData?.role?.name}
            onBack={() => router.back()}
            isAuthor={isUserB2B}
            view={view}
            slug={slug}
            jobData={jobData}
          />
        )}
        {view === JOB_VIEW_TYPE.JOB && <JobDetail view={view} slug={slug} isAuthor={isUserB2B} jobData={jobData} loggedInUser={loggedInUser} />}
        {view === JOB_VIEW_TYPE.APPLICATIONS && isUserB2B && <ApplicantsList jobData={jobData} loggedInUser={loggedInUser} slug={slug} />}
        {view === JOB_VIEW_TYPE.SOURCING && isUserB2B && <Recommendations jobData={jobData} loggedInUser={loggedInUser} slug={slug} />}
        {(view === JOB_VIEW_TYPE.APPLICATIONS || view === JOB_VIEW_TYPE.SOURCING) && !isUserB2B && <NotFound />}
      </CompanyPageContainer>
    </LayoutWithNavbar>
  );
};

export default JobPage;
