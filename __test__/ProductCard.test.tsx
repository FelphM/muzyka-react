import { render, fireEvent } from '@testing-library/react';
import { ProductCard } from '../src/components/ProductCard';

describe('ProductCard Component', () => {
  const mockProduct = {
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

  it('should render product information correctly', () => {
    const { getByText, getByAltText } = render(<ProductCard product={mockProduct} />);
    
    expect(getByText('Test Artist - Test Album')).toBeInTheDocument();
    expect(getByText('$29.99 | Compact Disc')).toBeInTheDocument();
    expect(getByAltText('Test Image')).toBeInTheDocument();
    expect(getByText('Test description')).toBeInTheDocument();
  });

  it('should handle button clicks correctly', () => {
    const { getByText } = render(<ProductCard product={mockProduct} />);
    
    const detailsButton = getByText('Details');
    const addToCartButton = getByText('Add To Cart');
    
    fireEvent.click(detailsButton);
    // Add navigation test expectations
    
    fireEvent.click(addToCartButton);
    // Add cart functionality test expectations
  });
});