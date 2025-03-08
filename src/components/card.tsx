import { Link, useRouter,  } from 'expo-router';
import React from 'react';
import { Env } from '@env';

import type { Post } from '@/api';
import { Button, Image, Pressable, Text, View } from '@/components/ui';

type Props = Post;

export const Card = ({ id, judul, gambar, penerbit, kategori, sisa }: Props) => {
  const router = useRouter();
  return (
    <Link href={`/feed/${id}`} asChild>
  <Pressable>
    <View className="m-2 overflow-hidden rounded-xl border border-neutral-300 bg-white dark:bg-neutral-900 p-3">
      {/* Judul Buku */}
      <Text className="text-lg font-bold text-black dark:text-white mb-2">
        Judul Buku: {judul}
      </Text>

      {/* Kontainer Foto dan Detail */}
      <View className="flex-row items-center">
        {/* Foto Buku */}
        <Image
          className="h-24 w-24 rounded-lg"
          contentFit="contain"
          source={{
            uri: `${Env.API_URL}/storage/${gambar}`,
          }}
        />

        {/* Detail Buku */}
        <View className="ml-4 flex-1">
          <Text className="text-gray-700 dark:text-gray-300">
            <Text className="font-semibold">kategori:</Text> {kategori}
          </Text>
          <Text className="text-gray-700 dark:text-gray-300">
            <Text className="font-semibold">Penerbit:</Text> {penerbit}
          </Text>
          <Text className="text-gray-700 dark:text-gray-300">
            <Text className="font-semibold">Sisa:</Text> {sisa}
          </Text>
        </View>
      </View>

      {/* Tombol Pinjam */}
      {/* <Button
        label="Pinjam"
        className="mt-3"
        onPress={() => {
          router.push(
            `/feed/add-post?id=${id}&judul=${judul}&penerbit=${penerbit}&kategori=${kategori}&sisa=${sisa}`
          );
        }}
      /> */}
    </View>
  </Pressable>
</Link>

  );
};
