import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import ProductGrid from '@/components/product/ProductGrid';
import { renderWithProviders } from '@/test/test-utils';

describe('ProductGrid', () => {
  const products = [
    { id: '1', brand: 'Samsung', model: 'Galaxy S24', price: 899, imgUrl: '' },
    { id: '2', brand: 'Apple', model: 'iPhone 15', price: 999, imgUrl: '' },
  ];

  it('renders a card for each product', () => {
    renderWithProviders(<ProductGrid products={products} isLoading={false} />);

    expect(screen.getByText('Galaxy S24')).toBeInTheDocument();
    expect(screen.getByText('iPhone 15')).toBeInTheDocument();
  });

  it('shows skeleton while loading', () => {
    const { container } = renderWithProviders(
      <ProductGrid products={[]} isLoading={true} />,
    );

    expect(container.querySelectorAll('.animate-pulse').length).toBeGreaterThan(0);
  });

  it('shows empty message when no products match', () => {
    renderWithProviders(<ProductGrid products={[]} isLoading={false} />);

    expect(screen.getByText('No products found.')).toBeInTheDocument();
  });
});
