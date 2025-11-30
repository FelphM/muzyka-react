import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ProductDetails } from '../src/pages/ProductDetails';
import { CartProvider } from '../src/context/CartContext';
import * as db from '../src/services/db';
import type { Product } from '../src/types/Product';

const mockProduct: Product = {
  id: "1",
  name: "Test Album",
  artist: "Test Artist",
  image: {
    src: "/test-image.jpg",
    alt: "Test Image"
  },
  price: 29.99,
  format: "Compact Disc",
  description: "Test description",
  link: "/test-link",
  slug: "test-album"
};

vi.mock('../src/services/db', () => ({
  getProducts: () => [mockProduct],
}));

describe('ProductDetails Component', () => {
  it('should render product information and add to cart', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={[`/product/${mockProduct.slug}`]}>
        <CartProvider>
          <Routes>
            <Route path="/product/:slug" element={<ProductDetails />} />
          </Routes>
        </CartProvider>
      </MemoryRouter>
    );

    expect(getByText(`${mockProduct.artist} - ${mockProduct.name}`)).toBeDefined();
    expect(getByText(`$${mockProduct.price}`)).toBeDefined();
    expect(getByText(mockProduct.description)).toBeDefined();

    const addToCartButton = getByText('Add To Cart');
    expect(addToCartButton).toBeDefined();

    fireEvent.click(addToCartButton);
  });
});
