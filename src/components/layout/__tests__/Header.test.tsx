import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from '@/components/layout/Header';
import { useCartStore } from '@/store/cartStore';
import { useDetailStore } from '@/store/detailStore';

function renderHeader(initialEntries = ['/']) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  const router = createMemoryRouter(
    [
      {
        path: '/',
        element: <Header />,
      },
      {
        path: '/product/:id',
        element: <Header />,
      },
    ],
    { initialEntries },
  );

  return render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  );
}

describe('Header', () => {
  beforeEach(() => {
    useCartStore.setState({ cartCount: 0 });
    useDetailStore.setState({ pageTitle: '' });
  });

  it('renders the brand name linking to home', () => {
    renderHeader();
    const brand = screen.getByText('PhoneHub');
    expect(brand.closest('a')).toHaveAttribute('href', '/');
  });

  it('renders breadcrumb with Home', () => {
    renderHeader();
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('does not show cart badge when count is 0', () => {
    renderHeader();
    expect(screen.queryByText('0')).not.toBeInTheDocument();
  });

  it('shows cart badge when count > 0', () => {
    useCartStore.setState({ cartCount: 3 });
    renderHeader();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('caps cart badge at 99+', () => {
    useCartStore.setState({ cartCount: 150 });
    renderHeader();
    expect(screen.getByText('99+')).toBeInTheDocument();
  });

  it('shows page title in breadcrumb on product detail route', () => {
    useDetailStore.setState({ pageTitle: 'Samsung Galaxy' });
    renderHeader(['/product/1']);
    expect(screen.getByText('Samsung Galaxy')).toBeInTheDocument();
  });
});
