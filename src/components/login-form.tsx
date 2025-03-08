import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import * as z from 'zod';

import { Button, ControlledInput, Text, View } from '@/components/ui';

const schema = z.object({
  nik: z.string({
    required_error: 'NIK Tidak Boleh Kosong',
  }),
  password: z
    .string({
      required_error: 'Password Tidak Boleh Kosong',
    })
    .min(6, 'Password Harus 6 Karakter'),
});

export type FormType = z.infer<typeof schema>;

export type LoginFormProps = {
  onSubmit?: SubmitHandler<FormType>;
  isPending?: boolean;
  isError?: boolean;
};

export const LoginForm = ({ onSubmit = () => {}, isPending }: LoginFormProps) => {
  const { handleSubmit, control } = useForm<FormType>({
    resolver: zodResolver(schema),
  });
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={10}
    >
      <View className="flex-1 justify-center p-4">
        <View className="items-center justify-center">
          <Text
            testID="form-title"
            className="pb-6 text-center text-4xl font-bold"
          >
            BADAN KEPEGAWAIAN NEGARA
          </Text>

          <Text className="mb-6 max-w-xs text-center text-gray-500">
            Aplikasi Perpustakaan
          </Text>
        </View>

        <ControlledInput
          testID="nik-input"
          control={control}
          name="nik"
          label="NIK"
          keyboardType="numeric"
        />
        <ControlledInput
          testID="password-input"
          control={control}
          name="password"
          label="Password"
          placeholder="***"
          secureTextEntry={true}
        />
        <Button
          testID="login-button"
          label="Login"
          loading={isPending}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </KeyboardAvoidingView>
  );
};
