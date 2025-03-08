import * as React from 'react';

import { Text, EmptyList, FocusAwareStatusBar,  View } from '@/components/ui';
import {  TypePeminjaman, usePeminjaman } from '@/api';
import { Card } from '@/components/card';
import { FlashList } from '@shopify/flash-list';
import { RefreshControl } from 'react-native';
import { CardPeminjaman } from '@/components/card-peminjaman';

export default function Style() {

  const [refreshing, setRefreshing] = React.useState(false);
  const { data, isPending, isError, refetch } = usePeminjaman({
    variables: { limit: 10, },
  });

  const posts = data?.pages.flatMap((page) => page.data) ?? [];
  const renderItem = React.useCallback(
    ({ item }: { item: TypePeminjaman }) => <CardPeminjaman {...item} />,
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
