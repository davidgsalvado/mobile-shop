import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useProductSpecs } from '@/hooks/useProductSpecs';
import {
  fullProduct,
  partialProduct,
  minimalProduct,
} from '@/test/fixtures';

describe('useProductSpecs', () => {
  it('returns empty arrays when product is undefined', () => {
    const { result } = renderHook(() => useProductSpecs(undefined));

    expect(result.current.specs).toEqual([]);
    expect(result.current.storages).toEqual([]);
    expect(result.current.colors).toEqual([]);
  });

  it('returns all specs for a fully-populated product', () => {
    const { result } = renderHook(() => useProductSpecs(fullProduct));
    const labels = result.current.specs.map((s) => s.label);

    expect(labels).toContain('Processor');
    expect(labels).toContain('Display');
    expect(labels).toContain('Camera');
    expect(labels).toContain('Secondary Camera');
    expect(labels).toContain('Dimensions');
    expect(labels).toContain('Weight (g)');
    expect(labels).toContain('RAM');
    expect(labels).toContain('Operating System');
    expect(result.current.specs).toHaveLength(8);
  });

  it('filters out specs with invalid values', () => {
    const { result } = renderHook(() => useProductSpecs(partialProduct));
    const labels = result.current.specs.map((s) => s.label);

    // Should still have valid specs
    expect(labels).toContain('Processor');
    expect(labels).toContain('Display');
    expect(labels).toContain('Camera');
    expect(labels).toContain('RAM');
    expect(labels).toContain('Operating System');

    // Invalid fields removed
    expect(labels).not.toContain('Secondary Camera'); // ['-'] → invalid
    expect(labels).not.toContain('Dimensions');       // 'N/A' → invalid
    expect(labels).not.toContain('Weight (g)');       // '-' → invalid
  });

  it('returns no specs when all fields are invalid', () => {
    const { result } = renderHook(() => useProductSpecs(minimalProduct));

    expect(result.current.specs).toHaveLength(0);
  });

  it('joins primary camera array values', () => {
    const { result } = renderHook(() => useProductSpecs(fullProduct));
    const camera = result.current.specs.find((s) => s.label === 'Camera');

    expect(camera?.value).toBe('50 MP + 12 MP');
  });

  it('filters invalid entries from camera arrays before joining', () => {
    const { result } = renderHook(() => useProductSpecs(partialProduct));
    const camera = result.current.specs.find((s) => s.label === 'Camera');

    expect(camera?.value).toBe('48 MP');
  });

  it('returns storages and colors from options', () => {
    const { result } = renderHook(() => useProductSpecs(fullProduct));

    expect(result.current.storages).toEqual(fullProduct.options.storages);
    expect(result.current.colors).toEqual(fullProduct.options.colors);
  });

  it('filters out storages and colors with invalid names', () => {
    const productWithInvalidOptions = {
      ...fullProduct,
      options: {
        storages: [
          { code: 1, name: '128 GB' },
          { code: 2, name: '-' },
        ],
        colors: [
          { code: 1, name: '' },
          { code: 2, name: 'Red' },
        ],
      },
    };
    const { result } = renderHook(() => useProductSpecs(productWithInvalidOptions));

    expect(result.current.storages).toHaveLength(1);
    expect(result.current.storages[0].name).toBe('128 GB');
    expect(result.current.colors).toHaveLength(1);
    expect(result.current.colors[0].name).toBe('Red');
  });

  it('returns empty storages/colors when options are empty', () => {
    const { result } = renderHook(() => useProductSpecs(minimalProduct));

    expect(result.current.storages).toEqual([]);
    expect(result.current.colors).toEqual([]);
  });
});
