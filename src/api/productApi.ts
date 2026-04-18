import type { Product, ProductDetail } from '@/types/product';

const BASE_URL = import.meta.env.VITE_BASE_URL ?? 'https://itx-frontend-test.onrender.com';

export const getProducts = async (): Promise<Product[]> => {
  const res = await fetch(`${BASE_URL}/api/product`);
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
};

export const getProductById = async (id: string): Promise<ProductDetail> => {
  const res = await fetch(`${BASE_URL}/api/product/${id}`);
  if (!res.ok) throw new Error('Failed to fetch product detail');
  return res.json();
};