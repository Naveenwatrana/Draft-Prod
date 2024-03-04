import { useHandleMissingSession } from 'common/hooks/useHandleMissingSession';
import { useIsMobile } from 'common/hooks/useIsMobile';
import React from 'react';
import cookie from 'cookie';
import { GetServerSidePropsContext } from 'next';
import {
  apiRootUrl, companyUrl, conversations, getProfile, messages, usersApplications,
} from 'common/utils/network/endpoints';
import axios from 'axios';
import { getHeaders, getLocalCompany, getLocalUser } from 'utils/getApiHeaders';
import { companyOrgType } from 'pages/organization/create/const';
import { UserProfile } from 'pages/pro/types';
import { IJob } from 'pages/jobs/details/types';
import { CONVERSATION_VIEW_TYPE } from 'common/types';
import MobileMessages from '../mobile';
import DesktopMessages from '../desktop';
import { JobMessageData, MessagesProps } from '../types';
import { IMessageData, ParticipantType } from '../components/Chat/type';

const getLoginUserDetails = async (userCookie: string) => {
  const localCompany = getLocalCompany(userCookie);
  const localUser = getLocalUser(userCookie);
  const companyApiUrl = `${apiRootUrl}${companyUrl}/${localCompany?.username}`;
  const localUserApiUrl = `${apiRootUrl}${getProfile}?username=${localUser?.username}`;
  const url = localCompany ? companyApiUrl : localUserApiUrl;
  const headers = getHeaders(localUser?.token as string);
  const { data } = await axios.get(url, headers);
  return data.data;
};

const getConversationUrl = (userCookie: string) => {
  const localCompany = getLocalCompany(userCookie);
  const localUser = getLocalUser(userCookie);
  const conversationUrl = `${apiRootUrl}${conversations}?participant_id=${
    localCompany ? localCompany.id : localUser?.id
  }&participant_type=${
    localCompany ? ParticipantType.COMPANY : ParticipantType.USER
  }`;
  return conversationUrl;
};

const getConversationList = async (userCookie: string) => {
  const conversationUrl = getConversationUrl(userCookie);
  const localUser = getLocalUser(userCookie);
  const { data } = await axios.get(conversationUrl, getHeaders(localUser?.token as string));
  return data.data;
};

const getUserMessages = async (userCookie: string, id: string) => {
  const localUser = getLocalUser(userCookie);
  const userMessagesUrl = `${apiRootUrl}${conversations}/${id}${messages}`;
  const { data } = await axios.get(userMessagesUrl, getHeaders(localUser?.token as string));
  return {
    messages: data.data.messages,
    participants: data.data.participants.map((participant : any) => participant.participant),
  };
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const cookieHeader = context.req.headers.cookie || '';
    const cookies = cookie.parse(cookieHeader);
    const localCompany = cookies.company ? JSON.parse(cookies.company) : null;
    const localUser = cookies.user ? JSON.parse(cookies.user) : null;

    const loggedInUser = await getLoginUserDetails(cookieHeader);
    const conversationList = await getConversationList(cookieHeader);

    let userMessages: IMessageData[] = [];
    let participants: UserProfile[] = [];
    if (context.params?.id) {
      getUserMessages(cookieHeader, context.params?.id as string).then((response) => {
        userMessages = response.messages;
        participants = response.participants;
      });
    }
    const jobListUrl = `${apiRootUrl}${usersApplications}${conversations}`;
    let jobList: JobMessageData[] = [];
    let currentJob = {} as IJob;
    await axios.get(jobListUrl, getHeaders(localUser.token as string)).then((response) => {
      jobList = response?.data?.data;
      currentJob = jobList?.find((job: JobMessageData) => job.uuid === context.params?.id as string)?.job || {} as IJob;
    });
    return {
      props: {
        loggedInUser: { ...loggedInUser, user_type: localCompany ? companyOrgType : '' },
        conversationList,
        userMessages,
        jobList,
        view: CONVERSATION_VIEW_TYPE.JOB,
        participants,
        currentJob,
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
  return isMobile ? <MobileMessages {...props} /> : <DesktopMessages {...props} />;
};

export default Messages;
