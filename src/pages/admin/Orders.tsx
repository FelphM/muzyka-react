import { useState } from 'react';
import "../../styles/admin.css";

interface Order {
  id: string;
  customerName: string;
  date: string;
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
  }>;
}

export function OrdersPage() {
  const [orders] = useState<Order[]>([
    {
      id: "ORD001",
      customerName: "John Doe",
      date: "2025-10-28",
      total: 129.99,
      status: "pending",
      items: [
        { id: "1", name: "Jazz Collection Vol. 1", quantity: 1, price: 29.99 },
        { id: "2", name: "Classic Rock Anthology", quantity: 2, price: 49.99 }
      ]
    },
    // Add more sample orders as needed
  ]);

  const [filterStatus, setFilterStatus] = useState<string>('all');

  return (
    <>
          <div className="admin-header">
            <h1>Orders Management</h1>
            <div className="admin-actions">
              <select 
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Orders</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div className="table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders
                  .filter(order => filterStatus === 'all' || order.status === filterStatus)
                  .map(order => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.customerName}</td>
                      <td>{order.date}</td>
                      <td>${order.total.toFixed(2)}</td>
                      <td>
                        <span className={`status-badge ${order.status}`}>
                          {order.status}
                        </span>
                      </td>
                      <td>
                        <div className="table-actions">
                          <button className="action-button view">
                            <i className="fas fa-eye"></i>
                          </button>
                          <button className="action-button edit">
                            <i className="fas fa-edit"></i>
                          </button>
                          <button className="action-button delete">
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