import InfiniteScroll from 'react-infinite-scroll-component';
import { InfiniteScrollProps } from 'components/InfiniteScroll/types';
import Loader from '../Loader/Loader';

const InfiniteScrollComponent = ({
  children,
  data,
  fetchMoreData,
  hasMore,
  scrollableTarget,
  showLoader = true,
}: InfiniteScrollProps) => {
  const optionalProps = scrollableTarget ? { scrollableTarget } : {};

  return (
    <InfiniteScroll
      dataLength={data.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={showLoader && <Loader fullScreen={false} />}
      {...optionalProps}
    >
      {children}
    </InfiniteScroll>
  );
};

export default InfiniteScrollComponent;
