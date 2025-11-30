import React, { useEffect, useState } from 'react';
import type { User } from "../../types/User.ts";

interface UserFormProps {
  initialData?: User;
  onSubmit: (user: User) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

export const UserForm: React.FC<UserFormProps> = ({ initialData, onSubmit, onCancel, isEditing = false }) => {
  const [name, setName] = useState(initialData?.name || '');
  const [email, setEmail] = useState(initialData?.email || '');
  const [password, setPassword] = useState(''); // Password not pre-filled for security
  const [role, setRole] = useState<'admin' | 'customer'>(initialData?.role || 'customer');
  const [status, setStatus] = useState<'active' | 'inactive'>(initialData?.status || 'active');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setEmail(initialData.email);
      setRole(initialData.role);
      setStatus(initialData.status);
      // Do not set password for security reasons
    } else {
      setName('');
      setEmail('');
      setPassword('');
      setRole('customer');
      setStatus('active');
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userData: Partial<User> = { // Use Partial<User> because ID, joinDate, lastLogin might be missing
      id: initialData?.id, // id is included if editing, will be undefined for new users
      name,
      email,
      role,
      status,
    };

    if (password !== '') { // Only include password if it was entered
        // For new user creation, 'password' field is expected (plain text)
        // For existing user update, password changes should ideally be a separate API call
        // For now, if editing and password is provided, we send it as 'password' field.
        // Backend should handle this appropriately (e.g., hash it)
        (userData as any).password = password; 
    }
    
    // For update, joinDate and lastLogin should not be sent
    if (!isEditing) {
      (userData as User).joinDate = new Date().toISOString();
      (userData as User).lastLogin = null;
    }
    
    onSubmit(userData as User);

    if (!isEditing) {
      // Clear form fields only when adding a new user
      setName('');
      setEmail('');
      setPassword('');
      setRole('customer');
      setStatus('active');
    }
  };

  return (
    <div className="add-form-container">
      <h2>{isEditing ? 'Edit User' : 'Add New User'}</h2>
      <form onSubmit={handleSubmit} className="add-form">
        <div className="form-group">
          <label htmlFor="userName">User Name:</label>
          <input
            type="text"
            id="userName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="userEmail">Email:</label>
          <input
            type="email"
            id="userEmail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="userPassword">Password:</label>
          <input
            type="password"
            id="userPassword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required={!isEditing} // Password is required only when adding a new user
            placeholder={isEditing ? 'Leave blank to keep current password' : ''}
          />
        </div>
        <div className="form-group">
          <label htmlFor="userRole">Role:</label>
          <select id="userRole" value={role} onChange={(e) => setRole(e.target.value as 'admin' | 'customer')}>
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="userStatus">Status:</label>
          <select id="userStatus" value={status} onChange={(e) => setStatus(e.target.value as 'active' | 'inactive')}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div className="form-actions">
          <button type="submit" className="primary-button">
            {isEditing ? 'Update User' : 'Add User'}
          </button>
          <button type="button" onClick={onCancel} className="secondary-button">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
