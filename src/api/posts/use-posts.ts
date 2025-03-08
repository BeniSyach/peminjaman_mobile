import type { AxiosError } from 'axios';
import { createInfiniteQuery } from 'react-query-kit';

import { client } from '../common';
import type { Post } from './types';

type Response = {
  data: Post[];
  current_page: number;
  last_page: number;
};
type Variables = {
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
  search?: string;
};

export const usePosts = createInfiniteQuery<Response, Variables, AxiosError>({
  queryKey: ['posts'],
  fetcher: async (variables, { pageParam }) => {
    return client
      .get('/api/buku', { params: { page: pageParam, ...variables } })
      .then((response) => response.data.data);
  },
  getNextPageParam: (lastPage) => {
    return lastPage.current_page < lastPage.last_page ? lastPage.current_page + 1 : undefined;
  },
  initialPageParam: 1,
});
