import { useState } from 'react';
import { SideBar } from "../../components/SideBar";
import "../../styles/admin.css";

interface AdminProfile {
  name: string;
  email: string;
  role: string;
  avatar: string;
  joinDate: string;
  lastLogin: string;
}

export function AdminProfilePage() {
  const [profile] = useState<AdminProfile>({
    name: "Admin User",
    email: "admin@muzyka.com",
    role: "Administrator",
    avatar: "/images/admin-avatar.jpg",
    joinDate: "2024-12-01",
    lastLogin: "2025-10-28"
  });

  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="admin-container">
      <SideBar />
      <main className="admin-content">
        <div className="admin-header">
          <h1>Admin Profile</h1>
          <div className="admin-actions">
            <button 
              className="primary-button"
              onClick={() => setIsEditing(!isEditing)}
            >
              <i className={`fas ${isEditing ? 'fa-save' : 'fa-edit'}`}></i>
              {isEditing ? ' Save Changes' : ' Edit Profile'}
            </button>
          </div>
        </div>

        <div className="profile-container">
          <div className="profile-header">
            <div className="profile-avatar">
              <img src={profile.avatar} alt="Admin Avatar" />
              {isEditing && (
                <button className="change-avatar-button">
                  <i className="fas fa-camera"></i>
                </button>
              )}
            </div>
            <div className="profile-info">
              <h2>{profile.name}</h2>
              <span className="role-badge admin">{profile.role}</span>
            </div>
          </div>

          <div className="profile-details">
            <div className="detail-group">
              <label>Full Name</label>
              {isEditing ? (
                <input type="text" defaultValue={profile.name} />
              ) : (
                <p>{profile.name}</p>
              )}
            </div>

            <div className="detail-group">
              <label>Email</label>
              {isEditing ? (
                <input type="email" defaultValue={profile.email} />
              ) : (
                <p>{profile.email}</p>
              )}
            </div>

            <div className="detail-group">
              <label>Join Date</label>
              <p>{profile.joinDate}</p>
            </div>

            <div className="detail-group">
              <label>Last Login</label>
              <p>{profile.lastLogin}</p>
            </div>
          </div>

          <div className="security-section">
            <h3>Security Settings</h3>
            <button className="secondary-button">
              <i className="fas fa-key"></i> Change Password
            </button>
            <button className="secondary-button">
              <i className="fas fa-shield-alt"></i> Two-Factor Authentication
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}