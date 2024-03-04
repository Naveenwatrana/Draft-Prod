import Loader from 'components/Loader/Loader';
import { useAppSelector } from 'common/hooks/state';
import { useVerifyQuery } from 'pages/account/userService';
import { useNavigate, useParams } from 'common/utils/router-fill';

const VerifyEmail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { isSuccess, isError, isLoading } = useVerifyQuery(params?.token);

  const user = useAppSelector((state) => state.auth.user);

  if (!user) {
    // FIXME: not saving state.redirectTo at this moment
    // navigate('/account/signin', { state: { redirectTo: '/profile/onboarding' } });
    navigate('/account/signin');
  }

  if (isSuccess && user) {
    navigate('/profile/onboarding');
  }

  return (
    <div>
      {isLoading && <Loader data-testid="loader" />}
      {isError && <p>There is an error</p>}
    </div>
  );
};
export default VerifyEmail;
