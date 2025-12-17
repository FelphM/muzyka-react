import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import CartPage from '../src/pages/Cart';
import { renderWithMemoryRouter } from './test-utils';
import userEvent from '@testing-library/user-event';
import { useEffect } from 'react';
import { useCart } from '../src/context/CartContext';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    Link: vi.fn(({ children }) => children),
  };
});

describe('CartPage Component', () => {
  // Helper component to initialize cart via context
  const DemoInitializer = ({ item }: any) => {
    const { addToCart } = useCart();
    useEffect(() => {
      addToCart(item);
    }, []);
    return null;
  };

  const demoItem = {
    id: 101,
    name: 'Greatest Hits Collection',
    artist: 'Rock Legends',
    format: 'Compact Disc',
    price: 24.99,
    imageUrl: '/demo.jpg',
    imageAlt: 'Demo cover',
    stock: 5,
    slug: 'greatest-hits',
    link: '/product/greatest-hits',
    category: { id: 1, name: 'Rock', description: 'Rock releases' }
  };

  it('should render cart items and summary', async () => {
    renderWithMemoryRouter(
      <>
        <DemoInitializer item={demoItem} />
        <CartPage />
      </>,
      { route: '/cart', initialEntries: ['/cart'] }
    );

    // Check if the cart title is rendered
    expect(screen.getByText('Shopping Cart')).toBeDefined();

    // Check if the demo item is rendered
    expect(await screen.findByText(demoItem.name)).toBeDefined();
    expect(await screen.findByText(`by ${demoItem.artist}`)).toBeDefined();
    expect(await screen.findByText(`Format: ${demoItem.format}`)).toBeDefined();
    expect(await screen.findByText(`Price: $${demoItem.price.toFixed(2)}`)).toBeDefined();
  });

  it('should calculate total correctly', async () => {
    renderWithMemoryRouter(
      <>
        <DemoInitializer item={demoItem} />
        <CartPage />
      </>,
      { route: '/cart', initialEntries: ['/cart'] }
    );

    // Demo item has price $24.99 and quantity 1
    expect(await screen.findByText(`Subtotal:`)).toBeDefined();
    expect(await screen.findByText(`$${demoItem.price.toFixed(2)}`)).toBeDefined();
  });

  it('should handle checkout when not logged in', async () => {
    const user = userEvent.setup();
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

    renderWithMemoryRouter(
      <>
        <DemoInitializer item={demoItem} />
        <CartPage />
      </>,
      { route: '/cart', initialEntries: ['/cart'] }
    );

    await user.click(screen.getByRole('button', { name: /Proceed to Checkout/i }));

    expect(alertSpy).toHaveBeenCalledWith('Please log in to proceed to checkout.');
    alertSpy.mockRestore();
  });
});