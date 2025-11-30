import React from 'react';
import { useCart } from '../context/CartContext';
import '../styles/cart.css';
import { Link } from 'react-router-dom';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    // TODO: This is where you would initiate the checkout process.
    // This could involve:
    // 1. Validating the user is logged in.
    // 2. Sending the cart data to the Spring Boot backend to create an order.
    //    Example: api.post('/orders', { cartItems: cart });
    // 3. Redirecting to a payment gateway or a success page.
    alert('Proceeding to checkout is not implemented yet.');
    // After successful checkout, you might want to clear the cart.
    // clearCart();
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
