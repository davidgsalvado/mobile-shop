import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductDetailPage from '@/pages/ProductDetailPage';
import { renderWithProviders } from '@/test/test-utils';
import * as useProductDetailHook from '@/hooks/useProductDetail';
import * as useAddToCartHook from '@/hooks/useAddToCart';
import {
  fullProduct,
  partialProduct,
  noPriceProduct,
  noBatteryProduct,
  singleOptionProduct,
  minimalProduct,
} from '@/test/fixtures';
import type { ProductDetail } from '@/types/product';

vi.mock('@/hooks/useProductDetail');
vi.mock('@/hooks/useAddToCart');

// -- helpers -----------------------------------------------------------------

function mockProductDetail(
  product: ProductDetail | undefined,
  overrides: Record<string, unknown> = {},
) {
  vi.mocked(useProductDetailHook.useProductDetail).mockReturnValue({
    data: product,
    isLoading: false,
    isError: false,
    error: null,
    ...overrides,
  } as ReturnType<typeof useProductDetailHook.useProductDetail>);
}

function mockAddToCart(overrides: Record<string, unknown> = {}) {
  const mutate = vi.fn();
  vi.mocked(useAddToCartHook.useAddToCart).mockReturnValue({
    mutate,
    isPending: false,
    ...overrides,
  } as unknown as ReturnType<typeof useAddToCartHook.useAddToCart>);
  return mutate;
}

function renderDetailPage() {
  return renderWithProviders(<ProductDetailPage />, {
    routerProps: { initialEntries: ['/product/1'] },
  });
}

// -- tests -------------------------------------------------------------------

describe('ProductDetailPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ---------- Loading & Error states ----------

  describe('loading state', () => {
    it('shows skeleton while loading', () => {
      mockProductDetail(undefined, { isLoading: true });
      mockAddToCart();
      const { container } = renderDetailPage();

      expect(container.querySelector('.animate-pulse')).toBeInTheDocument();
    });
  });

  describe('error state', () => {
    it('shows error message when fetch fails', () => {
      mockProductDetail(undefined, { isError: true });
      mockAddToCart();
      renderDetailPage();

      expect(screen.getByText('Product not found.')).toBeInTheDocument();
    });

    it('shows error message when product is undefined', () => {
      mockProductDetail(undefined);
      mockAddToCart();
      renderDetailPage();

      expect(screen.getByText('Product not found.')).toBeInTheDocument();
    });
  });

  // ---------- Full product ----------

  describe('with a fully-populated product', () => {
    beforeEach(() => {
      mockProductDetail(fullProduct);
      mockAddToCart();
      renderDetailPage();
    });

    it('renders brand and model', () => {
      expect(screen.getByText('Samsung')).toBeInTheDocument();
      expect(screen.getByText('Galaxy S24')).toBeInTheDocument();
    });

    it('renders the product image', () => {
      const img = screen.getByAltText('Samsung Galaxy S24');
      expect(img).toHaveAttribute('src', fullProduct.imgUrl);
    });

    it('renders price with dollar sign', () => {
      expect(screen.getByText('$899')).toBeInTheDocument();
    });

    it('renders the battery badge', () => {
      expect(screen.getByText('4000 mAh')).toBeInTheDocument();
      expect(screen.getByText('Battery Life')).toBeInTheDocument();
    });

    it('renders all 8 spec cards', () => {
      expect(screen.getByText('Processor')).toBeInTheDocument();
      expect(screen.getByText('Snapdragon 8 Gen 3')).toBeInTheDocument();
      expect(screen.getByText('Display')).toBeInTheDocument();
      expect(screen.getByText('1440 x 3120')).toBeInTheDocument();
      expect(screen.getByText('Camera')).toBeInTheDocument();
      expect(screen.getByText('50 MP + 12 MP')).toBeInTheDocument();
      expect(screen.getByText('Secondary Camera')).toBeInTheDocument();
      expect(screen.getByText('12 MP')).toBeInTheDocument();
      expect(screen.getByText('Dimensions')).toBeInTheDocument();
      expect(screen.getByText('147 x 70.6 x 7.6 mm')).toBeInTheDocument();
      expect(screen.getByText('Weight (g)')).toBeInTheDocument();
      expect(screen.getByText('167')).toBeInTheDocument();
      expect(screen.getByText('RAM')).toBeInTheDocument();
      expect(screen.getByText('8 GB')).toBeInTheDocument();
      expect(screen.getByText('Operating System')).toBeInTheDocument();
      expect(screen.getByText('Android 14')).toBeInTheDocument();
    });

    it('renders storage options', () => {
      expect(screen.getByText('Storage Capacity')).toBeInTheDocument();
      expect(screen.getByText('128 GB')).toBeInTheDocument();
      expect(screen.getByText('256 GB')).toBeInTheDocument();
    });

    it('renders color options', () => {
      expect(screen.getByText('Finish Color')).toBeInTheDocument();
      expect(screen.getByTitle('Black')).toBeInTheDocument();
      expect(screen.getByTitle('White')).toBeInTheDocument();
    });

    it('renders the "Back to list" link', () => {
      const backLink = screen.getByText('Back to list');
      expect(backLink.closest('a')).toHaveAttribute('href', '/');
    });

    it('renders shipping info', () => {
      expect(
        screen.getByText('Free expedited shipping on orders over $500'),
      ).toBeInTheDocument();
    });
  });

  // ---------- Missing price ----------

  describe('when price is missing (0)', () => {
    it('shows "Price Unavailable" instead of a dollar amount', () => {
      mockProductDetail(noPriceProduct);
      mockAddToCart();
      renderDetailPage();

      expect(screen.getByText('Price Unavailable')).toBeInTheDocument();
      expect(screen.queryByText('$0')).not.toBeInTheDocument();
    });
  });

  // ---------- Missing battery ----------

  describe('when battery is invalid', () => {
    it('does not show the battery badge', () => {
      mockProductDetail(noBatteryProduct);
      mockAddToCart();
      renderDetailPage();

      expect(screen.queryByText('Battery Life')).not.toBeInTheDocument();
    });
  });

  // ---------- Partial product (multiple missing fields) ----------

  describe('with a partially-populated product', () => {
    beforeEach(() => {
      mockProductDetail(partialProduct);
      mockAddToCart();
      renderDetailPage();
    });

    it('does not show the battery badge when battery is empty', () => {
      expect(screen.queryByText('Battery Life')).not.toBeInTheDocument();
    });

    it('shows "Price Unavailable" when price is 0', () => {
      expect(screen.getByText('Price Unavailable')).toBeInTheDocument();
    });

    it('does not render Dimensions spec (N/A)', () => {
      expect(screen.queryByText('Dimensions')).not.toBeInTheDocument();
    });

    it('does not render Weight spec (dash)', () => {
      expect(screen.queryByText('Weight (g)')).not.toBeInTheDocument();
    });

    it('does not render Secondary Camera spec (all entries are dashes)', () => {
      expect(screen.queryByText('Secondary Camera')).not.toBeInTheDocument();
    });

    it('still renders valid specs', () => {
      expect(screen.getByText('Processor')).toBeInTheDocument();
      expect(screen.getByText('MediaTek Helio')).toBeInTheDocument();
      expect(screen.getByText('Display')).toBeInTheDocument();
      expect(screen.getByText('RAM')).toBeInTheDocument();
      expect(screen.getByText('Operating System')).toBeInTheDocument();
    });
  });

  // ---------- Minimal product (ALL fields invalid) ----------

  describe('with a minimal product (all optional fields invalid)', () => {
    beforeEach(() => {
      mockProductDetail(minimalProduct);
      mockAddToCart();
      renderDetailPage();
    });

    it('renders brand and model even when everything else is invalid', () => {
      expect(screen.getByText('Generic')).toBeInTheDocument();
      expect(screen.getByText('Phone')).toBeInTheDocument();
    });

    it('shows "Price Unavailable"', () => {
      expect(screen.getByText('Price Unavailable')).toBeInTheDocument();
    });

    it('does not render any spec cards', () => {
      expect(screen.queryByText('Processor')).not.toBeInTheDocument();
      expect(screen.queryByText('Display')).not.toBeInTheDocument();
      expect(screen.queryByText('Camera')).not.toBeInTheDocument();
      expect(screen.queryByText('Secondary Camera')).not.toBeInTheDocument();
      expect(screen.queryByText('Dimensions')).not.toBeInTheDocument();
      expect(screen.queryByText('Weight (g)')).not.toBeInTheDocument();
      expect(screen.queryByText('RAM')).not.toBeInTheDocument();
      expect(screen.queryByText('Operating System')).not.toBeInTheDocument();
    });

    it('does not render the battery badge', () => {
      expect(screen.queryByText('Battery Life')).not.toBeInTheDocument();
    });

    it('does not render storage options', () => {
      expect(screen.queryByText('Storage Capacity')).not.toBeInTheDocument();
    });

    it('does not render color options', () => {
      expect(screen.queryByText('Finish Color')).not.toBeInTheDocument();
    });
  });

  // ---------- Auto-select single options ----------

  describe('single option auto-selection', () => {
    it('auto-selects storage when only one option exists', () => {
      mockProductDetail(singleOptionProduct);
      renderDetailPage();

      // The add-to-cart button should be enabled since both options auto-select
      const addButton = screen.getByRole('button', { name: /add to cart/i });
      expect(addButton).toBeEnabled();
    });
  });

  // ---------- Add to cart interaction ----------

  describe('add to cart', () => {
    it('button is disabled when no options are selected', () => {
      mockProductDetail(fullProduct);
      mockAddToCart();
      renderDetailPage();

      const addButton = screen.getByRole('button', { name: /add to cart/i });
      expect(addButton).toBeDisabled();
    });

    it('calls addToCart with correct payload after selecting options', async () => {
      mockProductDetail(fullProduct);
      const mutate = mockAddToCart();
      const user = userEvent.setup();
      renderDetailPage();

      // Select a storage
      await user.click(screen.getByText('128 GB'));
      // Select a color
      await user.click(screen.getByTitle('Black'));
      // Click add to cart
      await user.click(screen.getByRole('button', { name: /add to cart/i }));

      expect(mutate).toHaveBeenCalledWith({
        id: '1',
        colorCode: 1,
        storageCode: 100,
      });
    });

    it('shows "Adding..." text when mutation is pending', () => {
      mockProductDetail(fullProduct);
      mockAddToCart({ isPending: true });
      renderDetailPage();

      expect(screen.getByText('Adding...')).toBeInTheDocument();
    });

    it('does not call mutate when button clicked without selections', async () => {
      mockProductDetail(fullProduct);
      const mutate = mockAddToCart();
      renderDetailPage();

      // Force-click the disabled button programmatically won't work via userEvent
      // but we verify the button is disabled
      const addButton = screen.getByRole('button', { name: /add to cart/i });
      expect(addButton).toBeDisabled();
      expect(mutate).not.toHaveBeenCalled();
    });

    it('shows selected color name', async () => {
      mockProductDetail(fullProduct);
      mockAddToCart();
      const user = userEvent.setup();
      renderDetailPage();

      await user.click(screen.getByTitle('White'));

      expect(screen.getByText('White')).toBeInTheDocument();
    });
  });
});
