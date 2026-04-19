import type { Product, ProductDetail } from '@/types/product';

export const getProducts = async (): Promise<Product[]> => {
  const res = await fetch(`/api/product`);
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
};

export const getProductById = async (id: string): Promise<ProductDetail> => {
  const res = await fetch(`/api/product/${id}`);
  if (!res.ok) throw new Error('Failed to fetch product detail');
  return res.json();
};