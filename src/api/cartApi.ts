import type { AddToCartBody, AddToCartResponse } from '@/types/cart';

const BASE_URL = import.meta.env.VITE_BASE_URL ?? 'https://itx-frontend-test.onrender.com';

export const addToCart = async (body: AddToCartBody): Promise<AddToCartResponse> => {
  const res = await fetch(`${BASE_URL}/api/cart`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(body),
  });
  if (!res.ok) throw new Error('Failed to add product to cart');
  return res.json();
};