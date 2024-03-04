import { useHandleMissingSession } from 'common/hooks/useHandleMissingSession';
import { useIsMobile } from 'common/hooks/useIsMobile';
import React from 'react';
import cookie from 'cookie';
import { GetServerSidePropsContext } from 'next';
import {
  apiRootUrl,
  companyUrl,
  conversations,
  getProfile,
  messages,
  usersApplications,
} from 'common/utils/network/endpoints';
import axios from 'axios';
import { getHeaders } from 'utils/getApiHeaders';
import { companyOrgType } from 'pages/organization/create/const';
import { MessagesProps } from '../types';
import MobileMessages from '../mobile';
import DesktopMessages from '../desktop';
import { IConversationListData, IMessageData, ParticipantType } from '../components/Chat/type';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const cookies = cookie.parse(context.req.headers.cookie || '');
    const localUser = cookies.user ? JSON.parse(cookies.user) : null;
    const localCompany = cookies.company ? JSON.parse(cookies.company) : null;
    const userToken = localUser?.token;
    const userId = context.params?.username
      ? `/${context.params.username}`
      : '';
    const { data: { data: profileData } } = await axios.get(
      `${apiRootUrl}${companyUrl}${userId}`,
      getHeaders(userToken as string),
    );
    const url = localCompany ? `${apiRootUrl}${companyUrl}/${localCompany.username}` : `${apiRootUrl}${getProfile}?username=${localUser?.username}`;
    const { data: { data: loggedInUser } } = await axios.get(url, getHeaders(userToken as string));
    const conversationUrl = `${apiRootUrl}${conversations}?participant_id=${
      localCompany ? localCompany.id : localUser.id
    }&participant_type=${
      localCompany ? ParticipantType.COMPANY : ParticipantType.USER
    }`;
    const { data: { data: conversationList } } = await axios.get(conversationUrl, getHeaders(localUser.token as string));
    const conversation = conversationList.find(
      (conversationItem: IConversationListData) => conversationItem.participants?.some(
        (participant) => participant?.participant?.username === context?.params?.username,
      ),
    );
    let userMessages: IMessageData[] = [];
    if (conversation?.uuid) {
      const userMessagesUrl = `${apiRootUrl}${conversations}/${conversation?.uuid}${messages}`;
      const {
        data: {
          data: {
            messages: userMessagesData,
          },
        },
      } = await axios.get(
        userMessagesUrl,
        getHeaders(localUser.token as string),
      );
      userMessages = userMessagesData;
    }
    const jobListUrl = `${apiRootUrl}${usersApplications}${conversations}`;
    let jobList = await axios.get(jobListUrl, getHeaders(localUser.token as string));
    jobList = jobList.data.data;
    return {
      props: {
        loggedInUser: { ...loggedInUser, user_type: localCompany ? companyOrgType : '' },
        profileData: { ...profileData, user_type: companyOrgType },
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
  return isMobile ? (
    <MobileMessages {...props} />
  ) : (
    <DesktopMessages {...props} />
  );
};

export default Messages;
