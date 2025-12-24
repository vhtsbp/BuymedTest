export type Product = {
  id: string;
  name: string;
  desc: string;
  price: number;
  image: string;
  tags?: string[];
  stock: number;
  isHot?: boolean;
  isLimited?: boolean;
  category: string;
  isPrescription: boolean;
};
