import cookie from 'cookie';
import { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'POST') {
    try {
      res.setHeader('Set-Cookie', cookie.serialize('user', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        expires: new Date(0),
        sameSite: 'strict',
        path: '/',
      }));
      res.setHeader('Set-Cookie', cookie.serialize('company', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        expires: new Date(0),
        sameSite: 'strict',
        path: '/',
      }));
      res.status(200).send('done');
    } catch (e: any) {
      res.status(400).json(e.response.data);
    }
  }
};

export default handler;
