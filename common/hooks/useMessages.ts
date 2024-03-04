import {
  job, messagesUrl, org, pro,
} from 'common/utils/network/appRouts';
import { useNavigate, useParams } from 'common/utils/router-fill';
import { IConversationListData, ParticipantType } from 'pages/messages/components/Chat/type';
import { ISidebarMessage } from 'pages/messages/types';
import { formatSidebarMessages } from 'pages/messages/util';
import { UserProfile } from 'pages/pro/types';
import { useEffect, useMemo, useState } from 'react';
import { companyOrgType } from 'pages/organization/create/const';
import { useGetConversationsQuery, useGetUserJobConversationsQuery } from 'pages/messages/messagesService';
import useRealtimeConversation from './useRealtimeConversation';

const useMessages = (
  loggedInUser: UserProfile,
  jobList: IConversationListData[],
  profileData?: UserProfile,
  view?: number,
  conversationList: IConversationListData[] = [],
) => {
  const navigate = useNavigate();
  const [skip, setSkip] = useState(true);
  const { id } = useParams();
  const {
    data,
  } = useGetConversationsQuery(
    {
      id: loggedInUser.id,
      type:
        loggedInUser.user_type === companyOrgType
          ? ParticipantType.COMPANY
          : ParticipantType.USER,
    },
    { skip: skip && !!profileData },
  );
  const { data: jobData } = useGetUserJobConversationsQuery({});

  useRealtimeConversation(
    loggedInUser?.user_type === companyOrgType,
    loggedInUser?.id,
  );
  const [messages, setMessages] = useState<ISidebarMessage[]>([]);
  const [jobs, setJobs] = useState<ISidebarMessage[]>([]);
  useEffect(() => {
    const conversations = formatSidebarMessages(
      data?.data || conversationList,
      loggedInUser.id,
    );
    const jobConversations = formatSidebarMessages(jobData?.data || jobList, loggedInUser.id) || [];
    const isMessageIncluded = conversations.find(
      (message) => message.username === profileData?.username,
    );
    setJobs(
      jobConversations?.map((message) => {
        return {
          ...message,
          active: !!id && message.uuid === id,
        };
      }),
    );
    if (isMessageIncluded && profileData?.username) {
      setMessages(
        conversations?.map((message) => {
          return {
            ...message,
            active: message.username === profileData?.username,
          };
        }),
      );
    } else if (profileData && !isMessageIncluded) {
      setMessages([
        {
          media: profileData?.cards?.[0]?.fields?.media,
          mantra: profileData?.cards?.[0]?.fields?.mantra,
          name: profileData?.name || '',
          username: profileData?.username || '',
          timestamp: '',
          active: true,
          unread: true,
        },
        ...conversations.filter(
          (mockData) => mockData.username !== profileData?.username,
        ),
      ]);
    } else {
      setMessages(
        conversations?.map((message) => {
          return {
            ...message,
            active: message.username === profileData?.username,
          };
        }),
      );
    }
  }, [conversationList, loggedInUser.id, profileData, data, jobData]);

  const onMessageRead = (username: string): void => {
    const hasSameUserName = messages.some((message) => message.username === username);
    const hasSameCompanyName = messages.some((message) => message.companyName === username);
    const isJobConversation = jobs.some((currentJob) => currentJob.uuid === username);
    if (hasSameCompanyName) {
      navigate(`${messagesUrl}${org}/${username}`);
    } else if (hasSameUserName && !hasSameCompanyName) {
      navigate(`${messagesUrl}${pro}/${username}`);
    } else if (isJobConversation) {
      navigate(`${messagesUrl}${job}/${username}`);
    }
  };

  const activeMessage = useMemo(
    () => messages?.concat(jobs).find((message) => message.active),
    [messages],
  );
  const reloadConversations = () => {
    if (skip) setSkip(false);
  };

  return {
    onMessageRead, activeMessage, messages, reloadConversations, jobs,
  };
};

export default useMessages;
