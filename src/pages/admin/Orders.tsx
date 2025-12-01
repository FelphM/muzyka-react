import { useEffect, useState } from 'react';
import { getAllOrders, updateOrderStatus } from '../../services/api';
import type { PurchaseOrder } from '../../types/Order';
import "../../styles/admin.css";

export function OrdersPage() {
  const [orders, setOrders] = useState<PurchaseOrder[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getAllOrders();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId: number, newStatus: 'PENDING' | 'COMPLETED' | 'CANCELLED') => {
    if (window.confirm(`Are you sure you want to mark order #${orderId} as ${newStatus}?`)) {
      try {
        const updatedOrder = await updateOrderStatus(orderId, newStatus);
        setOrders(prevOrders =>
          prevOrders.map(o => (o.id === updatedOrder.id ? updatedOrder : o))
        );
        alert(`Order #${orderId} has been marked as ${newStatus}.`);
      } catch (error) {
        console.error(`Error updating order status for order #${orderId}:`, error);
        alert('Failed to update order status.');
      }
    }
  };

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
            <option value="PENDING">Pending</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
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
                  <td>#{order.id}</td>
                  <td>{order.userName}</td>
                  <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                  <td>${order.totalPrice.toFixed(2)}</td>
                  <td>
                    <span className={`status-badge ${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <div className="table-actions">
                      {order.status === 'PENDING' && (
                        <button 
                          className="action-button complete"
                          onClick={() => handleStatusChange(order.id, 'COMPLETED')}
                        >
                          Mark as Completed
                        </button>
                      )}
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