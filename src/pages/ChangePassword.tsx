import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { changePassword } from '../services/api'; // Assuming this API function will be created
import '../styles/forms.css'; // Reusing existing form styles

export function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth(); // To get user details, if needed by the API

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (newPassword !== confirmNewPassword) {
      setError('New password and confirmation do not match.');
      return;
    }

    if (!user?.email) {
      setError('User not logged in or email not found.');
      return;
    }

    try {
      // Call the API to change password
      await changePassword(user.email, currentPassword, newPassword);
      setSuccess('Password changed successfully!');
      // Optionally, navigate back to profile or home after a delay
      setTimeout(() => {
        navigate('/profile');
      }, 2000);
    } catch (err) {
      console.error('Password change failed:', err);
      setError('Failed to change password. Please check your current password.');
    }
  };

  return (
    <main className="centerContent">
      <section>
        <h2>🔑 Change Password</h2>
        <form onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}

          <label>
            Current Password
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </label>

          <label>
            New Password
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </label>

          <label>
            Confirm New Password
            <input
              type="password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              required
            />
          </label>

          <button type="submit">Change Password</button>
          <button type="button" onClick={() => navigate('/profile')}>Cancel</button>
        </form>
      </section>
    </main>
  );
}
