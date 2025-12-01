import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { getAllOrders } from '../../services/api';
import type { PurchaseOrder, OrderItem } from '../../types/Order';
import "../../styles/dashboard.css";

export function DashboardPage() {
  const [orders, setOrders] = useState<PurchaseOrder[]>([]);
  const [todaysSales, setTodaysSales] = useState(0);
  const [monthlySales, setMonthlySales] = useState(0);
  const [pendingOrdersCount, setPendingOrdersCount] = useState(0);
  const [popularProducts, setPopularProducts] = useState<{ id: number, name: string, sales: number }[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getAllOrders();
        setOrders(data);
        calculateStats(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  const calculateStats = (orders: PurchaseOrder[]) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const month = now.getMonth();
    
    let todayS = 0;
    let monthS = 0;
    let pending = 0;

    const productSales: { [key: string]: { id: number, name: string, sales: number } } = {};

    orders.forEach(order => {
      const orderDate = new Date(order.orderDate);
      if (orderDate >= today) {
        todayS += order.totalPrice;
      }
      if (orderDate.getMonth() === month) {
        monthS += order.totalPrice;
      }
      if (order.status === 'PENDING') {
        pending++;
      }

      order.items.forEach(item => {
        if (productSales[item.productName]) {
          productSales[item.productName].sales += item.quantity;
        } else {
          productSales[item.productName] = { id: item.productId, name: item.productName, sales: item.quantity };
        }
      });
    });

    const sortedPopularProducts = Object.values(productSales)
      .sort((a, b) => b.sales - a.sales)
      .slice(0, 5);

    setPopularProducts(sortedPopularProducts);
    setTodaysSales(todayS);
    setMonthlySales(monthS);
    setPendingOrdersCount(pending);
  };

  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime())
    .slice(0, 5);

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
                <p className="stat-value">${todaysSales.toFixed(2)}</p>
              </div>
              <div className="stat-item">
                <h3>Monthly Sales</h3>
                <p className="stat-value">${monthlySales.toFixed(2)}</p>
              </div>
              <div className="stat-item">
                <h3>Orders Pending</h3>
                <p className="stat-value">{pendingOrdersCount}</p>
              </div>
            </div>
            <Link to="/admin/reports" className="view-more">View Detailed Reports →</Link>
          </section>

          {/* Recent Orders */}
          <section className="dashboard-card recent-orders">
            <h2>Recent Orders</h2>
            <div className="orders-list">
              {recentOrders.map(order => (
                <div className="order-item" key={order.id}>
                  <div className="order-info">
                    <span className="order-id">#{order.id}</span>
                    <span className="order-user">{order.userName}</span>
                    <span className="order-date">{new Date(order.orderDate).toLocaleDateString()}</span>
                  </div>
                  <div className="order-details">
                    <span className="order-price">${order.totalPrice.toFixed(2)}</span>
                    <span className={`order-status ${order.status.toLowerCase()}`}>{order.status}</span>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/admin/orders" className="view-more">Manage Orders →</Link>
          </section>

          {/* Popular Products */}
          <section className="dashboard-card popular-products">
            <h2>Popular Products</h2>
            <div className="products-list">
              {popularProducts.map((product) => (
                <div className="product-item" key={product.id}>
                  <span className="product-name">{product.name}</span>
                  <span className="product-sales">{product.sales} sales</span>
                </div>
              ))}
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