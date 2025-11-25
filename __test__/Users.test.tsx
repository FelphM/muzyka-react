import { screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import { UsersPage } from '../src/pages/admin/Users';
import { renderWithRouter } from './test-utils';

describe('UsersPage Component', () => {
  it('should render users table correctly', () => {
    renderWithRouter(<UsersPage />);
    
    expect(screen.getByRole('heading', { name: 'User Management' })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search users...')).toBeInTheDocument();
    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Name' })).toBeInTheDocument();
  });

  describe('search functionality', () => {
    it('should filter users by name', () => {
      renderWithRouter(<UsersPage />);
      
      const searchInput = screen.getByPlaceholderText('Search users...');
      fireEvent.change(searchInput, { target: { value: 'John' } });
      
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.queryByText('Admin User')).not.toBeInTheDocument();
    });

    it('should filter users by email', () => {
      renderWithRouter(<UsersPage />);
      
      const searchInput = screen.getByPlaceholderText('Search users...');
      fireEvent.change(searchInput, { target: { value: 'admin@muzyka' } });
      
      expect(screen.getByText('Admin User')).toBeInTheDocument();
      expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
    });

    it('should be case insensitive', () => {
      renderWithRouter(<UsersPage />);
      
      const searchInput = screen.getByPlaceholderText('Search users...');
      
      // Test uppercase search
      fireEvent.change(searchInput, { target: { value: 'JOHN' } });
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      
      // Test mixed case search
      fireEvent.change(searchInput, { target: { value: 'AdMiN' } });
      expect(screen.getByText('Admin User')).toBeInTheDocument();
    });

    it('should show no results for non-matching search', () => {
      renderWithRouter(<UsersPage />);
      
      const searchInput = screen.getByPlaceholderText('Search users...');
      fireEvent.change(searchInput, { target: { value: 'nonexistent' } });
      
      expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
      expect(screen.queryByText('Admin User')).not.toBeInTheDocument();
    });
  });

  it('should display correct user roles and status', () => {
    renderWithRouter(<UsersPage />);
    
    const adminBadge = screen.getByText('admin');
    const customerBadge = screen.getByText('customer');
    const activeBadges = screen.getAllByText('active');

    expect(adminBadge).toBeInTheDocument();
    expect(adminBadge).toHaveClass('role-badge', 'admin');
    expect(customerBadge).toBeInTheDocument();
    expect(customerBadge).toHaveClass('role-badge', 'customer');
    expect(activeBadges[0]).toBeInTheDocument();
    expect(activeBadges[0]).toHaveClass('status-badge', 'active');
  });

  it('should render action buttons for each user', () => {
    renderWithRouter(<UsersPage />);
    
    // Get all action buttons
    const viewButton = screen.getAllByLabelText('View user');
    const editButton = screen.getAllByLabelText('Edit user');
    const deleteButton = screen.getAllByLabelText('Delete user');

    // Verify we have the right number of buttons (one set per user)
    expect(viewButton).toHaveLength(2);
    expect(editButton).toHaveLength(2);
    expect(deleteButton).toHaveLength(2);

    // Check the first user's action buttons
    expect(viewButton[0]).toHaveClass('action-button', 'view');
    expect(editButton[0]).toHaveClass('action-button', 'edit');
    expect(deleteButton[0]).toHaveClass('action-button', 'delete');
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
      expect(screen.getByText('admin')).toBeInTheDocument();
      expect(screen.getByText('inactive')).toBeInTheDocument();
    });
  });
});