import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useGetProducts } from '../react-query/hooks/products';
import ProductItem from '../components/ProductItem';

const CATEGORIES = [
  'All',
  'Pain Relief',
  'Antibiotic',
  'Supplement',
  'Allergy',
];

export default function ProductSearchScreen() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetProducts({ search, category });

  const products = data?.pages.flat() || [];

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search product name..."
        value={search}
        onChangeText={setSearch}
        autoCapitalize="none"
        autoCorrect={false}
      />

      <View style={styles.tabs}>
        {CATEGORIES.map(cat => (
          <TouchableOpacity
            key={cat}
            style={[styles.tab, category === cat && styles.tabActive]}
            onPress={() => setCategory(cat)}
          >
            <Text
              style={[styles.tabText, category === cat && styles.tabTextActive]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {isLoading ? (
        <ActivityIndicator style={{ flex: 1, marginTop: 40 }} size="large" />
      ) : (
        <FlatList
          data={products}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <ProductItem product={item} horizontal />}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text>No products found.</Text>
            </View>
          }
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.2}
          ListFooterComponent={
            isFetchingNextPage ? (
              <ActivityIndicator style={{ margin: 16 }} />
            ) : null
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 12 },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
    fontSize: 16,
  },
  tabs: { flexDirection: 'row', marginBottom: 12 },
  tab: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#f2f2f2',
    marginRight: 4,
  },
  tabActive: { backgroundColor: '#1976d2' },
  tabText: { color: '#333', fontWeight: '500', fontSize: 12 },
  tabTextActive: { color: '#fff' },
  productRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
    gap: 8,
  },
  productName: { flex: 2, fontWeight: 'bold', fontSize: 15 },
  productCategory: { flex: 1, color: '#1976d2', fontSize: 13 },
  productPrice: { flex: 1, color: '#008000', fontWeight: 'bold' },
  rxBadge: {
    backgroundColor: '#d32f2f',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 8,
  },
  rxText: { color: '#fff', fontWeight: 'bold', fontSize: 12 },
  emptyState: { alignItems: 'center', marginTop: 32 },
});
