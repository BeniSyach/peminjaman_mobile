import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { client } from '../common';
import type { LogoutResponse } from './types';

export const UseLogout = createMutation<
  LogoutResponse,
  AxiosError
>({
  mutationFn: async (id) =>
    client({
      url: `/api/logout`,
      method: 'POST',
    }).then((response) => response.data),
});