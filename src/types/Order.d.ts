export interface OrderItem {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  price: number;
  image?: string;
}

export interface PurchaseOrder {
  id: number;
  userName: string;
  orderDate: string; // ISO date string
  totalPrice: number;
  status: 'PENDING' | 'COMPLETED' | 'CANCELLED';
  items: OrderItem[];
}

