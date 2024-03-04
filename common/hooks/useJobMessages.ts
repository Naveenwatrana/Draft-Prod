import { messagesUrl, org, pro } from 'common/utils/network/appRouts';
import { useNavigate } from 'common/utils/router-fill';
import { IConversationListData } from 'pages/messages/components/Chat/type';
import { ISidebarMessage } from 'pages/messages/types';
import { formatSidebarMessages } from 'pages/[slug]/messages/util';
import { UserProfile } from 'pages/pro/types';
import { useEffect, useMemo, useState } from 'react';
import { IJob } from 'pages/jobs/details/types';
import { companyOrgType } from 'pages/organization/create/const';
import { useGetJobConversationsQuery } from 'pages/messages/messagesService';
import useRealtimeConversation from './useRealtimeConversation';

const useJobMessages = (
  loggedInUser: UserProfile,
  profileData?: UserProfile,
  jobData?: IJob,
  conversationList: IConversationListData[] = [],
) => {
  const navigate = useNavigate();
  const [skip, setSkip] = useState(true);
  const {
    data,
  } = useGetJobConversationsQuery(
    {
      id: jobData?.id || '',
    },
    { skip: skip && !!profileData },
  );
  useRealtimeConversation(
    loggedInUser?.user_type === companyOrgType,
    loggedInUser?.id,
  );
  const [messages, setMessages] = useState<ISidebarMessage[]>([]);
  useEffect(() => {
    const conversations = formatSidebarMessages(
      data?.data || conversationList,
      loggedInUser.id,
    );
    const isMessageIncluded = conversations.find(
      (message) => message.username === profileData?.username,
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
  }, [conversationList, loggedInUser.id, profileData, data]);
  const onMessageRead = (username: string): void => {
    const isSameUserName = messages.find(
      (message) => message.username === username,
    );
    const isSameCompanyName = messages.find(
      (message) => message.companyName === username,
    );
    if (isSameCompanyName) {
      navigate(`${messagesUrl}${org}/${username}`);
    }
    if (isSameUserName && !isSameCompanyName) {
      navigate(`${messagesUrl}${pro}/${username}`);
    }
  };
  const activeMessage = useMemo(
    () => messages.find((message) => message.active),
    [messages],
  );
  const reloadConversations = () => {
    if (skip) setSkip(false);
  };

  return {
    onMessageRead, activeMessage, messages, reloadConversations,
  };
};

export default useJobMessages;
