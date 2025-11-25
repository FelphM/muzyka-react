import React, { useEffect, useState } from 'react';
import type { User } from "../../types/User.ts";

interface UserFormProps {
  initialData?: User;
  onSubmit: (user: Omit<User, 'joinDate' | 'lastLogin'>) => void;
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
    const userData: Omit<User, 'joinDate' | 'lastLogin'> = {
      id: initialData?.id || '', // id is included if editing
      name,
      email,
      // For editing, if password is not changed, it remains empty and should ideally not update the backend password.
      // For adding, a new password would be sent.
      // In this mock, we just pass the current state of the password field.
      // In a real app, you'd handle password updates carefully.
      role,
      status,
    };
    onSubmit(userData);

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
