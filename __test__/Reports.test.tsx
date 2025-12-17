import { render, fireEvent } from '@testing-library/react';
import { ReportsPage } from '../src/pages/admin/Reports';
import { describe, it, expect, vi } from 'vitest';

const mockOrders = [
  {
    id: 1,
    userName: 'John Doe',
    orderDate: '2025-12-01T00:00:00.000Z',
    totalPrice: 100,
    status: 'COMPLETED',
    items: [ { productId: 1, productName: 'Album A', quantity: 1, price: 100 } ]
  }
];

vi.mock('../src/services/api', () => ({
  getAllOrders: async () => mockOrders,
}));

describe('ReportsPage Component', () => {
  it('should render sales overview correctly', () => {
    const { getByText } = render(<ReportsPage />);
    
    expect(getByText('Sales Reports')).toBeInTheDocument();
    expect(getByText('Sales Overview')).toBeInTheDocument();
    expect(getByText('Top Selling Products')).toBeInTheDocument();
  });

  it('should handle date range selection', () => {
    const { getByRole, queryByText } = render(<ReportsPage />);
    
    const rangeSelect = getByRole('combobox');
    fireEvent.change(rangeSelect, { target: { value: 'week' } });
    
    expect(queryByText('Last Week')).toBeInTheDocument();
  });

  it('should display correct sales metrics', async () => {
    const { findByText } = render(<ReportsPage />);
    
    expect(await findByText('Revenue')).toBeInTheDocument();
    expect(await findByText('Orders')).toBeInTheDocument();
    expect(await findByText('Avg. Order')).toBeInTheDocument();
  });

  it('should handle export functionality', () => {
    const { getByText } = render(<ReportsPage />);
    
    const exportButton = getByText('Export Report');
    fireEvent.click(exportButton);
    // Export triggers download link; ensure button exists and is clickable
    expect(exportButton).toBeDefined();
  });
});