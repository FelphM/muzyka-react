import { screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import { UsersPage } from '../src/pages/admin/Users';
import { renderWithRouter } from './test-utils';

const mockUsers = [
  { id: 1, username: 'John Doe', email: 'john@example.com', role: 'customer', status: 'active', joinDate: '2025-01-01', lastLogin: '2025-12-01' },
  { id: 2, username: 'Admin User', email: 'admin@muzyka', role: 'admin', status: 'active', joinDate: '2024-05-02', lastLogin: '2025-12-10' }
];

vi.mock('../src/services/api', () => ({
  getAllUsers: async () => mockUsers,
  createUser: async (userData: any) => ({ id: 3, ...userData }),
  updateUser: async (id: number, userData: any) => ({ id, ...userData }),
  deleteUser: async (id: number) => 200
}));

describe('UsersPage Component', () => {
  it('should render users table correctly', () => {
    renderWithRouter(<UsersPage />);
    
    expect(screen.getByRole('heading', { name: 'User Management' })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search users...')).toBeInTheDocument();
    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Name' })).toBeInTheDocument();
  });

  describe('search functionality', () => {
    it('should filter users by name', async () => {
      renderWithRouter(<UsersPage />);
      
      const searchInput = screen.getByPlaceholderText('Search users...');
      fireEvent.change(searchInput, { target: { value: 'John' } });
    
      expect(await screen.findByText('John Doe')).toBeInTheDocument();
      expect(screen.queryByText('Admin User')).not.toBeInTheDocument();
    });

    it('should filter users by email', async () => {
      renderWithRouter(<UsersPage />);
      
      const searchInput = screen.getByPlaceholderText('Search users...');
      fireEvent.change(searchInput, { target: { value: 'admin@muzyka' } });
    
      expect(await screen.findByText('Admin User')).toBeInTheDocument();
      expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
    });

    it('should be case insensitive', async () => {
      renderWithRouter(<UsersPage />);
      
      const searchInput = screen.getByPlaceholderText('Search users...');
      
      // Test uppercase search
      fireEvent.change(searchInput, { target: { value: 'JOHN' } });
      expect(await screen.findByText('John Doe')).toBeInTheDocument();
      
      // Test mixed case search
      fireEvent.change(searchInput, { target: { value: 'AdMiN' } });
      expect(await screen.findByText('Admin User')).toBeInTheDocument();
    });

    it('should show no results for non-matching search', () => {
      renderWithRouter(<UsersPage />);
      
      const searchInput = screen.getByPlaceholderText('Search users...');
      fireEvent.change(searchInput, { target: { value: 'nonexistent' } });
      
      expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
      expect(screen.queryByText('Admin User')).not.toBeInTheDocument();
    });
  });

  it('should display correct user roles and status', async () => {
    renderWithRouter(<UsersPage />);
    
    const adminBadges = await screen.findAllByText('admin');
    const customerBadge = await screen.findByText('customer');
    const activeBadges = await screen.findAllByText('active');

    expect(adminBadges.length).toBeGreaterThan(0);
    expect(customerBadge).toBeInTheDocument();
    expect(activeBadges.length).toBeGreaterThan(0);
  });

  it('should render action buttons for each user', async () => {
    renderWithRouter(<UsersPage />);
    
    // Verify Add New User button exists
    const addButton = screen.getByRole('button', { name: /add new user/i });
    expect(addButton).toBeDefined();

    // Wait for users to load then check that action buttons exist (edit/delete)
    await screen.findByText('John Doe');
    const actionButtons = document.querySelectorAll('.action-button');
    expect(actionButtons.length).toBeGreaterThanOrEqual(2);
  });

  describe('Add New User functionality', () => {
    it('should render Add New User button and show/hide form', async () => {
      renderWithRouter(<UsersPage />);
      
      const addButton = screen.getByRole('button', { name: /add new user/i });
      expect(addButton).toBeInTheDocument();
      
      // Form should not be visible initially
      expect(screen.queryByRole('heading', { name: 'Add New User' })).not.toBeInTheDocument();

      // Click Add button to show form
      fireEvent.click(addButton);
      expect(screen.getByRole('heading', { name: 'Add New User' })).toBeInTheDocument();

      // Click Cancel button to hide form
      const cancelButton = screen.getByRole('button', { name: 'Cancel' });
      fireEvent.click(cancelButton);
      await waitFor(() => {
        expect(screen.queryByRole('heading', { name: 'Add New User' })).not.toBeInTheDocument();
      });
    });

    it('should add a new user to the table upon form submission', async () => {
      renderWithRouter(<UsersPage />);
      
      const addButton = screen.getByRole('button', { name: /add new user/i });
      fireEvent.click(addButton);

      // Fill out the form
      fireEvent.change(screen.getByLabelText('User Name:'), { target: { value: 'Jane Doe' } });
      fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'jane.doe@example.com' } });
      fireEvent.change(screen.getByLabelText('Password:'), { target: { value: 'password123' } });
      fireEvent.change(screen.getByLabelText('Role:'), { target: { value: 'admin' } });
      fireEvent.change(screen.getByLabelText('Status:'), { target: { value: 'inactive' } });

      // Submit the form
      fireEvent.click(screen.getByRole('button', { name: 'Add User' }));

      // Form should be hidden after submission
      await waitFor(() => {
        expect(screen.queryByRole('heading', { name: 'Add New User' })).not.toBeInTheDocument();
      });

      // New user should appear in the table
      expect(screen.getByText('Jane Doe')).toBeInTheDocument();
      expect(screen.getByText('jane.doe@example.com')).toBeInTheDocument();
      expect(screen.getByText('inactive')).toBeInTheDocument();
    });
  });
});