import { Link } from "react-router-dom";
import "../styles/sidebar.css";

export function SideBar() {
  return (
    <>
      <ul className="sidebar-menu"> 
        <li>
          <Link to="/admin/dashboard">
            <i className="fas fa-chart-line"></i>
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/admin/orders">
            <i className="fas fa-shopping-cart"></i>
            Orders Management
          </Link>
        </li>
        <li>
          <Link to="/admin/products">
            <i className="fas fa-compact-disc"></i>
            Products Catalog
          </Link>
        </li>
        <li>
          <Link to="/admin/categories">
            <i className="fas fa-tags"></i>
            Categories
          </Link>
        </li>
        <li>
          <Link to="/admin/users">
            <i className="fas fa-users"></i>
            User Management
          </Link>
        </li>
        <li>
          <Link to="/admin/reports">
            <i className="fas fa-chart-bar"></i>
            Sales Reports
          </Link>
        </li>
        <li>
          <Link to="/admin/profile">
            <i className="fas fa-user-cog"></i>
            Admin Profile
          </Link>
        </li>
        <li className="sidebar-divider"></li>
        <li>
          <Link to="/" className="exit-link">
            <i className="fas fa-sign-out-alt"></i>
            Exit Admin Panel
          </Link>
        </li>
      </ul>
    </>
  );
}