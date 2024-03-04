import { useWindowDimensions } from 'common/hooks';
import Loader from 'components/Loader/Loader';
import { skipToken } from '@reduxjs/toolkit/query';
import { useRouter } from 'next/router';
import EditJobDesktop from '../components/EditJobDesktop';
import { useJobDetailQuery } from '../jobsService';
import { formatJobPayload } from '../utils';

const Post = () => {
  const router = useRouter();
  const { id } = router.query;
  const { isDesktopView } = useWindowDimensions();

  const { isLoading, error, data } = useJobDetailQuery(
    typeof id === 'string' ? id : skipToken,
    {
      skip: router.isFallback,
    },
  );

  if (error) {
    return <p>Oh no, there was an error</p>;
  }
  if (router.isFallback || isLoading) {
    return <Loader />;
  }
  return data ? <EditJobDesktop isDesktopView={isDesktopView} data={formatJobPayload(data.data)} />
    : null;
};

export default Post;
