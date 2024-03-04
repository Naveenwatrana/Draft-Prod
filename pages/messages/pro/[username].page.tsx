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
import MobileMessages from '../mobile';
import DesktopMessages from '../desktop';
import { MessagesProps } from '../types';
import { IConversationListData, IMessageData, ParticipantType } from '../components/Chat/type';

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

const getConversations = (conversationList: any, userCookie: string, username: string) => {
  const conversation = conversationList.find(
    (conversationItem: IConversationListData) => conversationItem.participants?.some(
      (participant) => participant?.participant?.username === username,
    ),
  );
  return conversation;
};

const getUserMessages = async (userCookie: string, id: string) => {
  const localCompany = getLocalCompany(userCookie);
  const localUser = getLocalUser(userCookie);
  const userMessagesUrl = `${apiRootUrl}${conversations}/${id}${messages}${localCompany ? `?company=${localCompany.username}` : ''}`;
  const { data } = await axios.get(userMessagesUrl, getHeaders(localUser?.token as string));
  return data.data.messages;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const cookieHeader = context.req.headers.cookie || '';
    const paramUsername = context.params?.username as string;
    const cookies = cookie.parse(cookieHeader);
    const localCompany = cookies.company ? JSON.parse(cookies.company) : null;
    const localUser = cookies.user ? JSON.parse(cookies.user) : null;

    const profileData = await getOtherPartyDetails(cookieHeader, paramUsername);
    const loggedInUser = await getLoginUserDetails(cookieHeader);
    const conversationList = await getConversationList(cookieHeader);

    const conversation = getConversations(conversationList, cookieHeader, paramUsername);
    let userMessages: IMessageData[] = [];
    if (conversation?.uuid) {
      userMessages = await getUserMessages(cookieHeader, conversation.uuid);
    }
    const jobListUrl = `${apiRootUrl}${usersApplications}${conversations}`;
    let jobList = await axios.get(jobListUrl, getHeaders(localUser.token as string));
    jobList = jobList.data.data;
    return {
      props: {
        loggedInUser: { ...loggedInUser, user_type: localCompany ? companyOrgType : '' },
        profileData,
        conversationList,
        userMessages,
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
  return isMobile ? <MobileMessages {...props} /> : <DesktopMessages {...props} />;
};

export default Messages;
