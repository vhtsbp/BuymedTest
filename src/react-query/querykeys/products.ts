export const ProductsQueryKeys = {
  all: ['products'] as const,
  list: (params?: { search?: string }) =>
    [...ProductsQueryKeys.all, 'list', params] as const,
  cart: () => [...ProductsQueryKeys.all, 'cart'] as const,
};
