import { FlashList } from '@shopify/flash-list';
import React, { useState } from 'react';

import type { Post } from '@/api';
import { usePosts } from '@/api';
import { Card } from '@/components/card';
import { Button, EmptyList, FocusAwareStatusBar, Text, View } from '@/components/ui';
import { TextInput, RefreshControl } from 'react-native';

export default function Feed() {
  const [search, setSearch] = useState(''); 
  const [query, setQuery] = useState(''); 
  const [refreshing, setRefreshing] = useState(false);
  const { data, isPending, isError, refetch } = usePosts({
    variables: { limit: 10, sort: 'id', order: 'asc', search: query },
  });

  const posts = data?.pages.flatMap((page) => page.data) ?? [];
  const renderItem = React.useCallback(
    ({ item }: { item: Post }) => <Card {...item} />,
    []
  );

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch(); // Mengambil data terbaru
    setRefreshing(false);
  };

  if (isError) {
    return (
      <View>
        <Text> Error Loading data </Text>
      </View>
    );
  }
  return (
    <View className="flex-1 ">
      <FocusAwareStatusBar />
      {/* Input Pencarian */}
      <View className="flex-row items-center mb-4 p-2">
        <TextInput
          className="flex-1 border border-gray-300 rounded-lg p-2 mx-2"
          placeholder="Cari buku..."
          value={search}
          onChangeText={setSearch}
        />
        <Button label="Cari" onPress={() => setQuery(search)} />
      </View>
      <FlashList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(_, index) => `item-${index}`}
        ListEmptyComponent={<EmptyList isLoading={isPending} />}
        estimatedItemSize={300}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
      />
    </View>
  );
}
