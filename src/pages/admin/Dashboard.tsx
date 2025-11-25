import { Link } from "react-router-dom";
import "../../styles/dashboard.css";

export function DashboardPage() {
  return (
    <>
        <h1>Admin Dashboard</h1>
        
        <div className="dashboard-grid">
          {/* Sales Overview */}
          <section className="dashboard-card sales-overview">
            <h2>Sales Overview</h2>
            <div className="stats-grid">
              <div className="stat-item">
                <h3>Today's Sales</h3>
                <p className="stat-value">$1,234.56</p>
              </div>
              <div className="stat-item">
                <h3>Monthly Sales</h3>
                <p className="stat-value">$45,678.90</p>
              </div>
              <div className="stat-item">
                <h3>Orders Pending</h3>
                <p className="stat-value">23</p>
              </div>
            </div>
            <Link to="/admin/reports" className="view-more">View Detailed Reports →</Link>
          </section>

          {/* Recent Orders */}
          <section className="dashboard-card recent-orders">
            <h2>Recent Orders</h2>
            <div className="orders-list">
              <div className="order-item">
                <span className="order-id">#12345</span>
                <span className="order-date">28 Oct 2025</span>
                <span className="order-status pending">Pending</span>
              </div>
              <div className="order-item">
                <span className="order-id">#12344</span>
                <span className="order-date">28 Oct 2025</span>
                <span className="order-status completed">Completed</span>
                </div>
            </div>
            <Link to="/admin/orders" className="view-more">Manage Orders →</Link>
          </section>

          {/* Popular Products */}
          <section className="dashboard-card popular-products">
            <h2>Popular Products</h2>
            <div className="products-list">
              <div className="product-item">
                <span className="product-name">Jazz Collection Vol. 1</span>
                <span className="product-sales">243 sales</span>
              </div>
              <div className="product-item">
                <span className="product-name">Classic Rock Anthology</span>
                <span className="product-sales">198 sales</span>
              </div>
            </div>
            <Link to="/admin/products" className="view-more">View All Products →</Link>
          </section>

          {/* User Activity */}
          <section className="dashboard-card user-activity">
            <h2>User Activity</h2>
            <div className="activity-list">
              <div className="activity-item">
                <span className="activity-type">New Registrations</span>
                <span className="activity-value">15 today</span>
              </div>
              <div className="activity-item">
                <span className="activity-type">Active Users</span>
                <span className="activity-value">1,234</span>
              </div>
            </div>
            <Link to="/admin/users" className="view-more">View User Management →</Link>
          </section>

          {/* Quick Actions */}
          <section className="dashboard-card quick-actions">
            <h2>Quick Actions</h2>
            <div className="actions-grid">
              <Link to="/admin/products" className="action-button">
                <i className="fas fa-plus"></i>
                Add New Product
              </Link>
              <Link to="/admin/categories" className="action-button">
                <i className="fas fa-folder-plus"></i>
                Add Category
              </Link>
              <Link to="/admin/orders" className="action-button">
                <i className="fas fa-clock"></i>
                View Pending Orders
              </Link>
              <Link to="/admin/reports" className="action-button">
                <i className="fas fa-file-export"></i>
                Generate Report
              </Link>
            </div>
          </section>
        </div>
    </>
  );
}