import { describe, it, expect } from 'vitest';
import { isValid } from '@/utils/validation';

describe('isValid', () => {
  it('returns false for null and undefined', () => {
    expect(isValid(null)).toBe(false);
    expect(isValid(undefined)).toBe(false);
  });

  it('returns false for dash, empty string, and N/A variants', () => {
    expect(isValid('-')).toBe(false);
    expect(isValid('')).toBe(false);
    expect(isValid('N/A')).toBe(false);
    expect(isValid('n/a')).toBe(false);
    expect(isValid('null')).toBe(false);
    expect(isValid('undefined')).toBe(false);
  });

  it('returns false for strings with only whitespace around invalid values', () => {
    expect(isValid(' - ')).toBe(false);
    expect(isValid(' N/A ')).toBe(false);
  });

  it('returns true for valid strings', () => {
    expect(isValid('128 GB')).toBe(true);
    expect(isValid('Snapdragon 8')).toBe(true);
    expect(isValid('0')).toBe(true);
  });

  it('returns true for valid numbers', () => {
    expect(isValid(899)).toBe(true);
    expect(isValid(0)).toBe(true);
  });

  it('handles arrays - false when empty or all invalid', () => {
    expect(isValid([])).toBe(false);
    expect(isValid(['-', 'N/A'])).toBe(false);
  });

  it('handles arrays - true when at least one item is valid', () => {
    expect(isValid(['50 MP', '-'])).toBe(true);
    expect(isValid(['12 MP'])).toBe(true);
  });
});
