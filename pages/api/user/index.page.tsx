import axios from 'axios';
import cookie from 'cookie';
import { NextApiHandler } from 'next';
import { getHeaders } from 'utils/getApiHeaders';
import { apiRootUrl, getProfile } from 'common/utils/network/endpoints';
import { CreateOnBoardingSteps } from 'pages/profile/onboarding/create/types';
import { maxAge } from '../const';

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'PUT' && req.cookies.user) {
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      path: '/',
      maxAge,
    };
    try {
      const body = JSON.parse(req.body);
      const { data } = await axios.put(
        `${apiRootUrl}${getProfile}`,
        body,
        getHeaders(JSON.parse(req.cookies.user).token),
      );
      const {
        token, username, id, onboarding_step: onboardingStep, onboarding_status: onboardingStatus,
      } = data.data;
      res.setHeader(
        'Set-Cookie',
        cookie.serialize('user', JSON.stringify({
          username,
          token: JSON.parse(req.cookies.user)?.token || token,
          id,
          onboardingStep,
          onboardingStatus,
          newlyOnboarded:
           JSON.parse(req.cookies.user)?.onboardingStep !== CreateOnBoardingSteps.RESUME && onboardingStep === CreateOnBoardingSteps.RESUME,
        }), {
          ...cookieOptions,
          sameSite: 'strict',
        }),
      );
      res.status(200).json(data);
    } catch (e: any) {
      // eslint-disable-next-line no-console
      console.log('error in login', e.response.data);
      res.status(400).json(e.response.data);
    }
  }
};

export default handler;
