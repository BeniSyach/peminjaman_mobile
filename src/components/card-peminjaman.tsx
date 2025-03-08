
import React from 'react';

import type { TypePeminjaman } from '@/api';
import { Text, View, Image } from '@/components/ui';
import { Env } from '@env';

type Props = TypePeminjaman;

export const CardPeminjaman = ({ buku, user, tanggal_pinjam, tanggal_kembali }: Props) => {
  return (
    <View className="m-2 overflow-hidden rounded-xl border border-neutral-300 bg-white dark:bg-neutral-900 p-3">
      {/* Judul Buku */}
      <Text className="text-lg font-bold text-black dark:text-white mb-2">
        Judul Buku : {buku.judul}
      </Text>

      {/* Kontainer Foto dan Detail */}
      <View className="flex-row items-center">
        {/* Foto Buku */}
        <Image
          className="h-24 w-24 rounded-lg"
          contentFit="contain"
          source={{
            uri: `${Env.API_URL}/storage/${buku.gambar}`,
          }}
        />

        {/* Detail Buku */}
        <View className="ml-4 flex-1">
          <Text className="text-gray-700 dark:text-gray-300">
            <Text className="font-semibold">kategori :</Text> {buku.kategori}
          </Text>
          <Text className="text-gray-700 dark:text-gray-300">
            <Text className="font-semibold">Penerbit :</Text> {buku.penerbit}
          </Text>
          <Text className="text-gray-700 dark:text-gray-300">
            <Text className="font-semibold">Peminjam :</Text> {user.nama}
          </Text>
          <Text className="text-gray-700 dark:text-gray-300">
            <Text className="font-semibold">Tanggal Peminjaman :</Text> {tanggal_pinjam}
          </Text>
          <Text className="text-gray-700 dark:text-gray-300">
            <Text className="font-semibold">Tanggal Pengembalian :</Text> {tanggal_kembali}
          </Text>
        </View>
      </View>
    </View>

  );
};
