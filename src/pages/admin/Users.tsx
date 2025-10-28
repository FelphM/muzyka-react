import { useState } from 'react';
import { SideBar } from "../../components/SideBar";
import "../../styles/admin.css";

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'customer';
  status: 'active' | 'inactive';
  joinDate: string;
  lastLogin: string;
}

export function UsersPage() {
  const [users] = useState<User[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "customer",
      status: "active",
      joinDate: "2025-01-15",
      lastLogin: "2025-10-28"
    },
    {
      id: "2",
      name: "Admin User",
      email: "admin@muzyka.com",
      role: "admin",
      status: "active",
      joinDate: "2024-12-01",
      lastLogin: "2025-10-28"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="admin-container">
      <SideBar />
      <main className="admin-content">
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
            <button className="primary-button" aria-label="Add new user">
              <i className="fas fa-user-plus"></i> Add New User
            </button>
          </div>
        </div>

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
                  user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  user.email.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map(user => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
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
                        <button className="action-button view" aria-label="View user">
                          <i className="fas fa-eye"></i>
                        </button>
                        <button className="action-button edit" aria-label="Edit user">
                          <i className="fas fa-edit"></i>
                        </button>
                        <button className="action-button delete" aria-label="Delete user">
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}