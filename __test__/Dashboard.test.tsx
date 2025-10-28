import { describe, it, expect, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import { DashboardPage } from '../src/pages/admin/Dashboard';
import { renderWithMemoryRouter } from './test-utils';

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

  it('should display correct sales metrics', () => {
    // Check for sales statistics
    expect(screen.getByText('$1,234.56')).toBeDefined();
    expect(screen.getByText('$45,678.90')).toBeDefined();
    expect(screen.getByText('23')).toBeDefined();

    // Check for metric labels
    expect(screen.getByText('Today\'s Sales')).toBeDefined();
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

  it('should display recent orders', () => {
    // Check for order items
    expect(screen.getByText('#12345')).toBeDefined();
    expect(screen.getByText('#12344')).toBeDefined();
    expect(screen.getAllByText('28 Oct 2025')).toHaveLength(2);
    expect(screen.getByText('Pending')).toBeDefined();
    expect(screen.getByText('Completed')).toBeDefined();
  });

  it('should display popular products', () => {
    // Check for product items
    expect(screen.getByText('Jazz Collection Vol. 1')).toBeDefined();
    expect(screen.getByText('Classic Rock Anthology')).toBeDefined();
    expect(screen.getByText('243 sales')).toBeDefined();
    expect(screen.getByText('198 sales')).toBeDefined();
  });
});