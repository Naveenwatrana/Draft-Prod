import { useHandleMissingSession } from 'common/hooks/useHandleMissingSession';
import { useIsMobile } from 'common/hooks/useIsMobile';
import React from 'react';
import cookie from 'cookie';
import { GetServerSidePropsContext } from 'next';
import {
  apiRootUrl, companyUrl, conversations, getProfile, messages, jobsUrl,
} from 'common/utils/network/endpoints';
import axios from 'axios';
import { getHeaders, getLocalCompany, getLocalUser } from 'utils/getApiHeaders';
import { companyOrgType } from 'pages/organization/create/const';
import { UserProfile } from 'pages/pro/types';
import MobileMessages from '../mobile';
import DesktopMessages from '../desktop';
import { MessagesProps } from '../types';
import { IConversationListData, IMessageData } from '../components/Chat/type';

const getOtherPartyDetails = async (userCookie: string, username: string) => {
  const localUser = getLocalUser(userCookie);
  const userId = username ? `?username=${username}` : '';
  const url = `${apiRootUrl}${getProfile}${userId}`;
  const headers = getHeaders(localUser?.token as string);

  const { data } = await axios.get(url, headers);
  return data.data;
};

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

const getConversationList = async (jobId:string, userCookie: string) => {
  const conversationUrl = `${apiRootUrl}${jobsUrl}/${jobId}/conversations`;
  const localUser = getLocalUser(userCookie);
  const { data } = await axios.get(conversationUrl, getHeaders(localUser?.token as string));
  return data.data;
};

const getConversations = (conversationList: any, userCookie: string, username: string) => {
  const conversation = conversationList.find(
    (conversationItem: IConversationListData) => conversationItem.participants?.some(
      (participant) => participant?.participant?.username === username && participant?.is_candidate === true,
    ),
  );
  return conversation;
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
    const { slug } = context.query;
    const cookieHeader = context.req.headers.cookie || '';
    const paramUsername = context.params?.username as string;
    const cookies = cookie.parse(cookieHeader);
    const localCompany = cookies.company ? JSON.parse(cookies.company) : null;

    const jobId = slug?.toString().split('-').pop();
    const profileData = await getOtherPartyDetails(cookieHeader, paramUsername);
    const loggedInUser = await getLoginUserDetails(cookieHeader);
    const conversationList = await getConversationList(jobId || '', cookieHeader);
    const localUser = getLocalUser(cookieHeader);
    const jobUrl = `${apiRootUrl}${jobsUrl}/${jobId}`;
    const { data: { data: jobData } } = await axios.get(jobUrl, getHeaders(localUser?.token as string));
    const conversation = getConversations(conversationList, cookieHeader, paramUsername);
    let userMessages: IMessageData[] = [];
    let participants: UserProfile[] = [];
    if (conversation?.uuid) {
      await getUserMessages(cookieHeader, conversation.uuid).then((response) => {
        userMessages = response.messages;
        participants = response.participants;
      });
    }
    return {
      props: {
        loggedInUser: { ...loggedInUser, user_type: localCompany ? companyOrgType : '' },
        profileData,
        conversationList,
        userMessages,
        jobData,
        participants,
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
