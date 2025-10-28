import { render } from '@testing-library/react';
import { DashboardPage } from '../src/pages/admin/Dashboard';

describe('DashboardPage Component', () => {
  it('should render all dashboard sections', () => {
    const { getByText, getAllByText } = render(<DashboardPage />);
    
    // Check for main sections
    expect(getByText('Sales Overview')).toBeInTheDocument();
    expect(getByText('Recent Orders')).toBeInTheDocument();
    expect(getByText('Popular Products')).toBeInTheDocument();
    expect(getByText('User Activity')).toBeInTheDocument();
    expect(getByText('Quick Actions')).toBeInTheDocument();
  });

  it('should display correct sales metrics', () => {
    const { getByText } = render(<DashboardPage />);
    
    expect(getByText('Today\'s Sales')).toBeInTheDocument();
    expect(getByText('Monthly Sales')).toBeInTheDocument();
    expect(getByText('Orders Pending')).toBeInTheDocument();
  });

  it('should handle quick action buttons', () => {
    const { getByText } = render(<DashboardPage />);
    
    expect(getByText('Add New Product')).toBeInTheDocument();
    expect(getByText('Add Category')).toBeInTheDocument();
    expect(getByText('View Pending Orders')).toBeInTheDocument();
    expect(getByText('Generate Report')).toBeInTheDocument();
  });
});