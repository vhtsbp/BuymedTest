import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  Platform,
  Alert,
  ScrollView,
} from 'react-native';
import { useCart } from '../hooks/useCart';
import { useNavigation } from '@react-navigation/native';

export default function SummaryScreen() {
  const navigation = useNavigation();
  const { cart, totalQuantity, removeFromCart } = useCart();
  const [customer, setCustomer] = useState({
    name: '',
    phone: '',
    address: '',
    note: '',
  });

  const handleChange = (key: keyof typeof customer, value: string) => {
    setCustomer(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    if (!customer.name.trim() || !customer.phone.trim()) {
      Alert.alert('Validation', 'Please enter customer name and phone.');
      return;
    }
    if (Platform.OS === 'android') {
      ToastAndroid.show('Order submitted successfully!', ToastAndroid.SHORT);
    } else {
      Alert.alert('Success', 'Order submitted successfully!');
    }
    // Reset cart
    cart.forEach(item => removeFromCart(item.id));
    setCustomer({ name: '', phone: '', address: '', note: '' });
    navigation.reset({
      index: 0,
      routes: [{ name: 'ProductsScreen' as never }],
    });
  };

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * (item.qty || 0),
    0,
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Customer Info Card */}
        <View style={styles.card}>
          <Text style={styles.title}>Customer Information</Text>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Customer Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter customer name"
              value={customer.name}
              onChangeText={v => handleChange('name', v)}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter phone number"
              value={customer.phone}
              onChangeText={v => handleChange('phone', v)}
              keyboardType="phone-pad"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter address"
              value={customer.address}
              onChangeText={v => handleChange('address', v)}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Note</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter note"
              value={customer.note}
              onChangeText={v => handleChange('note', v)}
              multiline
            />
          </View>
        </View>

        {/* Order Summary */}
        <View style={styles.orderInfo}>
          <Text style={styles.orderTitle}>Order Summary</Text>
          {cart.map((item, idx) => (
            <React.Fragment key={item.id}>
              <View style={styles.orderItem}>
                <Text style={styles.orderItemName}>{item.name}</Text>
                <Text style={styles.orderItemQty}>x{item.qty}</Text>
                <Text style={styles.orderItemPrice}>
                  {(item.price * item.qty).toLocaleString()}đ
                </Text>
              </View>
              {idx < cart.length - 1 && <View style={styles.divider} />}
            </React.Fragment>
          ))}
          <View style={styles.orderTotalRow}>
            <Text style={styles.orderTotalLabel}>Total quantity:</Text>
            <Text style={styles.orderTotalValue}>{totalQuantity}</Text>
          </View>
          <View style={styles.orderTotalRow}>
            <Text style={styles.orderTotalLabel}>Total amount:</Text>
            <Text style={styles.orderTotalValue}>
              {totalAmount.toLocaleString()}đ
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
          disabled={cart.length === 0}
        >
          <Text style={styles.buttonText}>Submit Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff', flexGrow: 1 },
  card: {
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fafafa',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: '500',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  orderInfo: {
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 12,
    marginBottom: 100,
  },
  orderTitle: { fontWeight: 'bold', fontSize: 16, marginBottom: 8 },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
    alignItems: 'center',
    paddingVertical: 6,
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 2,
  },
  orderItemName: { flex: 2, fontSize: 14 },
  orderItemQty: { flex: 1, textAlign: 'center', fontSize: 14 },
  orderItemPrice: {
    flex: 1,
    textAlign: 'right',
    fontSize: 14,
    color: '#1976d2',
  },
  orderTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  orderTotalLabel: { fontWeight: 'bold', fontSize: 15 },
  orderTotalValue: { fontWeight: 'bold', fontSize: 15, color: '#d32f2f' },
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
});
