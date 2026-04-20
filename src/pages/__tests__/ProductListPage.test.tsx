import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductListPage from '@/pages/ProductListPage';
import { renderWithProviders } from '@/test/test-utils';
import * as useProductsHook from '@/hooks/useProducts';
import type { Product } from '@/types/product';

vi.mock('@/hooks/useProducts');

const products: Product[] = [
  { id: '1', brand: 'Samsung', model: 'Galaxy S24', price: 899, imgUrl: '' },
  { id: '2', brand: 'Apple', model: 'iPhone 15', price: 999, imgUrl: '' },
  { id: '3', brand: 'Samsung', model: 'Galaxy A15', price: 199, imgUrl: '' },
];

function mockUseProducts(overrides: Partial<ReturnType<typeof useProductsHook.useProducts>> = {}) {
  vi.mocked(useProductsHook.useProducts).mockReturnValue({
    data: products,
    isLoading: false,
    isError: false,
    error: null,
    ...overrides,
  } as ReturnType<typeof useProductsHook.useProducts>);
}

describe('ProductListPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the heading and product count', () => {
    mockUseProducts();
    renderWithProviders(<ProductListPage />);

    expect(screen.getByText('Smartphones')).toBeInTheDocument();
    expect(screen.getByText('3 devices found')).toBeInTheDocument();
  });

  it('renders all products', () => {
    mockUseProducts();
    renderWithProviders(<ProductListPage />);

    expect(screen.getByText('Galaxy S24')).toBeInTheDocument();
    expect(screen.getByText('iPhone 15')).toBeInTheDocument();
    expect(screen.getByText('Galaxy A15')).toBeInTheDocument();
  });

  it('filters products by search input', async () => {
    mockUseProducts();
    const user = userEvent.setup();
    renderWithProviders(<ProductListPage />);

    const searchInput = screen.getByPlaceholderText('Search brand or model...');
    await user.type(searchInput, 'iPhone');

    expect(screen.getByText('iPhone 15')).toBeInTheDocument();
    expect(screen.queryByText('Galaxy S24')).not.toBeInTheDocument();
    expect(screen.getByText('1 device found')).toBeInTheDocument();
  });

  it('filters are case-insensitive', async () => {
    mockUseProducts();
    const user = userEvent.setup();
    renderWithProviders(<ProductListPage />);

    await user.type(screen.getByPlaceholderText('Search brand or model...'), 'samsung');

    expect(screen.getByText('Galaxy S24')).toBeInTheDocument();
    expect(screen.getByText('Galaxy A15')).toBeInTheDocument();
    expect(screen.getByText('2 devices found')).toBeInTheDocument();
  });

  it('shows no products message when search has no matches', async () => {
    mockUseProducts();
    const user = userEvent.setup();
    renderWithProviders(<ProductListPage />);

    await user.type(screen.getByPlaceholderText('Search brand or model...'), 'Nokia');

    expect(screen.getByText('No products found.')).toBeInTheDocument();
    expect(screen.getByText('0 devices found')).toBeInTheDocument();
  });

  it('does not show product count while loading', () => {
    mockUseProducts({ data: undefined, isLoading: true });
    renderWithProviders(<ProductListPage />);

    expect(screen.queryByText(/devices? found/)).not.toBeInTheDocument();
  });
});
