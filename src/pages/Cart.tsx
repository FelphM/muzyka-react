import { useState } from "react";
import { Header } from "../components/Header";
import "../styles/cart.css";
import type { Product } from "../types/Product";
import { Footer } from "../components/Footer";

interface CartItem extends Product {
  quantity: number;
}

export function CartPage() {
  const [cartItems] = useState<CartItem[]>([
    {
      id: "3",
      artist: "Rock Legends",
      name: "Greatest Hits Collection",
      image: {
        src: "https://tocadiscos.cl/wp-content/uploads/2024/02/queenecdgh.webp",
        alt: "Greatest Hits Collection",
      },
      price: 24.99,
      format: "Compact Disc",
      description: "A collection of timeless rock classics",
      link: "/products/greatest-hits",
      slug: "greatest-hits",
      quantity: 1,
    },
  ]);

  const [formData, setFormData] = useState({
    cardNumber: "",
    cardHolder: "",
    expirationDate: "",
    cvv: "",
    address: "",
    city: "",
    zipCode: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle payment submission
    console.log("Processing payment:", formData);
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      <Header />
      <div className="fullContent">
        <div className="cart-container">
          <div className="cart-items">
            <h2>Shopping Cart</h2>
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img
                  src={item.image.src}
                  alt={item.image.alt}
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>Artist: {item.artist}</p>
                  <p>Format: {item.format}</p>
                  <p>Price: ${item.price}</p>
                  <div className="quantity">Quantity: {item.quantity}</div>
                </div>
              </div>
            ))}
            <div className="cart-total">
              <h3>Total: ${total.toFixed(2)}</h3>
            </div>
          </div>

          <div className="payment-form">
            <h2>Payment Information</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="cardNumber">Card Number</label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="cardHolder">Card Holder Name</label>
                <input
                  type="text"
                  id="cardHolder"
                  name="cardHolder"
                  value={formData.cardHolder}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="expirationDate">Expiration Date</label>
                  <input
                    type="text"
                    id="expirationDate"
                    name="expirationDate"
                    placeholder="MM/YY"
                    value={formData.expirationDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="cvv">CVV</label>
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="address">Shipping Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="zipCode">ZIP Code</label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="submit-button">
                Process Payment
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}
