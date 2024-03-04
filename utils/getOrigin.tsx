import { GetServerSidePropsContext } from 'next';

export const getOrigin = (context: GetServerSidePropsContext) => {
  const protocol = 'http://';
  const secureProtocol = 'http://';
  if (!context.req.headers.host?.includes('localhost')) {
    return protocol + context.req.headers.host;
  }
  return secureProtocol + context.req.headers.host;
};
