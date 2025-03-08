import { Env } from '@env';
import axios from 'axios';
import { Alert } from 'react-native';

import { useAuth } from '@/lib/auth'; // Import dari zustand untuk mendapatkan token

// Membuat instance axios
const client = axios.create({
  baseURL: Env.API_URL,
});

// Interceptor untuk menambahkan token ke setiap request
client.interceptors.request.use(
  (config) => {
    const token = useAuth.getState().token;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token.access}`;
    }
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Interceptor untuk menangani error global (misalnya, token invalid)
client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const signOut = useAuth.getState().signOut;
      Alert.alert(
        'Sesi Berakhir',
        'Sesi login Anda telah berakhir. Anda akan logout.',
        [
          {
            text: 'OK',
            onPress: () => signOut(),
          },
        ],
        { cancelable: false }
      );
    }

    return Promise.reject(error);
  }
);

export { client };
