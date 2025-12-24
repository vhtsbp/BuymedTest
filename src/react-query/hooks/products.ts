import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getProducts } from '../../services/product';
import { ProductsQueryKeys } from '../querykeys/products';

export const useGetProducts = (params: {
  search?: string;
  category?: string;
}) => {
  const PAGE_SIZE = 20;
  return useInfiniteQuery({
    queryKey: ProductsQueryKeys.list(params),
    queryFn: ({ pageParam = 0 }) => {
      return getProducts({ skip: pageParam, limit: PAGE_SIZE, ...params });
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < PAGE_SIZE) return undefined;
      return allPages.length * PAGE_SIZE;
    },
    initialPageParam: 0,
    staleTime: 5 * 60 * 1000, // 5 minutes, data will not be refetched frequently
    retry: 2, // Retry 2 times if network error
    retryOnMount: true, // Automatically retry when coming back online
    refetchOnReconnect: true, // Refetch if network reconnects
  });
};
