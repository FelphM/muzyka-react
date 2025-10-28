import { render, fireEvent } from '@testing-library/react';
import { UsersPage } from '../src/pages/admin/Users';

describe('UsersPage Component', () => {
  it('should render users table correctly', () => {
    const { getByText, getByPlaceholderText } = render(<UsersPage />);
    
    expect(getByText('User Management')).toBeInTheDocument();
    expect(getByPlaceholderText('Search users...')).toBeInTheDocument();
  });

  it('should filter users by search term', () => {
    const { getByPlaceholderText, queryByText } = render(<UsersPage />);
    
    const searchInput = getByPlaceholderText('Search users...');
    fireEvent.change(searchInput, { target: { value: 'John' } });
    
    expect(queryByText('John Doe')).toBeInTheDocument();
    expect(queryByText('Admin User')).not.toBeInTheDocument();
  });

  it('should display correct user roles and status', () => {
    const { getAllByText } = render(<UsersPage />);
    
    expect(getAllByText('admin')[0]).toBeInTheDocument();
    expect(getAllByText('customer')[0]).toBeInTheDocument();
    expect(getAllByText('active')[0]).toBeInTheDocument();
  });
});