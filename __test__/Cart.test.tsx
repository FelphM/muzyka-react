import { render, fireEvent } from '@testing-library/react';
import { CartPage } from '../src/pages/Cart';
import '@testing-library/jest-dom';

describe('CartPage Component', () => {
  const mockCartItems = [
    {
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
      slug: "test-album",
      quantity: 2
    }
  ];

  it('should render cart items correctly', () => {
    const { getByText, getByAltText } = render(<CartPage />);
    
    expect(getByText('Test Album')).toBeInTheDocument();
    expect(getByText('Test Artist')).toBeInTheDocument();
    expect(getByAltText('Test Image')).toBeInTheDocument();
    expect(getByText('$29.99')).toBeInTheDocument();
    expect(getByText('Quantity: 2')).toBeInTheDocument();
  });

  it('should calculate total correctly', () => {
    const { getByText } = render(<CartPage />);
    const total = mockCartItems[0].price * mockCartItems[0].quantity;
    
    expect(getByText(`Total: $${total.toFixed(2)}`)).toBeInTheDocument();
  });

  it('should handle payment form submission', () => {
    const { getByLabelText, getByText } = render(<CartPage />);
    
    fireEvent.change(getByLabelText('Card Number'), { target: { value: '4111111111111111' } });
    fireEvent.change(getByLabelText('Card Holder Name'), { target: { value: 'Test User' } });
    fireEvent.change(getByLabelText('Expiration Date'), { target: { value: '12/25' } });
    fireEvent.change(getByLabelText('CVV'), { target: { value: '123' } });
    
    fireEvent.click(getByText('Process Payment'));
    // Add payment processing expectations
  });
});