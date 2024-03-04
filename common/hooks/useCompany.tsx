import { selectCurrentCompany, selectCurrentUser } from 'pages/account/authSlice';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const useCompany = () => {
  const currentCompanyData = useSelector(selectCurrentCompany);
  const currentUserData = useSelector(selectCurrentUser);
  const [currentCompany, setCurrentCompany] = useState<any>();
  const [currentUser, setCurrentUser] = useState<any>();
  useEffect(() => {
    setCurrentCompany(currentCompanyData);
  }, [currentCompanyData]);
  useEffect(() => {
    setCurrentUser(currentUserData);
  }, [currentUserData]);
  return { currentCompany, currentUser };
};

export default useCompany;
