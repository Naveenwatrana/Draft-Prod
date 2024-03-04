import { LoggedInUser } from 'context/loggedInUserContext';
import { selectCurrentUser } from 'pages/account/authSlice';
import { useContext } from 'react';
import { useAppSelector } from './state';

export const useLoggedInUser = () => {
  const isUserLoggedIn = useContext(LoggedInUser);
  const localUser = useAppSelector(selectCurrentUser);

  return isUserLoggedIn || localUser;
};
