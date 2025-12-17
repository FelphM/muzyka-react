import { render, RenderOptions } from '@testing-library/react';
import { BrowserRouter, MemoryRouter, Routes, Route } from 'react-router-dom';
import { ReactElement } from 'react';
import { CartProvider } from '../src/context/CartContext';
import { AuthProvider } from '../src/context/AuthContext';

interface WrapperProps {
  children: React.ReactNode;
}

// Basic router wrapper using BrowserRouter + providers
export function renderWithRouter(ui: ReactElement, { route = '/' } = {}) {
  window.history.pushState({}, 'Test page', route);

  const Wrapper = ({ children }: WrapperProps) => (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>{children}</BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );

  return {
    ...render(ui, { wrapper: Wrapper })
  };
}

// Memory router wrapper with custom route setup + providers
export function renderWithMemoryRouter(
  ui: ReactElement,
  {
    initialEntries = ['/'],
    route = '/',
    ...renderOptions
  } = {}
) {
  const Wrapper = ({ children }: WrapperProps) => {
    return (
      <AuthProvider>
        <CartProvider>
          <MemoryRouter initialEntries={initialEntries}>
            <Routes>
              <Route path={route} element={children} />
            </Routes>
          </MemoryRouter>
        </CartProvider>
      </AuthProvider>
    );
  };

  return {
    ...render(ui, { wrapper: Wrapper, ...renderOptions })
  };
}