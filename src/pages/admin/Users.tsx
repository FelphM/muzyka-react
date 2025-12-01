import { useEffect, useState } from 'react';
import { UserForm } from '../../components/admin/AddUserForm';
import type { User } from '../../types/User.ts';
import { getAllUsers, createUser, updateUser, deleteUser } from '../../services/api';
import "../../styles/admin.css";

export function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showUserForm, setShowUserForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data: User[] = await getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
      // Optionally, set users to empty array or display an error message
      setUsers([]);
    }
  };

  const handleSubmitUser = async (userData: User) => {
    try {
      if (editingUser) {
        // Update existing user
        const updated = await updateUser(editingUser.id as number, userData);
        setUsers((prevUsers) =>
          prevUsers.map((u) => (u.id === updated.id ? updated : u))
        );
      } else {
        // Add new user
        const newlyAddedUser = await createUser(userData);
        setUsers((prevUsers) => [...prevUsers, newlyAddedUser]);
      }
      setShowUserForm(false);
      setEditingUser(null);
    } catch (error) {
      console.error("Error submitting user:", error);
    }
  };

  const handleCancelForm = () => {
    setShowUserForm(false);
    setEditingUser(null);
  };

  const handleEditClick = (user: User) => {
    setEditingUser(user);
    setShowUserForm(true);
  };

  const handleDeleteUser = async (userId: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(userId);
        setUsers((prevUsers) => prevUsers.filter((u) => u.id !== userId));
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  return (
    <>
          <div className="admin-header">
            <h1>User Management</h1>
            <div className="admin-actions">
              <div className="search-box">
                <i className="fas fa-search"></i>
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button
                className="primary-button"
                aria-label="Add new user"
                onClick={() => {
                  setShowUserForm(true);
                  setEditingUser(null);
                }}
              >
                <i className="fas fa-user-plus"></i> Add New User
              </button>
            </div>
          </div>

          {showUserForm && (
            <UserForm
              initialData={editingUser || undefined}
              onSubmit={handleSubmitUser}
              onCancel={handleCancelForm}
              isEditing={!!editingUser}
            />
          )}

          <div className="table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Join Date</th>
                  <th>Last Login</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users
                  .filter(user =>
                    (user.username || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                      (user.email || '').toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((user) => (
                    <tr key={user.id}>
                        <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>
                        <span className={`role-badge ${user.role}`}>
                          {user.role}
                        </span>
                      </td>
                      <td>
                        <span className={`status-badge ${user.status}`}>
                          {user.status}
                        </span>
                      </td>
                      <td>{user.joinDate}</td>
                      <td>{user.lastLogin}</td>
                      <td>
                        <div className="table-actions">
                          <button className="action-button edit" onClick={() => handleEditClick(user)}>
                            <i className="fas fa-edit"></i>
                          </button>
                          <button
                            className="action-button delete"
                            onClick={() => handleDeleteUser(user.id as number)}
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </>
  );
}