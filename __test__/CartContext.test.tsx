import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CartProvider, useCart } from '../src/context/CartContext';
import type { ReactElement } from 'react';

function Wrapper({ children }: { children?: ReactElement }) {
  return <CartProvider>{children}</CartProvider>;
}

const sample = {
  id: 9,
  name: 'Sample',
  artist: 'Artist',
  format: 'Vinyl',
  price: 12.5,
  imageUrl: '/s.jpg',
  imageAlt: 's',
  stock: 3,
  slug: 'sample',
  link: '/p/sample',
  category: { id: 1, name: 'Pop', description: 'Pop' }
};

function Control() {
  const { cart, addToCart, removeFromCart, updateQuantity, clearCart } = useCart();
  return (
    <div>
      <div data-testid="count">{cart.length}</div>
      <div data-testid="qty">{cart[0]?.quantity ?? 0}</div>
      <button onClick={() => addToCart(sample)}>add</button>
      <button onClick={() => updateQuantity(sample.id, 2)}>set-2</button>
      <button onClick={() => removeFromCart(sample.id)}>remove</button>
      <button onClick={() => clearCart()}>clear</button>
    </div>
  );
}

describe('CartContext', () => {
  it('adds, updates, removes and clears items', async () => {
    const user = userEvent.setup();
    render(<Control />, { wrapper: Wrapper });

    expect(screen.getByTestId('count').textContent).toBe('0');

    await user.click(screen.getByText('add'));
    expect(screen.getByTestId('count').textContent).toBe('1');

    await user.click(screen.getByText('set-2'));
    expect(screen.getByTestId('qty').textContent).toBe('2');

    await user.click(screen.getByText('remove'));
    expect(screen.getByTestId('count').textContent).toBe('0');

    // add again then clear
    await user.click(screen.getByText('add'));
    expect(screen.getByTestId('count').textContent).toBe('1');
    await user.click(screen.getByText('clear'));
    expect(screen.getByTestId('count').textContent).toBe('0');
  });
});
