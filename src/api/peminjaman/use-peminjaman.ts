import type { AxiosError } from 'axios';
import { createInfiniteQuery } from 'react-query-kit';

import { client } from '../common';
import type { TypePeminjaman } from './types';

type Response = {
  data: TypePeminjaman[];
  current_page: number;
  last_page: number;
};
type Variables = {
  limit?: number;
  user_id?: number;
};

export const usePeminjaman = createInfiniteQuery<Response, Variables, AxiosError>({
  queryKey: ['peminjaman'],
  fetcher: async (variables, { pageParam }) => {
    return client
      .get('/api/peminjaman', { params: { page: pageParam, ...variables } })
      .then((response) => response.data.data);
  },
  getNextPageParam: (lastPage) => {
    return lastPage.current_page < lastPage.last_page ? lastPage.current_page + 1 : undefined;
  },
  initialPageParam: 1,
});
