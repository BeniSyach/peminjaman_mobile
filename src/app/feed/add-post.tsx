import { zodResolver } from '@hookform/resolvers/zod';
import { Stack, useLocalSearchParams, router } from 'expo-router';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { showMessage } from 'react-native-flash-message';
import { z } from 'zod';
import { DateInput } from '../../components/ui/date-input';
import { useAddPost } from '@/api';
import {
  Button,
  ControlledInput,
  showErrorMessage,
  View,
} from '@/components/ui';
import { getMessage } from '@/lib';

const schema = z.object({
  tanggal_pinjam: z
    .string({
      required_error: 'Tanggal Pinjam diperlukan',
    })
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Format tanggal harus YYYY-MM-DD')
    .refine((date) => !isNaN(Date.parse(date)), {
      message: 'Tanggal tidak valid',
    }),
    tanggal_kembali: z
    .string({
      required_error: 'Tanggal Kembali diperlukan',
    })
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Format tanggal harus YYYY-MM-DD')
    .refine((date) => !isNaN(Date.parse(date)), {
      message: 'Tanggal tidak valid',
    }),
});

type FormType = z.infer<typeof schema>;

export default function AddPost() {
  const { id } = useLocalSearchParams();
  const storedMessage = getMessage();
  const { control, handleSubmit } = useForm<FormType>({
    resolver: zodResolver(schema),
  });
  const { mutate: addPost, isPending } = useAddPost();

  const generateRandomCode = () => {
    const timestamp = Date.now();
    const code = `PJM-${timestamp}`;
    return code;
  };

  const onSubmit = (data: FormType) => {
    console.log(data);
    addPost(
      { ...data, buku_id: id as string, user_id: storedMessage?.id, kode_peminjaman: generateRandomCode() },
      {
        onSuccess: () => {
          showMessage({
            message: 'Berhasil Meminjam Buku',
            type: 'success',
            duration: 5000,
          });
          router.replace('/');
        },
        onError: () => {
          showErrorMessage('gagal meminjam buku');
        },
      }
    );
  };
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Peminjaman Buku',
          headerBackTitle: 'Peminajaman',
        }}
      />
      <View className="flex-1 p-4 ">
      <DateInput
        control={control}
        name="tanggal_pinjam"
        label="Tanggal Pinjam"
        placeholder="YYYY-MM-DD"
      />
      <DateInput
        control={control}
        name="tanggal_kembali"
        label="Tanggal Kembali"
        placeholder="YYYY-MM-DD"
      />
        <Button
          label="Submit"
          loading={isPending}
          onPress={handleSubmit(onSubmit)}
          testID="add-post-button"
        />
      </View>
    </>
  );
}
