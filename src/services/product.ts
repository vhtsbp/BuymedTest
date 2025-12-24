import { getMockupProducts } from '../api/mockProducts';
import { Product } from '../types/product';

export const getProducts = async (params: {
  limit: number;
  skip: number;
  category?: string;
  search?: string;
}): Promise<Product[]> => {
  return await new Promise<Product[]>(resolve =>
    setTimeout(() => {
      console.log(params);

      resolve(
        getMockupProducts(
          params.skip,
          params.limit,
          params.search,
          params.category,
        ),
      );
    }, 500),
  );
};
