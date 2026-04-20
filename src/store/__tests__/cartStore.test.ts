import { describe, it, expect } from 'vitest';
import { useCartStore } from '@/store/cartStore';

describe('cartStore', () => {
  beforeEach(() => {
    useCartStore.setState({ cartCount: 0 });
  });

  it('starts with cartCount 0', () => {
    expect(useCartStore.getState().cartCount).toBe(0);
  });

  it('setCartCount updates count', () => {
    useCartStore.getState().setCartCount(5);
    expect(useCartStore.getState().cartCount).toBe(5);
  });

  it('setCartCount can reset to 0', () => {
    useCartStore.getState().setCartCount(10);
    useCartStore.getState().setCartCount(0);
    expect(useCartStore.getState().cartCount).toBe(0);
  });
});
