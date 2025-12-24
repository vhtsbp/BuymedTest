import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useCart } from '../hooks/useCart';
import { Product } from '../types/product';
import { CartItem } from '../types/cart';

type Props = { product: Product; horizontal?: boolean };

type ContentProps = {
  product: Product;
  qty: number;
  addToCart: (product: Product) => void;
  updateQty: (id: string, qty: number) => void;
};

const Content: React.FC<ContentProps> = ({
  product,
  qty,
  addToCart,
  updateQty,
}) => (
  <>
    <Text style={styles.price}>{product.price.toLocaleString()}đ</Text>
    <Text style={styles.name} numberOfLines={2}>
      {product.name}
    </Text>
    <View style={styles.viewCate}>
      <View style={styles.categoryContainer}>
        <Text style={styles.category}>{product.category}</Text>
      </View>
    </View>
    <Text style={styles.desc} numberOfLines={1}>
      {product.desc}
    </Text>
    {product.isPrescription && (
      <View style={styles.rxBadge}>
        <Text style={styles.rxText}>Rx</Text>
      </View>
    )}
    <View style={styles.actions}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => qty > 0 && updateQty(product.id, qty - 1)}
        disabled={qty <= 0}
      >
        <Text>-</Text>
      </TouchableOpacity>
      <Text style={styles.qty}>{qty}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => qty < 99 && addToCart(product)}
        disabled={qty >= 99}
      >
        <Text>+</Text>
      </TouchableOpacity>
    </View>
  </>
);

const ProductItem = ({ product, horizontal }: Props) => {
  const { cart, addToCart, updateQty } = useCart();
  const cartItem = cart.find((item: CartItem) => item.id === product.id);
  const qty = cartItem?.qty || 0;

  if (horizontal) {
    return (
      <View style={styles.horizontalCard}>
        <Image source={{ uri: product.image }} style={styles.horizontalImage} />
        <View style={styles.horizontalContent}>
          <Content
            product={product}
            qty={qty}
            addToCart={addToCart}
            updateQty={updateQty}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Content
        product={product}
        qty={qty}
        addToCart={addToCart}
        updateQty={updateQty}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 4,
    marginBottom: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#eee',
  },
  image: { width: '100%', height: 120, resizeMode: 'contain', marginBottom: 8 },
  price: { fontWeight: 'bold', color: '#008000', marginBottom: 4 },
  name: { fontSize: 14, fontWeight: '500', marginBottom: 2, minHeight: 40 },
  category: { fontSize: 12, color: '#1976d2', marginBottom: 2 },
  desc: { fontSize: 12, color: '#888', marginBottom: 8 },
  rxBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#d32f2f',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  rxText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#ccc',
  },
  qty: { marginHorizontal: 8 },
  categoryContainer: {
    paddingVertical: 2,
    paddingHorizontal: 6,
    backgroundColor: '#e3f2fd',
    borderRadius: 4,
  },
  viewCate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  // Horizontal styles
  horizontalCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginVertical: 4,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#eee',
    alignItems: 'center',
  },
  horizontalImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginRight: 12,
    borderRadius: 8,
  },
  horizontalContent: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default ProductItem;
