import { useHandleMissingSession } from 'common/hooks/useHandleMissingSession';
import { useIsMobile } from 'common/hooks/useIsMobile';
import React from 'react';
import cookie from 'cookie';
import { GetServerSidePropsContext } from 'next';
import { getHeaders, getLocalCompany } from 'utils/getApiHeaders';
import { apiRootUrl, jobsUrl } from 'common/utils/network/endpoints';
import axios from 'axios';
import MobileMessages from './mobile';
import DesktopMessages from './desktop';
import { MessagesProps } from './types';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { slug } = context.query;
  try {
    const cookies = cookie.parse(context.req.headers.cookie || '');
    const localUser = cookies.user ? JSON.parse(cookies.user) : null;
    const localCompany = getLocalCompany(context.req.headers.cookie || '');
    const jobId = slug?.toString().split('-').pop();

    const url = `${apiRootUrl}${jobsUrl}/${jobId}/conversations`;
    const { data: { data } } = await axios.get(url, getHeaders(localUser.token as string));
    const jobUrl = `${apiRootUrl}${jobsUrl}/${jobId}`;
    const { data: { data: jobData } } = await axios.get(jobUrl, getHeaders(localUser.token as string));
    return {
      props: {
        loggedInUser: localCompany || localUser,
        conversationList: data,
        jobData,
      },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
}

const Messages = (props: MessagesProps) => {
  const isMobile = useIsMobile();
  useHandleMissingSession();
  return isMobile ? (
    <MobileMessages {...props} />
  ) : (
    <DesktopMessages {...props} />
  );
};

export default Messages;
