import { useAppSelector } from 'common/hooks/state';
import { useEffect } from 'react';
import { useNavigate } from 'common/utils/router-fill';

export const useHandleMissingSession = () => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    if (!user) {
      navigate('/account/signin');
    }
  }, [user]);
};
