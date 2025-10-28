import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AdminProfilePage } from '../src/pages/admin/Profile';
import userEvent from '@testing-library/user-event';

describe('AdminProfilePage Component', () => {
  const renderWithRouter = () => {
    return render(
      <BrowserRouter>
        <AdminProfilePage />
      </BrowserRouter>
    );
  };

  it('should render profile information correctly', () => {
    renderWithRouter();
    
    expect(screen.getByRole('heading', { name: 'Admin Profile' })).toBeDefined();
    expect(screen.getByRole('heading', { name: 'Admin User' })).toBeDefined();
    expect(screen.getByAltText('Admin Avatar')).toBeDefined();
    
    // Check for static information
    expect(screen.getByText('Administrator')).toBeDefined();
    expect(screen.getByText('2024-12-01')).toBeDefined();
    expect(screen.getByText('2025-10-28')).toBeDefined();
  });

  it('should toggle edit mode and display input fields', async () => {
    renderWithRouter();
    
    // Initially should show text, not input fields
    expect(screen.queryByDisplayValue('Admin User')).toBeNull();
    
    // Click edit button
    const editButton = screen.getByRole('button', { name: /edit profile/i });
    await userEvent.click(editButton);
    
    // Should now show input fields
    expect(screen.getByDisplayValue('Admin User')).toBeDefined();
    expect(screen.getByDisplayValue('admin@muzyka.com')).toBeDefined();
  });

  it('should handle profile information display', async () => {
    renderWithRouter();
    
    // Check initial display
    const nameLabel = screen.getByText('Full Name');
    const emailLabel = screen.getByText('Email');
    
    expect(nameLabel.parentElement?.textContent).toContain('Admin User');
    expect(emailLabel.parentElement?.textContent).toContain('admin@muzyka.com');
  });

  it('should handle security options display', async () => {
    renderWithRouter();
    
    // Check for security buttons
    expect(screen.getByRole('button', { name: /change password/i })).toBeDefined();
    expect(screen.getByRole('button', { name: /two-factor authentication/i })).toBeDefined();
    
    // Security section heading should be present
    expect(screen.getByRole('heading', { name: 'Security Settings' })).toBeDefined();
  });
});