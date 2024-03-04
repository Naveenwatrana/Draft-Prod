import { useEffect } from 'react';
import Pusher from 'pusher-js';
import { messagesApi } from 'pages/messages/messagesService';
import { useAppDispatch } from './state';
enum UserType {
  user = 'users-',
  company = 'companies-',
}
const channelUrl = 'the-draft-dm-';
const createConversationEvent = 'create-conversation';
const messageReceivedEvent = 'message-received';
const useRealtimeConversation = (isCompany: boolean, id: number) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const appKey = process.env.NEXT_PUBLIC_ECHO_KEY;
    const cluster = process.env.NEXT_PUBLIC_ECHO_CLUSTER;
    if (appKey && cluster) {
      const pusher = new Pusher(appKey, {
        cluster,
      });
      const channel = pusher.subscribe(
        `${channelUrl}${isCompany ? UserType.company : UserType.user}${id}`,
      );
      channel.bind(createConversationEvent, () => {
        dispatch(messagesApi.util.invalidateTags(['conversation']));
      });
      channel.bind(messageReceivedEvent, () => {
        dispatch(messagesApi.util.invalidateTags(['conversation']));
      });
      return () => {
        channel.unbind(createConversationEvent);
        channel.unbind(messageReceivedEvent);
      };
    }
  }, [isCompany, id]);
};

export default useRealtimeConversation;
