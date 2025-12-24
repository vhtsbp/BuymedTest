import { Product } from '../types/product';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Dexipharm 15mg Tablet Imexpharm (c/500v)',
    desc: 'Chai 500 viên',
    price: 179000,
    image:
      'https://opcpharma.com/wp-content/uploads/2023/09/chai-va%CC%80-ho%CC%A3%CC%82p.webp',
    tags: ['SỐ LƯỢNG CÓ HẠN'],
    stock: 12,
    isLimited: true,
    category: 'Pain Relief',
    isPrescription: false,
  },
  {
    id: '2',
    name: 'Xịt Họng Keo Ong Hamico (C/30ml)',
    desc: 'Hộp 1 chai 30ml',
    price: 279000,
    image:
      'https://opcpharma.com/wp-content/uploads/2023/09/chai-va%CC%80-ho%CC%A3%CC%82p.webp',
    tags: ['HÀNG MỚI'],
    stock: 3,
    isHot: true,
    category: 'Antibiotic',
    isPrescription: false,
  },
  {
    id: '3',
    name: 'Paracetamol 500mg',
    desc: 'Hộp 10 vỉ x 10 viên',
    price: 12000,
    image:
      'https://opcpharma.com/wp-content/uploads/2023/09/chai-va%CC%80-ho%CC%A3%CC%82p.webp',
    stock: 50,
    category: 'Supplement',
    isPrescription: true,
  },
  {
    id: '4',
    name: 'Vitamin C 1000mg',
    desc: 'Lọ 100 viên',
    price: 22000,
    image:
      'https://opcpharma.com/wp-content/uploads/2023/09/chai-va%CC%80-ho%CC%A3%CC%82p.webp',
    stock: 0,
    tags: ['SẮP HẾT HÀNG'],
    isLimited: true,
    category: 'Allergy',
    isPrescription: false,
  },
  {
    id: '5',
    name: 'Ibuprofen 400mg',
    desc: 'Hộp 20 viên',
    price: 15000,
    image:
      'https://opcpharma.com/wp-content/uploads/2023/09/chai-va%CC%80-ho%CC%A3%CC%82p.webp',
    stock: 8,
    isPrescription: true,
    category: 'Pain Relief',
  },
  {
    id: '6',
    name: 'Aspirin 81mg',
    desc: 'Hộp 30 viên',
    price: 9000,
    image:
      'https://opcpharma.com/wp-content/uploads/2023/09/chai-va%CC%80-ho%CC%A3%CC%82p.webp',
    stock: 2,
    tags: ['SỐ LƯỢNG CÓ HẠN'],
    isLimited: true,
    isPrescription: false,
    category: 'Allergy',
  },
  {
    id: '7',
    name: 'Cetirizine 10mg',
    desc: 'Hộp 10 viên',
    price: 11000,
    image:
      'https://opcpharma.com/wp-content/uploads/2023/09/chai-va%CC%80-ho%CC%A3%CC%82p.webp',
    stock: 20,
    isPrescription: false,
    category: 'Pain Relief',
  },
  {
    id: '8',
    name: 'Loratadine 10mg',
    desc: 'Hộp 10 viên',
    price: 13000,
    image:
      'https://opcpharma.com/wp-content/uploads/2023/09/chai-va%CC%80-ho%CC%A3%CC%82p.webp',
    stock: 0,
    tags: ['SẮP HẾT HÀNG'],
    isLimited: true,
    isPrescription: true,
    category: 'Allergy',
  },
];

export function getMockupProducts(
  skip: number,
  limit: number,
  search?: string,
  category?: string,
): Product[] {
  const baseProducts = MOCK_PRODUCTS;
  const total = 1000;
  const products: Product[] = [];

  for (let i = 0; i < total; i++) {
    const base = baseProducts[i % baseProducts.length];
    products.push({
      ...base,
      id: (i + 1).toString(),
      name: `${base.name} #${i + 1}`,
      price: base.price + (i % 10) * 1000,
      stock: Math.max(0, base.stock - (i % 7)),
      tags: base.tags,
      isHot: base.isHot && i % 5 === 0,
      isLimited: base.isLimited && i % 3 === 0,
      category: base.category,
      isPrescription: base.isPrescription,
    });
  }

  let filtered = products;

  if (search && search.trim()) {
    const q = search.trim().toLowerCase();
    filtered = products.filter(p => p.name.toLowerCase().includes(q));
  }

  if (category && category !== 'All') {
    filtered = filtered.filter(p => p.category === category);
  }

  return filtered.slice(skip, skip + limit);
}
