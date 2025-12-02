import CartIconUrl from '../assets/cart-shopping-svgrepo-com.svg';
import { Link } from "react-router-dom";
import "../styles/header.css";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { itemCount } = useCart();

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = window.scrollY ? `-${window.scrollY}px` : '0';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="nav-container">
      <button className="hamburger-btn" onClick={toggleMenu} aria-label="Toggle menu">
        <span className="hamburger-icon"></span>
      </button>
      
      <ul className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
        <li>
          <Link to="/" onClick={() => setIsMenuOpen(false)}>Products</Link>
        </li>
        <li>
          <Link to="/about">About Us</Link>
        </li>
        <li>
          <Link to="/blog">Blog</Link>
        </li>

        {user ? (
          <>
            <li>
              <Link to="/purchases" onClick={() => setIsMenuOpen(false)}>Purchases</Link>
            </li>
            <li>
              <Link to="/profile" onClick={() => setIsMenuOpen(false)}>My Profile</Link>
            </li>
            {user.role === 'admin' && (
              <li>
                <Link to="/admin/dashboard" onClick={() => setIsMenuOpen(false)}>Admin</Link>
              </li>
            )}
            <li>
              <a href="#" onClick={() => { logout(); setIsMenuOpen(false); }}>Logout</a>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
            </li>
            <li>
              <Link to="/signup" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
            </li>
          </>
        )}
      </ul>
      <Link to="/cart" className="cart-icon-link" onClick={() => setIsMenuOpen(false)}>
        <div className="cart-wrapper">
          <img src={CartIconUrl} alt="Cart" className="cart-icon"/>
          {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
        </div>
      </Link>
    </nav>
  );
}
