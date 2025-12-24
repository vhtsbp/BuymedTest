import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductsScreen from '../screens/ProductsScreen';
import ProductSearchScreen from '../screens/ProductSearchScreen';
import OrderScreen from '../screens/OrderScreen';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import { ShoppingCartIcon } from '../components/icons';
import { useCart } from '../hooks/useCart';
import SummaryScreen from '../screens/SummaryScreen';

export type RootStackParamList = {
  ProductSearch: undefined;
  Order: undefined;
  ProductsScreen: undefined;
  Summary: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const styles = StyleSheet.create({
  headerRightButton: {
    backgroundColor: 'transparent',
    borderRadius: 0,
  },
  cartView: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
  },
  badgeContainer: {
    position: 'absolute',
    top: 2,
    right: 2,
    minWidth: 18,
    height: 16,
    borderRadius: 9,
    backgroundColor: '#e53935',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    paddingHorizontal: 4,
    borderWidth: 1,
    borderColor: '#005c29',
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

function HeaderRight({ navigation }: { navigation: any }) {
  const { totalQuantity } = useCart();

  return (
    <TouchableOpacity
      style={styles.headerRightButton}
      onPress={() => navigation.navigate('Order')}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
    >
      <View style={styles.cartView}>
        <ShoppingCartIcon />
        {totalQuantity > 0 && (
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>{totalQuantity}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="ProductsScreen"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#005c29',
        },
        headerTintColor: '#fff',
      }}
    >
      <Stack.Screen
        name="ProductsScreen"
        component={ProductsScreen}
        options={({ navigation }) => ({
          title: 'Products',
          headerRight: () => <HeaderRight navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="ProductSearch"
        component={ProductSearchScreen}
        options={({ navigation }) => ({
          title: 'Search Products',
          headerRight: () => <HeaderRight navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="Order"
        component={OrderScreen}
        options={{ title: 'Quick Order' }}
      />
      <Stack.Screen
        name="Summary"
        component={SummaryScreen}
        options={{ title: 'Summary' }}
      />
    </Stack.Navigator>
  );
}
