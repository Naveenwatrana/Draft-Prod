import { NextApiHandler } from 'next';
import cookie from 'cookie';
import { maxAge } from '../../const';

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'GET' && req.cookies.user) {
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      path: '/',
      maxAge,
    };
    try {
      const user = JSON.parse(req.cookies.user);
      res.setHeader(
        'Set-Cookie',
        cookie.serialize('user', JSON.stringify({
          ...user,
          newlyOnboarded: false,
        }), {
          ...cookieOptions,
          sameSite: 'strict',
        }),
      );
      res.status(200).send('done');
    } catch (e: any) {
      res.status(400).json(e.response.data);
    }
  }
};

export default handler;
