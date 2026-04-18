import { useMutation } from '@tanstack/react-query';
import { addToCart } from '@/api/cartApi';
import { useCartStore } from '@/store/cartStore';
import type { AddToCartBody } from '@/types/cart';

export const useAddToCart = () => {
  const setCartCount = useCartStore((s) => s.setCartCount);

  return useMutation({
    mutationFn: (body: AddToCartBody) => addToCart(body),
    onSuccess: ({ count }) => {
      setCartCount(count);
    },
    onError: (error) => {
      console.error('Failed to add product to cart:', error);
    },
  });
};