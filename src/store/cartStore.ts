import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set) => ({
      cartCount: 0,
      setCartCount: (count) => set({ cartCount: count }),
    }),
    { name: 'cart-storage' } // save in localStorage with this key
  )
);