import { useRouter } from 'expo-router';
import React from 'react';

import type { LoginFormProps } from '@/components/login-form';
import { LoginForm } from '@/components/login-form';
import { FocusAwareStatusBar, showErrorMessage } from '@/components/ui';
import { useAuth, setMessage } from '@/lib';
import { LoginVariables, useLogin } from '@/api';
import { AxiosError } from 'axios';

interface ErrorResponse {
  error: string;
}

export default function Login() {
  const router = useRouter();
  const signIn = useAuth.use.signIn();

  const handleLoginSuccess = (data: any) => {
    const access = data.token;
    const refresh = data.token;
    const successMessage = data.user;

    // Save token to auth state
    signIn({ access, refresh });
    setMessage(successMessage);

    // Redirect to the main page
    router.push('/');
  };

  const handleLoginError = (
    error: AxiosError<unknown, any>,
    _variables: LoginVariables,
    _context: unknown
  ) => {
    showErrorMessage(
      (error.response?.data as ErrorResponse)?.error || error.message
    );
  };

  const { mutate, isPending, isError } = useLogin({
    onSuccess: handleLoginSuccess,
    onError: handleLoginError,
  });

  const onSubmit: LoginFormProps['onSubmit'] = (data) => {
    console.log('data login', data);
    mutate(data);
  };
  return (
    <>
      <FocusAwareStatusBar />
      <LoginForm onSubmit={onSubmit} isPending={isPending} isError={isError} />
    </>
  );
}
