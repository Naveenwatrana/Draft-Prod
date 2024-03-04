import { NextApiHandler } from 'next';
import Pusher from 'pusher';
const appKey = process.env.NEXT_PUBLIC_ECHO_KEY || '';
const cluster = process.env.NEXT_PUBLIC_ECHO_CLUSTER || '';
const appId = process.env.NEXT_PUBLIC_ECHO_APP_ID || '';
const secret = process.env.NEXT_PUBLIC_ECHO_SECRET || '';
const pusher = new Pusher({
  appId,
  key: appKey,
  secret,
  cluster,
  useTLS: true,
});
const channelEvent = 'send-message';
const channelUrl = 'the-draft-dm-';
const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const body = JSON.parse(req.body);
      pusher.trigger(`${channelUrl}${body.channelId}`, channelEvent, body.message).then(
        (data) => res.status(200).json(data),
      );
    } catch (e: any) {
      // eslint-disable-next-line no-console
      console.log('error in pusher', e);
      res.status(400).json(e);
    }
  }
};

export default handler;
