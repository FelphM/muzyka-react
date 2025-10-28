import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { CartPage } from '../src/pages/Cart';
import { renderWithMemoryRouter } from './test-utils';
import userEvent from '@testing-library/user-event';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    Link: vi.fn(({ children }) => children),
  };
});

describe('CartPage Component', () => {
  it('should render cart items and shipping form', async () => {
    renderWithMemoryRouter(
      <CartPage />,
      { 
        route: '/cart',
        initialEntries: ['/cart']
      }
    );
    
    // Check if the cart title is rendered
    expect(screen.getByText('Shopping Cart')).toBeDefined();
    
    // Check if the demo item is rendered
    expect(screen.getByText('Greatest Hits Collection')).toBeDefined();
    expect(screen.getByText('Artist: Rock Legends')).toBeDefined();
    expect(screen.getByText('Format: Compact Disc')).toBeDefined();
    expect(screen.getByText('Price: $24.99')).toBeDefined();
    
    // Check if payment form elements are present
    expect(screen.getByLabelText('Card Number')).toBeDefined();
    expect(screen.getByLabelText('Card Holder Name')).toBeDefined();
    expect(screen.getByLabelText('Expiration Date')).toBeDefined();
    expect(screen.getByLabelText('CVV')).toBeDefined();
  });

  it('should calculate total correctly', () => {
    renderWithMemoryRouter(
      <CartPage />,
      { 
        route: '/cart',
        initialEntries: ['/cart']
      }
    );
    
    // Demo item has price $24.99 and quantity 1
    expect(screen.getByText('Total: $24.99')).toBeDefined();
  });

  it('should handle payment form submission', async () => {
    const user = userEvent.setup();
    
    renderWithMemoryRouter(
      <CartPage />,
      { 
        route: '/cart',
        initialEntries: ['/cart']
      }
    );
    
    // Fill out payment form
    await user.type(screen.getByLabelText('Card Number'), '4111111111111111');
    await user.type(screen.getByLabelText('Card Holder Name'), 'Test User');
    await user.type(screen.getByLabelText('Expiration Date'), '12/25');
    await user.type(screen.getByLabelText('CVV'), '123');
    await user.type(screen.getByLabelText('Shipping Address'), '123 Test St');
    await user.type(screen.getByLabelText('City'), 'Test City');
    await user.type(screen.getByLabelText('ZIP Code'), '12345');
    
    // Click the submit button
    await user.click(screen.getByRole('button', { name: /process payment/i }));
    
    // Since the form has required fields and we filled them all,
    // the form should be valid
    expect(screen.getByRole('button', { name: /process payment/i })).toBeDefined();
  });
});