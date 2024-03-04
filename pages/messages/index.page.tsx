import { useHandleMissingSession } from 'common/hooks/useHandleMissingSession';
import { useIsMobile } from 'common/hooks/useIsMobile';
import React from 'react';
import cookie from 'cookie';
import { GetServerSidePropsContext } from 'next';
import { getHeaders, getLocalCompany } from 'utils/getApiHeaders';
import { apiRootUrl, conversations, usersApplications } from 'common/utils/network/endpoints';
import axios from 'axios';
import MobileMessages from './mobile';
import DesktopMessages from './desktop';
import { MessagesProps } from './types';
import { ParticipantType } from './components/Chat/type';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const cookies = cookie.parse(context.req.headers.cookie || '');
    const localUser = cookies.user ? JSON.parse(cookies.user) : null;
    const localCompany = getLocalCompany(context.req.headers.cookie || '');
    const url = `${apiRootUrl}${conversations}?participant_id=${
      localCompany ? localCompany.id : localUser.id
    }&participant_type=${
      localCompany ? ParticipantType.COMPANY : ParticipantType.USER
    }`;
    const { data: { data } } = await axios.get(url, getHeaders(localUser.token as string));
    const jobListUrl = `${apiRootUrl}${usersApplications}${conversations}`;
    let jobList = await axios.get(jobListUrl, getHeaders(localUser.token as string));
    jobList = jobList.data.data;

    return {
      props: {
        loggedInUser: localCompany || localUser,
        conversationList: data,
        jobList,
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
