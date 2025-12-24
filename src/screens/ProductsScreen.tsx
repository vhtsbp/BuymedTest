import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  Text,
} from 'react-native';
import { useGetProducts } from '../react-query/hooks/products';
import ProductItem from '../components/ProductItem';
import { SearchIcon } from '../components/icons';
import { useNavigation } from '@react-navigation/native';

const ProductsScreen = () => {
  const navigation = useNavigation();

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetProducts({});

  const products = data?.pages.flat() || [];

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  if (isLoading) return <ActivityIndicator style={{ flex: 1 }} />;

  const renderHeader = () => (
    <View style={styles.searchContainer}>
      <TouchableOpacity
        style={styles.searchBar}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('ProductSearch')}
      >
        <SearchIcon width={20} height={20} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search product name..."
          editable={false}
          pointerEvents="none"
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        renderItem={({ item }) => <ProductItem product={item} />}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.2}
        ListFooterComponent={
          isFetchingNextPage ? (
            <ActivityIndicator style={{ margin: 16 }} />
          ) : null
        }
        ListHeaderComponent={renderHeader}
        stickyHeaderIndices={[0]}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text>No products found.</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingVertical: 8 },
  row: { justifyContent: 'space-between' },
  listContent: { padding: 12, paddingTop: 0 },
  searchContainer: {
    backgroundColor: '#fff',
    paddingBottom: 12,
    paddingTop: 8,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 40,
  },
  searchInput: {
    flex: 1,
    color: '#888',
    fontSize: 16,
    marginLeft: 8,
  },
  emptyState: { alignItems: 'center', marginTop: 32 },
});

export default ProductsScreen;
