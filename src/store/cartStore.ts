import type { CartStore } from '@/types/cart';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cartCount:    0,
      setCartCount: (count) => set({ cartCount: count }),
    }),
    { name: 'cart-storage' }
  )
);