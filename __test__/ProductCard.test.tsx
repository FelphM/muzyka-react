import { fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ProductCard from '../src/components/ProductCard';
import { renderWithRouter } from './test-utils';
import type { Product } from '../src/types/Product';

describe('ProductCard Component', () => {
  const mockProduct: Product = {
    id: 1,
    name: "Test Album",
    artist: "Test Artist",
    imageUrl: "/test-image.jpg",
    imageAlt: "Test Image",
    price: 29.99,
    format: "Compact Disc",
    description: "Test description",
    link: "/test-link",
    slug: "test-album",
    stock: 5,
    category: { id: 1, name: 'Test', description: 'Test' }
  };

  it('should render product information correctly', () => {
    const { getByText, getByAltText } = renderWithRouter(<ProductCard product={mockProduct} />);
    
    expect(getByText(`${mockProduct.artist} - ${mockProduct.name}`)).toBeDefined();
    expect(getByText(`$${mockProduct.price} | ${mockProduct.format}`)).toBeDefined();
    expect(getByAltText(mockProduct.imageAlt)).toBeDefined();
    expect(getByText(mockProduct.description)).toBeDefined();
  });

  it('should handle button clicks correctly', () => {
    const { getByText } = renderWithRouter(<ProductCard product={mockProduct} />);
    
    const detailsButton = getByText('Details');
    const addToCartButton = getByText('Add To Cart');
    
    expect(detailsButton).toBeDefined();
    expect(addToCartButton).toBeDefined();
    
    fireEvent.click(detailsButton);
    fireEvent.click(addToCartButton);
  });
});