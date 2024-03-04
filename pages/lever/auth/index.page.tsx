/* eslint-disable camelcase */
import Loader from 'components/Loader/Loader';
import { useEffect } from 'react';

const LeverAuth = () => {
  useEffect(() => {
    const authURI = `https://sandbox-lever.auth0.com/authorize?client_id=${process.env.NEXT_PUBLIC_clientID}&redirect_uri=http://localhost:3000/login&state=${process.env.NEXT_PUBLIC_state}&response_type=code&scope=${process.env.NEXT_PUBLIC_scope}&prompt=consent&audience=${process.env.NEXT_PUBLIC_baseURL}`;
    const encodedAuthURI = encodeURI(authURI);
    window.location.replace(encodedAuthURI);
  }, []);
  return <Loader />;
};

export default LeverAuth;
