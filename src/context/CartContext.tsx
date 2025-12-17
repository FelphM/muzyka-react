import { createContext, useState, useContext } from 'react';
import type { ReactNode } from 'react';
import type { Product } from '../types/Product';


export interface CartItem extends Product {
  quantity: number;
}


interface ICartContext {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
}


const CartContext = createContext<ICartContext | undefined>(undefined);


export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};


interface CartProviderProps {
  children: ReactNode;
}


export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  
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

  
  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));   
  };

  
  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(prevCart => {
        const itemToUpdate = prevCart.find(item => item.id === productId);

        if (itemToUpdate && quantity > itemToUpdate.stock) {
          alert(`You cannot set quantity for ${itemToUpdate.name} higher than the stock limit (${itemToUpdate.stock}).`);
          return prevCart.map(item =>
            item.id === productId ? { ...item, quantity: itemToUpdate.stock } : item
          );
        }

        
        return prevCart.map(item =>
          item.id === productId ? { ...item, quantity } : item
        );
      });
    }
  };

  const clearCart = () => {
    setCart([]);
  };
    
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
