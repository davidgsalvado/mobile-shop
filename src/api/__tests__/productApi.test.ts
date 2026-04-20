import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getProducts, getProductById } from '@/api/productApi';

describe('productApi', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe('getProducts', () => {
    it('returns products on success', async () => {
      const products = [{ id: '1', brand: 'Samsung', model: 'Galaxy', price: 899, imgUrl: '' }];
      vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(products),
      } as Response);

      const result = await getProducts();
      expect(result).toEqual(products);
      expect(fetch).toHaveBeenCalledWith('/api/product');
    });

    it('throws on non-ok response', async () => {
      vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
        ok: false,
      } as Response);

      await expect(getProducts()).rejects.toThrow('Failed to fetch products');
    });
  });

  describe('getProductById', () => {
    it('returns product detail on success', async () => {
      const detail = { id: '1', brand: 'Samsung' };
      vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(detail),
      } as Response);

      const result = await getProductById('1');
      expect(result).toEqual(detail);
      expect(fetch).toHaveBeenCalledWith('/api/product/1');
    });

    it('throws on non-ok response', async () => {
      vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
        ok: false,
      } as Response);

      await expect(getProductById('1')).rejects.toThrow('Failed to fetch product detail');
    });
  });
});
