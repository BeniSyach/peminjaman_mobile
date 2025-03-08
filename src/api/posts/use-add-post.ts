import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { client } from '../common';
import type { Post } from './types';

type Variables = { 
  kode_peminjaman: string; 
  user_id: number | undefined; 
  buku_id: string; 
  tanggal_pinjam: string; 
  tanggal_kembali: string; 
};
type Response = Post;

export const useAddPost = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) =>
    client({
      url: '/api/peminjaman',
      method: 'POST',
      data: variables,
    }).then((response) => response.data),
});
