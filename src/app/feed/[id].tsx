import { router, Stack, useLocalSearchParams } from 'expo-router';
import * as React from 'react';
import { usePost } from '@/api';
import {
  ActivityIndicator,
  Button,
  FocusAwareStatusBar,
  ScrollView,
  Text,
  View,
  Image,
} from '@/components/ui';
import { Env } from '@env';

export default function Post() {
  const local = useLocalSearchParams<{ id: string }>();

  const { data, isPending, isError } = usePost({
    //@ts-ignore
    variables: { id: local.id },
  });

  if (isPending) {
    return (
      <View className="flex-1 justify-center  p-3">
        <Stack.Screen options={{ title: 'Post', headerBackTitle: 'Feed' }} />
        <FocusAwareStatusBar />
        <ActivityIndicator />
      </View>
    );
  }
  if (isError) {
    return (
      <View className="flex-1 justify-center p-3">
        <Stack.Screen options={{ title: 'Post', headerBackTitle: 'Feed' }} />
        <FocusAwareStatusBar />
        <Text className="text-center">Error loading post</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 p-3 ">
      <Stack.Screen options={{ title: 'Post', headerBackTitle: 'Feed' }} />
      <FocusAwareStatusBar />
      <ScrollView className="flex-1 bg-white dark:bg-neutral-900 p-4">
      {/* Gambar Buku */}
      <Image
        className="h-72 w-full rounded-xl mb-4"
        contentFit="contain"
        source={{
          uri: `${Env.API_URL}/storage/${data.gambar}`,
        }}
      />

      {/* Judul Buku */}
      <Text className="text-3xl font-bold text-black dark:text-white text-center mb-4">
        {data.judul}
      </Text>

      {/* Informasi Buku */}
      <View className="p-4 rounded-lg border border-neutral-300 bg-white dark:bg-neutral-800 shadow-md">
        <Text className="text-gray-700 dark:text-gray-300 text-lg">
          <Text className="font-semibold">Kategori:</Text> {data.kategori}
        </Text>
        <Text className="text-gray-700 dark:text-gray-300 text-lg">
          <Text className="font-semibold">Pengarang:</Text> {data.pengarang}
        </Text>
        <Text className="text-gray-700 dark:text-gray-300 text-lg">
          <Text className="font-semibold">Penerbit:</Text> {data.penerbit}
        </Text>
        <Text className="text-gray-700 dark:text-gray-300 text-lg">
          <Text className="font-semibold">Stok :</Text> {data.sisa}
        </Text>
      </View>

      {/* Tombol Pinjam */}
      <Button
        label="Pinjam Buku"
        className="mt-5"
        onPress={() => {
          router.push(
            `/feed/add-post?id=${data.id}`
          );
        }}
      />
    </ScrollView>
      
    </View>
  );
}
