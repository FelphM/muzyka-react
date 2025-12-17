import { describe, it, expect, beforeEach, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { DashboardPage } from '../src/pages/admin/Dashboard';
import { renderWithMemoryRouter } from './test-utils';

const mockOrders = [
  {
    id: 12345,
    userName: 'Alice',
    orderDate: '2025-10-28T00:00:00.000Z',
    totalPrice: 1234.56,
    status: 'PENDING',
    items: [ { productId: 1, productName: 'Jazz Collection Vol. 1', quantity: 1, price: 1234.56 } ]
  },
  {
    id: 12344,
    userName: 'Bob',
    orderDate: '2025-10-28T00:00:00.000Z',
    totalPrice: 45678.90,
    status: 'COMPLETED',
    items: [ { productId: 2, productName: 'Classic Rock Anthology', quantity: 243, price: 187.98 } ]
  }
];

vi.mock('../src/services/api', () => ({
  getAllOrders: async () => mockOrders,
}));

describe('DashboardPage Component', () => {
  beforeEach(() => {
    renderWithMemoryRouter(
      <DashboardPage />,
      {
        route: '/admin/dashboard',
        initialEntries: ['/admin/dashboard']
      }
    );
  });

  it('should render all dashboard sections', () => {
    // Check for main section headings
    const headings = ['Sales Overview', 'Recent Orders', 'Popular Products', 'User Activity', 'Quick Actions'];
    headings.forEach(heading => {
      expect(screen.getByRole('heading', { name: heading })).toBeDefined();
    });
  });

  it('should display correct sales metrics', async () => {
    // Check for sales statistic elements
    const stats = await screen.findAllByText(/\$/);
    expect(stats.length).toBeGreaterThanOrEqual(1);

    // Check for metric labels
    expect(screen.getByText("Today's Sales")).toBeDefined();
    expect(screen.getByText('Monthly Sales')).toBeDefined();
    expect(screen.getByText('Orders Pending')).toBeDefined();
  });

  it('should render quick action links', () => {
    // Check for quick action links
    const actions = [
      'Add New Product',
      'Add Category',
      'View Pending Orders',
      'Generate Report'
    ];

    actions.forEach(action => {
      const link = screen.getByRole('link', { name: new RegExp(action, 'i') });
      expect(link).toBeDefined();
    });
  });

  it('should display recent orders', async () => {
    // Check for order items
    expect(await screen.findByText('#12345')).toBeDefined();
    expect(await screen.findByText('#12344')).toBeDefined();
    expect(await screen.findAllByText(/27/)).toBeDefined();
    expect(await screen.findByText('PENDING')).toBeDefined();
    expect(await screen.findByText('COMPLETED')).toBeDefined();
  });

  it('should display popular products', async () => {
    expect(await screen.findByText('Jazz Collection Vol. 1')).toBeDefined();
    expect(await screen.findByText('Classic Rock Anthology')).toBeDefined();
    const salesElems = await screen.findAllByText(/sales/);
    expect(salesElems.length).toBeGreaterThan(0);
  });
});