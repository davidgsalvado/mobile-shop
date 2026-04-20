import { describe, it, expect, vi, beforeEach } from 'vitest';
import { addToCart } from '@/api/cartApi';

describe('cartApi', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('sends POST with correct body and returns count', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ count: 3 }),
    } as Response);

    const result = await addToCart({ id: '1', colorCode: 1, storageCode: 100 });

    expect(result).toEqual({ count: 3 });
    expect(fetch).toHaveBeenCalledWith('/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: '1', colorCode: 1, storageCode: 100 }),
    });
  });

  it('throws on non-ok response', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: false,
    } as Response);

    await expect(
      addToCart({ id: '1', colorCode: 1, storageCode: 100 }),
    ).rejects.toThrow('Failed to add product to cart');
  });
});
