import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AdminProfilePage } from '../src/pages/admin/Profile';

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
    
    expect(screen.getByText('Admin Profile')).toBeInTheDocument();
    expect(screen.getByText('Admin User')).toBeInTheDocument();
    expect(screen.getByAltText('Admin Avatar')).toBeInTheDocument();
  });

  it('should toggle edit mode', async () => {
    renderWithRouter();
    
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    
    const editButton = screen.getByText('Edit Profile');
    await fireEvent.click(editButton);
    
    expect(screen.queryByRole('textbox')).toBeInTheDocument();
  });

  it('should handle profile updates', async () => {
    renderWithRouter();
    
    // Enable edit mode
    await fireEvent.click(screen.getByText('Edit Profile'));
    
    // Update profile information
    await fireEvent.change(screen.getByLabelText('Full Name'), {
      target: { value: 'Updated Name' }
    });
    
    // Save changes
    await fireEvent.click(screen.getByText('Save Changes'));
    
    // Verify the update
    expect(screen.getByDisplayValue('Updated Name')).toBeInTheDocument();
  });

  it('should handle security options', async () => {
    renderWithRouter();
    
    expect(screen.getByText('Change Password')).toBeInTheDocument();
    expect(screen.getByText('Two-Factor Authentication')).toBeInTheDocument();
    
    await fireEvent.click(screen.getByText('Change Password'));
    // Verify the dialog appears
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});