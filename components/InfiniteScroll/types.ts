import { ReactNode } from 'react';

export type InfiniteScrollProps = {
    children: ReactNode;
    data: any[];
    fetchMoreData: () => void;
    hasMore: boolean;
    scrollableTarget?: string;
    showLoader?: boolean;
}
