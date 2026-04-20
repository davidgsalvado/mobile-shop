import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import ProductCard from '@/components/product/ProductCard';
import { renderWithProviders } from '@/test/test-utils';

describe('ProductCard', () => {
  const product = {
    id: '1',
    brand: 'Apple',
    model: 'iPhone 15',
    price: 999,
    imgUrl: 'https://example.com/iphone.png',
  };

  it('renders brand, model and price', () => {
    renderWithProviders(<ProductCard product={product} />);

    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('iPhone 15')).toBeInTheDocument();
    expect(screen.getByText('$999')).toBeInTheDocument();
  });

  it('renders product image with correct alt text', () => {
    renderWithProviders(<ProductCard product={product} />);
    const img = screen.getByRole('img');

    expect(img).toHaveAttribute('alt', 'Apple iPhone 15');
    expect(img).toHaveAttribute('src', 'https://example.com/iphone.png');
  });

  it('links to the product detail page', () => {
    renderWithProviders(<ProductCard product={product} />);
    const link = screen.getByRole('link');

    expect(link).toHaveAttribute('href', '/product/1');
  });

  it('shows "Price Unavailable" when price is invalid (empty string from API)', () => {
    renderWithProviders(
      <ProductCard product={{ ...product, price: '' as unknown as number }} />,
    );

    expect(screen.getByText('Price Unavailable')).toBeInTheDocument();
  });

  it('shows $0 when price is 0 (valid)', () => {
    renderWithProviders(<ProductCard product={{ ...product, price: 0 }} />);

    expect(screen.getByText('$0')).toBeInTheDocument();
  });
});
