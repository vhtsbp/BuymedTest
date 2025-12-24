import { useQueryClient, useQuery } from '@tanstack/react-query';
import { ProductsQueryKeys } from '../react-query/querykeys/products';
import { CartItem } from '../types/cart';
import { Product } from '../types/product';

const CART_KEY = ProductsQueryKeys.cart();

export function useCart() {
  const queryClient = useQueryClient();

  const { data: cart = [] } = useQuery<CartItem[]>({
    queryKey: CART_KEY,
    queryFn: async () => {
      return queryClient.getQueryData<CartItem[]>(CART_KEY) || [];
    },
    initialData: [],
    notifyOnChangeProps: 'all',
    staleTime: Infinity,
  });

  const addToCart = (product: Product) => {
    const current = queryClient.getQueryData<CartItem[]>(CART_KEY) || [];
    const idx = current.findIndex(item => item.id === product.id);
    let next;
    if (idx >= 0) {
      next = [...current];
      next[idx].qty += 1;
    } else {
      next = [...current, { ...product, qty: 1 }];
    }
    queryClient.setQueryData(CART_KEY, next);
  };

  const removeFromCart = (productId: string) => {
    const current = queryClient.getQueryData<CartItem[]>(CART_KEY) || [];
    queryClient.setQueryData(
      CART_KEY,
      current.filter(item => item.id !== productId),
    );
  };

  const updateQty = (productId: string, qty: number) => {
    const current = queryClient.getQueryData<CartItem[]>(CART_KEY) || [];
    queryClient.setQueryData(
      CART_KEY,
      current.map(item => (item.id === productId ? { ...item, qty } : item)),
    );
  };

  const totalQuantity = cart.reduce((sum, item) => sum + (item.qty || 0), 0);

  return { cart, addToCart, removeFromCart, updateQty, totalQuantity };
}
