import { useState } from 'react';
import { SideBar } from "../../components/SideBar";
import "../../styles/admin.css";

interface SalesData {
  period: string;
  revenue: number;
  orders: number;
  averageOrder: number;
}

interface TopProduct {
  id: string;
  name: string;
  sales: number;
  revenue: number;
}

export function ReportsPage() {
  const [dateRange, setDateRange] = useState('month');
  const [salesData] = useState<SalesData[]>([
    {
      period: "October 2025",
      revenue: 15780.45,
      orders: 234,
      averageOrder: 67.44
    },
    {
      period: "September 2025",
      revenue: 14560.30,
      orders: 212,
      averageOrder: 68.68
    }
  ]);

  const [topProducts] = useState<TopProduct[]>([
    {
      id: "1",
      name: "Jazz Collection Vol. 1",
      sales: 45,
      revenue: 1349.55
    },
    {
      id: "2",
      name: "Classical Masterpieces",
      sales: 38,
      revenue: 1139.62
    }
  ]);

  return (
    <div className="admin-container">
      <SideBar />
      <main className="admin-content">
        <div className="admin-header">
          <h1>Sales Reports</h1>
          <div className="admin-actions">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="date-range-select"
            >
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="quarter">Last Quarter</option>
              <option value="year">Last Year</option>
            </select>
            <button className="primary-button">
              <i className="fas fa-download"></i> Export Report
            </button>
          </div>
        </div>

        <div className="reports-grid">
          {/* Sales Overview Cards */}
          <div className="report-card sales-overview admin-card">
            <h2>Sales Overview</h2>
            <div className="metrics-grid">
              {salesData.map((data, index) => (
                <div key={index} className="metric-card">
                  <h3>{data.period}</h3>
                  <div className="metric-stats">
                    <div className="metric-item">
                      <label>Revenue</label>
                      <span className="value">${data.revenue.toFixed(2)}</span>
                    </div>
                    <div className="metric-item">
                      <label>Orders</label>
                      <span className="value">{data.orders}</span>
                    </div>
                    <div className="metric-item">
                      <label>Avg. Order</label>
                      <span className="value">${data.averageOrder.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Products */}
          <div className="report-card top-products admin-card">
            <h2>Top Selling Products</h2>
            <div className="table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Sales</th>
                    <th>Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {topProducts.map(product => (
                    <tr key={product.id}>
                      <td>{product.name}</td>
                      <td>{product.sales} units</td>
                      <td>${product.revenue.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}