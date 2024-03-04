import { useEffect, useState } from 'react';
import Pusher from 'pusher-js';
import { IMessageReadData } from 'pages/messages/components/Chat/type';
import { pusherSendMessage } from 'pages/api/const';
const channelUrl = 'the-draft-dm-';
const channelEvent = 'send-message';
const useDirectMessage = (uuid: string | undefined) => {
  const [currentMessage, setCurrentMessage] = useState<IMessageReadData>();
  useEffect(() => {
    const appKey = process.env.NEXT_PUBLIC_ECHO_KEY;
    const cluster = process.env.NEXT_PUBLIC_ECHO_CLUSTER;
    if (appKey && cluster) {
      const pusher = new Pusher(appKey, {
        cluster,
      });
      const channel = pusher.subscribe(`${channelUrl}${uuid}`);
      channel.bind(channelEvent, (data: IMessageReadData) => {
        setCurrentMessage(data);
      });
    }
  }, [uuid]);
  const sendMessage = (message: IMessageReadData) => {
    if (uuid) {
      const body = JSON.stringify({
        channelId: uuid,
        message,
      });
      fetch(pusherSendMessage, {
        method: 'POST',
        body,
      });
    }
  };
  return { currentMessage, sendMessage };
};

export default useDirectMessage;
