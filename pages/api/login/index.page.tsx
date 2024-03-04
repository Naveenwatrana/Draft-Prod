import axios from 'axios';
import { apiRootUrl, signInUrl } from 'common/utils/network/endpoints';
import cookie from 'cookie';
import { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'POST') {
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    };
    try {
      const body = JSON.parse(req.body);
      const { data } = await axios.post(`${apiRootUrl}${signInUrl}`, {
        email: body.email,
        password: body.password,
      });
      const {
        token, username, id, onboarding_step: onboardingStep, onboarding_status: onboardingStatus,
      } = data.data;
      res.setHeader('Set-Cookie', cookie.serialize('user', JSON.stringify({
        username, token, id, onboardingStep, onboardingStatus,
      }), {
        ...cookieOptions,
        sameSite: 'strict',
      }));
      res.status(200).json(data);
    } catch (e: any) {
      res.status(400).json({ message: e.response.data?.errors?.email || e.response.data?.message });
    }
  }
};

export default handler;
