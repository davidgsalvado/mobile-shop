import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import NotFoundPage from '@/pages/NotFoundPage';
import { renderWithProviders } from '@/test/test-utils';

describe('NotFoundPage', () => {
  it('renders 404 heading', () => {
    renderWithProviders(<NotFoundPage />);

    expect(screen.getByText('404 - Page Not Found')).toBeInTheDocument();
  });

  it('renders descriptive message', () => {
    renderWithProviders(<NotFoundPage />);

    expect(
      screen.getByText('Sorry, the page you are looking for does not exist.'),
    ).toBeInTheDocument();
  });
});
