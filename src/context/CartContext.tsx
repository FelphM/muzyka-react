import { createContext, useState, useContext } from 'react';
import type { ReactNode } from 'react';
import type { Product } from '../types/Product';

// Define the shape of a cart item, extending Product with quantity
export interface CartItem extends Product {
  quantity: number;
}

// Define the shape of the context
interface ICartContext {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
}

// Create the context with a default undefined value
const CartContext = createContext<ICartContext | undefined>(undefined);

// Create a custom hook for easy access to the context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Define the props for the provider
interface CartProviderProps {
  children: ReactNode;
}

// Create the CartProvider component
export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Function to add a product to the cart
  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        if (existingItem.quantity < product.stock) {
          return prevCart.map(item =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          );
        } else {
          alert(`You cannot add more of ${product.name}. Stock limit reached.`);
          return prevCart;
        }
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Function to remove a product from the cart
  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
    // TODO: Also call your backend to remove the item from the persistent cart.
    // Example: api.delete(`/cart/remove/${productId}`);
  };

  // Function to update the quantity of a product
  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
      // TODO: Call backend to update quantity.
      // Example: api.put('/cart/update', { productId, quantity });
    }
  };

  // Function to clear the cart
  const clearCart = () => {
    setCart([]);
    // TODO: Call backend to clear the entire cart.
    // Example: api.post('/cart/clear');
  };
    
  // Calculate total number of items in the cart
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    itemCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
