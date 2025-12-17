import { describe, it, expect, beforeEach, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { OrdersPage } from '../src/pages/admin/Orders';
import { renderWithMemoryRouter } from './test-utils';
import userEvent from '@testing-library/user-event';

const mockOrders = [
  {
    id: 1,
    userName: 'John Doe',
    orderDate: '2025-10-28T00:00:00.000Z',
    totalPrice: 129.99,
    status: 'PENDING',
    items: [
      { productId: 1, productName: 'Album A', quantity: 1, price: 129.99 }
    ]
  },
  {
    id: 2,
    userName: 'Jane Smith',
    orderDate: '2025-11-01T00:00:00.000Z',
    totalPrice: 59.99,
    status: 'COMPLETED',
    items: [
      { productId: 2, productName: 'Album B', quantity: 1, price: 59.99 }
    ]
  }
];

vi.mock('../src/services/api', () => ({
  getAllOrders: async () => mockOrders,
  updateOrderStatus: async (orderId: number, newStatus: string) => ({
    ...mockOrders.find(o => o.id === orderId),
    status: newStatus
  })
}));

describe('OrdersPage Component', () => {
  beforeEach(() => {
    // Stub global fetch to ensure component fetches mocked data regardless of import resolution
    vi.stubGlobal('fetch', (input: any) => {
      const url = typeof input === 'string' ? input : input?.url;
      if (url && url.includes('/orders')) {
        return Promise.resolve({ ok: true, json: async () => mockOrders });
      }
      return Promise.resolve({ ok: true, json: async () => ({}) });
    });
    renderWithMemoryRouter(
      <OrdersPage />,
      {
        route: '/admin/orders',
        initialEntries: ['/admin/orders']
      }
    );
  });

  it('should render orders table correctly', async () => {
    // Check table headers
    expect(screen.getByRole('heading', { name: 'Orders Management' })).toBeDefined();
    
    const headers = ['Order ID', 'Customer', 'Date', 'Total', 'Status', 'Actions'];
    headers.forEach(header => {
      expect(screen.getByRole('columnheader', { name: header })).toBeDefined();
    });

    // Wait for the mocked order to render
    expect(await screen.findByText('#1')).toBeDefined();
    expect(await screen.findByText('John Doe')).toBeDefined();
    const expectedDate = new Date(mockOrders[0].orderDate).toLocaleDateString();
    expect(await screen.findByText(expectedDate)).toBeDefined();
    expect(await screen.findByText('$129.99')).toBeDefined();
  });

  it('should filter orders by status', async () => {
    const user = userEvent.setup();
    
    // Get the filter dropdown
    const filterSelect = screen.getByRole('combobox');
    expect(filterSelect).toBeDefined();
    
    // Change filter to PENDING (matches code values)
    await user.selectOptions(filterSelect, 'PENDING');
    expect(await screen.findByText('PENDING')).toBeDefined();
    
    // Verify filter options exist
    const options = ['All Orders', 'Pending', 'Completed', 'Cancelled'];
    options.forEach(option => {
      expect(screen.getByRole('option', { name: option })).toBeDefined();
    });
  });

  it('should render action button for pending orders', async () => {
    // For pending orders there should be a "Mark as Completed" button
    const completeButton = await screen.findByText('Mark as Completed');
    expect(completeButton).toBeDefined();
    expect(completeButton.className.includes('action-button') || completeButton.className.includes('complete')).toBe(true);
  });
});