import { GetServerSidePropsContext } from 'next';
import { useHandleMissingSession } from 'common/hooks/useHandleMissingSession';
import { useIsMobile } from 'common/hooks/useIsMobile';
import { getIsSsrMobile } from 'utils/mobileDetect';

import { getHeaders, getLocalUser } from 'utils/getApiHeaders';
import axios from 'axios';
import {
  apiRootUrl, companyUrl, industries, jobJoiningPreferencesOptions, meltwaterArticles, meltwaterSettings, userLink, userPosts,
} from 'common/utils/network/endpoints';
import lang from 'common/lang';
import { ToastContainer } from 'react-toastify';
import DesktopWorkspace from './DesktopWorkspace';
import MobileWorkspace from './MobileWorkspace';
import { WorkspaceProps } from './type';
const {
  workspace: { draftCompanyUsername },
} = lang;

export const Workspace = (props: WorkspaceProps) => {
  const isMobile = useIsMobile();
  useHandleMissingSession();
  return (
    <>
      <ToastContainer
        position="top-center"
        hideProgressBar
        style={{
          width: '100%',
          maxWidth: '906px',
        }}
      />
      {!isMobile ? <DesktopWorkspace {...props} /> : <MobileWorkspace {...props} />}
    </>
  );
};
export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const { company } = context.req.cookies;
    const localUser = getLocalUser(context.req.headers.cookie || '');
    let companyName = '';
    let getLinks = `${apiRootUrl}${userLink}?page=1`;
    if (company) {
      companyName = JSON.parse(company)?.username;
      getLinks = `${apiRootUrl}${companyUrl}/${companyName}/links`;
    }
    const getPosts = `${apiRootUrl}${userPosts}?page=1${companyName ? `&company=${companyName}` : ''}`;
    let meltwaterArticlesData = null;
    if (draftCompanyUsername === companyName) {
      const getArticles = `${apiRootUrl}${meltwaterArticles}?page=1`;
      meltwaterArticlesData = (await axios.get(getArticles, getHeaders(localUser?.token as string)))?.data?.data?.data;
    }
    const postsData = await axios.get(getPosts, getHeaders(localUser?.token as string));
    const linkData = await axios.get(getLinks, getHeaders(localUser?.token as string));
    const meltwaterSetting = await axios.get(`${apiRootUrl}${meltwaterSettings}`, getHeaders(localUser?.token as string));
    const {
      data: { data: jobJoiningPreferenceOptions },
    } = await axios.get(`${apiRootUrl}${jobJoiningPreferencesOptions}`);
    const {
      data: { data: industryOptions },
    } = await axios.get(`${apiRootUrl}${industries}`);
    return {
      props: {
        isSsrMobile: getIsSsrMobile(context),
        postCards: postsData?.data?.data?.data,
        linkCards: linkData.data?.data?.data,
        meltwaterSettings: meltwaterSetting?.data?.data,
        meltwaterArticlesData,
        jobJoiningPreferenceOptions,
        industryOptions,
      },
    };
  } catch (e: any) {
    if (e?.response?.status === 401) {
      return {
        redirect: {
          permanent: false,
          destination: '/account/signin',
        },
      };
    }
    return {
      notFound: true,
    };
  }
}
export default Workspace;
