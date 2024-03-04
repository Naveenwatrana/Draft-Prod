import Cookie from 'cookie';

export const getHeaders = (token: string) => {
  if (!token) return {};
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getLocalUser = (localCookie: string) => {
  const cookies = Cookie.parse(localCookie || '');
  let localUser: null | { token: string, username: string, id: string, newlyOnboarded?: boolean } = null;
  if (cookies.user) {
    localUser = JSON.parse(cookies.user);
  }
  return localUser;
};

export const getLocalCompany = (localCookie: string) => {
  const cookies = Cookie.parse(localCookie || '');
  let localCompany: null | { username: string, id: string } = null;
  if (cookies.company) {
    localCompany = JSON.parse(cookies.company);
  }
  return localCompany;
};
