import { useEffect, useState } from "react";
import "../styles/purchases.css";
import { useAuth } from "../context/AuthContext";
import { getOrdersByUserId } from "../services/api";

// Define DTO types to match backend PurchaseOrderDto
interface OrderItemDto {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  price: number; // Assuming this is item price at time of purchase
}

interface PurchaseOrderDto {
  id: number;
  orderDate: string;
  totalPrice: number;
  status: string; // e.g., "PENDING", "COMPLETED", "SHIPPED"
  userName: string;
  items: OrderItemDto[];
}

export function PurchasesPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<PurchaseOrderDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user?.id) {
      setLoading(true);
      getOrdersByUserId(user.id)
        .then((data: PurchaseOrderDto[]) => {
          setOrders(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch orders:", err);
          setError("Failed to load your purchase history.");
          setLoading(false);
        });
    } else if (!user) {
      // Not logged in, or user object doesn't have an ID
      setLoading(false);
      setError("Please log in to view your purchases.");
    }
  }, [user]);

  if (loading) {
    return (
      <main className="centerContent">
        <h2>My Purchases</h2>
        <p>Loading purchases...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="centerContent">
        <h2>My Purchases</h2>
        <p className="error-message">{error}</p>
      </main>
    );
  }

  return (
    <main className="centerContent">
      <h2>My Purchases</h2>
      {orders.length === 0 ? (
        <p>You have no purchase history.</p>
      ) : (
        <div className="purchases-list">
          {orders.map((order) => (
            <div key={order.id} className="purchase-order-card">
              <h3>Order ID: {order.id}</h3>
              <p>Date: {new Date(order.orderDate).toLocaleDateString()}</p>
              <p>Total: ${order.totalPrice.toFixed(2)}</p>
              <p>Status: {order.status}</p>
              <div className="order-items">
                <h4>Items:</h4>
                {order.items.map((item) => (
                  <div key={item.id} className="order-item-detail">
                    <p>{item.productName} x {item.quantity} (${item.price.toFixed(2)} each)</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
