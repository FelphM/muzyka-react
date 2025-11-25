import { Outlet } from 'react-router-dom';
import { SideBar } from '../components/SideBar';
import '../styles/admin.css';

export function AdminLayout() {
  return (
    <div className="admin-container">
      <SideBar />
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
}
