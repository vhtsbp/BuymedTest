import { Product } from './product';

export type CartItem = Product & { qty: number };
