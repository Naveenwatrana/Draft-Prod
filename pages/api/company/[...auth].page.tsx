import cookie from 'cookie';
import { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req, res) => {
  /* To View and parse the saved Cookie
  // const cookies = cookie.parse(req.headers.cookie || '');
  // JSON.parse(cookies.company);
  */

  if (req.method === 'POST') {
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      path: '/',
    };
    try {
      if (JSON.parse(req.body).company) {
        const { username, id, name } = JSON.parse(req.body).company;
        const options = {
          ...cookieOptions,
          maxAge: 60 * 60 * 24 * 30, // 30 days
        };
        res.setHeader('Set-Cookie', cookie.serialize('company', JSON.stringify({ username, id, name }), { ...options, sameSite: 'strict' }));
      } else {
        const options = {
          ...cookieOptions,
          expires: new Date(0),
        };
        res.setHeader('Set-Cookie', cookie.serialize('company', '', { ...options, sameSite: 'strict' }));
      }
      res.status(200).send('done');
    } catch (e: any) {
      res.status(400).json(e.response.data);
    }
  }
};

export default handler;
