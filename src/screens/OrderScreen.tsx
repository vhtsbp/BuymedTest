import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../hooks/useCart';
import ProductItem from '../components/ProductItem';

export default function OrderScreen() {
  const { cart } = useCart();
  const navigation = useNavigation();

  const totalSKU = cart.length;
  const totalQuantity = cart.reduce((sum, item) => sum + (item.qty || 0), 0);
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * (item.qty || 0),
    0,
  );

  if (cart.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Your cart is empty.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <ProductItem product={item} horizontal />}
        contentContainerStyle={{ paddingBottom: 200 }}
      />

      <View style={styles.footer}>
        <View style={styles.summaryRow}>
          <Text style={styles.bold}>Total SKUs: {totalSKU}</Text>
          <Text style={styles.bold}>Total quantity: {totalQuantity}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.amountLabel}>Total amount:</Text>
          <Text style={styles.amount}>{totalAmount.toLocaleString()}đ</Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Summary' as never)}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 12 },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  info: { flex: 1 },
  name: { fontWeight: 'bold', fontSize: 15, marginBottom: 2 },
  price: { color: '#008000', fontWeight: 'bold', fontSize: 14 },
  actions: { flexDirection: 'row', alignItems: 'center' },
  qtyButton: {
    borderWidth: 1,
    borderColor: '#1976d2',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginHorizontal: 4,
  },
  qtyButtonText: { color: '#1976d2', fontWeight: 'bold', fontSize: 16 },
  qtyText: { minWidth: 24, textAlign: 'center', fontSize: 16 },
  summary: { fontSize: 16 },
  bold: { fontWeight: 'bold', color: '#005c29' },
  amount: { fontWeight: 'bold', color: '#d32f2f', fontSize: 16 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { color: '#888', fontSize: 18 },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#eee',
  },
  button: {
    backgroundColor: '#005c29',
    paddingVertical: 14,
    borderRadius: 45,
    alignItems: 'center',
    height: 46,
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  amountLabel: {
    fontWeight: 500,
    color: '#a1a1a1',
    fontSize: 16,
  },
});
