import { useNavigate } from 'common/utils/router-fill';
import Loader from 'components/Loader/Loader';
import { useRouter } from 'next/router';
import { useLoginWithLeverMutation } from 'pages/jobs/jobsService';
import { useEffect } from 'react';
import { ILeverAccessToken } from './types';

const LeverAuthConfirm = () => {
  const [loginWithLever] = useLoginWithLeverMutation();
  const navigate = useNavigate();
  const router = useRouter();
  useEffect(() => {
    const fetchAccessTokenLever = async (code: string): Promise<ILeverAccessToken> => {
      const response = await fetch(`/api/auth/lever?code=${code}`);
      const tokens = await response.json();

      if (response.ok) {
        return tokens;
      } else {
        return Promise.reject(new Error('error in fetching Access Token'));
      }
    };
    const saveLeverToken = async (tokens: ILeverAccessToken) => {
      await loginWithLever({
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
      }).unwrap();
    };
    const getAccessToken = async () => {
      try {
        const tokens = await fetchAccessTokenLever(router.query.code as string);
        await saveLeverToken(tokens);
        navigate('/jobs/create/lever');
      } catch (e) {
        navigate('/404');
      }
    };
    if (router.query.code) {
      getAccessToken();
    }
  }, [router.query.code]);
  return <Loader />;
};

export default LeverAuthConfirm;
