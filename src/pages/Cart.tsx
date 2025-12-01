import React from 'react';
import { useCart } from '../context/CartContext';
import '../styles/cart.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { createOrder } from '../services/api';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    if (!user) {
      alert('Please log in to proceed to checkout.');
      navigate('/login');
      return;
    }
    if (cart.length === 0) {
      alert('Your cart is empty.');
      return;
    }

    const orderData = {
      userId: user.id,
      items: cart.map(item => ({
        productId: item.id,
        quantity: item.quantity,
      })),
    };

    try {
      await createOrder(orderData);
      alert('Order placed successfully!');
      clearCart();
      navigate('/profile'); // Redirect to a profile or orders page
    } catch (error) {
      console.error('Failed to create order:', error);
      alert('There was an error placing your order. Please try again.');
    }
  };

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>
      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty.</p>
          <Link to="/" className="shop-link">Continue Shopping</Link>
        </div>
      ) : (
        <>
          <div className="cart-header">
            <button onClick={clearCart} className="clear-cart-btn">Clear Cart</button>
          </div>
          <div className="cart-items">
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.imageUrl} alt={item.imageAlt} className="cart-item-image" />
                <div className="cart-item-details">
                  <div className="cart-item-info">
                    <p className="item-name">{item.name}</p>
                    <p className="item-artist">by {item.artist}</p>
                    <p className="item-format">Format: {item.format}</p>
                    <p className="item-price">Price: ${item.price.toFixed(2)}</p>
                  </div>
                  <div className="quantity-controls">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                    <span>Quantity: {item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="remove-item">Remove</button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h2>Summary</h2>
            <p>Subtotal: <span>${subtotal.toFixed(2)}</span></p>
            <button onClick={handleCheckout} className="checkout-btn">Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
