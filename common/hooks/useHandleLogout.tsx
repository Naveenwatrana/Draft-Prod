import { baseApi } from 'common/store/baseApi';
import { clearCredentials } from 'pages/account/authSlice';
import { AppDispatch } from 'common/store/store';

export const useHandleLogout = (dispatch: AppDispatch) => {
  const handleLogout = () => {
    dispatch(clearCredentials());
    dispatch(baseApi.util.resetApiState());
  };

  return {
    handleLogout,
  };
};
