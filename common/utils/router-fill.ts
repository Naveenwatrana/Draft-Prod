import { useRouter } from 'next/router';

export const useNavigate = () => {
  const router = useRouter();
  return (route: string) => {
    return router.push(route);
  };
};

export const useLocation = () => {
  const router = useRouter();
  return { pathname: router.pathname, asPath: router.asPath };
};

export const useParams = () => {
  const router = useRouter();
  return router.query;
};
