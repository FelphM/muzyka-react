import { render, RenderOptions } from '@testing-library/react';
import { BrowserRouter, MemoryRouter, Routes, Route } from 'react-router-dom';
import { ReactElement } from 'react';

interface WrapperProps {
  children: React.ReactNode;
}

// Basic router wrapper using BrowserRouter
export function renderWithRouter(ui: ReactElement, { route = '/' } = {}) {
  window.history.pushState({}, 'Test page', route);
  
  return {
    ...render(ui, {
      wrapper: BrowserRouter
    })
  };
}

// Memory router wrapper with custom route setup
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
      <MemoryRouter initialEntries={initialEntries}>
        <Routes>
          <Route path={route} element={children} />
        </Routes>
      </MemoryRouter>
    );
  };

  return {
    ...render(ui, { wrapper: Wrapper, ...renderOptions })
  };
}