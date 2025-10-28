import { describe, it, expect, beforeEach } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { OrdersPage } from '../src/pages/admin/Orders';
import { renderWithMemoryRouter } from './test-utils';
import userEvent from '@testing-library/user-event';

describe('OrdersPage Component', () => {
  beforeEach(() => {
    renderWithMemoryRouter(
      <OrdersPage />,
      {
        route: '/admin/orders',
        initialEntries: ['/admin/orders']
      }
    );
  });

  it('should render orders table correctly', () => {
    // Check table headers
    expect(screen.getByRole('heading', { name: 'Orders Management' })).toBeDefined();
    
    const headers = ['Order ID', 'Customer', 'Date', 'Total', 'Status', 'Actions'];
    headers.forEach(header => {
      expect(screen.getByRole('columnheader', { name: header })).toBeDefined();
    });

    // Check sample order data
    expect(screen.getByText('ORD001')).toBeDefined();
    expect(screen.getByText('John Doe')).toBeDefined();
    expect(screen.getByText('2025-10-28')).toBeDefined();
    expect(screen.getByText('$129.99')).toBeDefined();
  });

  it('should filter orders by status', async () => {
    const user = userEvent.setup();
    
    // Get the filter dropdown
    const filterSelect = screen.getByRole('combobox');
    expect(filterSelect).toBeDefined();
    
    // Change filter to pending
    await user.selectOptions(filterSelect, 'pending');
    expect(screen.getByText('pending')).toBeDefined();
    
    // Verify filter options exist
    const options = ['All Orders', 'Pending', 'Processing', 'Completed', 'Cancelled'];
    options.forEach(option => {
      expect(screen.getByRole('option', { name: option })).toBeDefined();
    });
  });

  it('should render action buttons for each order', () => {
    // Get all action buttons
    const actionButtons = screen.getAllByRole('button');
    expect(actionButtons).toHaveLength(3); // view, edit, delete

    // Check for correct icon classes
    const [viewButton, editButton, deleteButton] = actionButtons;
    expect(viewButton.querySelector('.fas.fa-eye')).toBeDefined();
    expect(editButton.querySelector('.fas.fa-edit')).toBeDefined();
    expect(deleteButton.querySelector('.fas.fa-trash')).toBeDefined();

    // Verify button classes
    expect(viewButton.className.includes('action-button')).toBe(true);
    expect(viewButton.className.includes('view')).toBe(true);
    expect(editButton.className.includes('action-button')).toBe(true);
    expect(editButton.className.includes('edit')).toBe(true);
    expect(deleteButton.className.includes('action-button')).toBe(true);
    expect(deleteButton.className.includes('delete')).toBe(true);
  });
});