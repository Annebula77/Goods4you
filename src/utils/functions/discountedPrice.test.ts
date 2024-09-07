import { describe, it, expect } from 'vitest';
import { discountedPrice } from './discountedPrice';

describe('discountedPrice', () => {
  it('should calculate the correct discounted price with a valid discount', () => {
    const result = discountedPrice(100, 20); // 20% for 100
    expect(result).toBe(80); // 100 - 20% = 80
  });

  it('should return the original price when the discount is 0%', () => {
    const result = discountedPrice(100, 0);
    expect(result).toBe(100);
  });

  it('should return 0 when the discount is 100%', () => {
    const result = discountedPrice(100, 100);
    expect(result).toBe(0);
  });

  it('should handle prices with decimals correctly', () => {
    const result = discountedPrice(99.99, 10); // 10% for 99.99
    expect(result).toBe(89.99); // rounded 89.99
  });

  it('should handle discounts with decimals correctly', () => {
    const result = discountedPrice(100, 15.5); // 15.5% for 100
    expect(result).toBe(84.5); // rounded до 84.50
  });

  it('should handle very small discounts correctly', () => {
    const result = discountedPrice(100, 0.1); // 0.1% from 100
    expect(result).toBe(99.9); // rounded 99.90
  });

  it('should return the same price for a discount of 0.00%', () => {
    const result = discountedPrice(100, 0.0);
    expect(result).toBe(100);
  });

  it('should return the correct price for a very large price', () => {
    const result = discountedPrice(1000000, 50); // 50% for 1,000,000
    expect(result).toBe(500000);
  });
});
