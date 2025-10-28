import { render, fireEvent } from '@testing-library/react';
import { ReportsPage } from '../src/pages/admin/Reports';

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

  it('should display correct sales metrics', () => {
    const { getByText } = render(<ReportsPage />);
    
    expect(getByText('Revenue')).toBeInTheDocument();
    expect(getByText('Orders')).toBeInTheDocument();
    expect(getByText('Avg. Order')).toBeInTheDocument();
  });

  it('should handle export functionality', () => {
    const { getByText } = render(<ReportsPage />);
    
    const exportButton = getByText('Export Report');
    fireEvent.click(exportButton);
    // Add export handling expectations
  });
});