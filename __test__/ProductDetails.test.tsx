import { fireEvent, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { renderWithMemoryRouter } from './test-utils';
import type { Product } from '../src/types/Product';
import { ProductDetails } from '../src/pages/ProductDetails';

const mockProduct: Product = {
  id: 1,
  name: 'Test Album',
  artist: 'Test Artist',
  imageUrl: '/test-image.jpg',
  imageAlt: 'Test Image',
  price: 29.99,
  format: 'Compact Disc',
  description: 'Test description',
  link: '/test-link',
  slug: 'test-album',
  stock: 5,
  category: { id: 1, name: 'Test', description: 'Test' }
};

vi.mock('../src/services/api', () => ({
  getProductBySlug: async (slug: string) => mockProduct,
}));

describe('ProductDetails Component', () => {
  it('should render product information and add to cart', async () => {
    renderWithMemoryRouter(
      <ProductDetails />,
      { route: '/product/:slug', initialEntries: [`/product/${mockProduct.slug}`] }
    );

    await waitFor(() => {
      const titleMatches = screen.getAllByText(`${mockProduct.artist} - ${mockProduct.name}`);
      expect(titleMatches.length).toBeGreaterThan(0);
    });
    expect(await screen.findByText(`$${mockProduct.price}`)).toBeDefined();
    expect(await screen.findByText(mockProduct.description)).toBeDefined();
    expect(await screen.findByAltText(mockProduct.imageAlt)).toBeDefined();

    const addToCartButton = await screen.findByText('Add To Cart');
    expect(addToCartButton).toBeDefined();

    fireEvent.click(addToCartButton);
  });
});
