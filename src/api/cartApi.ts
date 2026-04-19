import type { AddToCartBody, AddToCartResponse } from '@/types/cart';

export const addToCart = async (body: AddToCartBody): Promise<AddToCartResponse> => {
  const res = await fetch(`/api/cart`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(body),
  });
  if (!res.ok) throw new Error('Failed to add product to cart');
  return res.json();
};