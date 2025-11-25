import { Link } from "react-router-dom";
import "../styles/header.css";
import { useState, useEffect } from "react";

interface HeaderOptions {
  Logged?: boolean;
  Admin?: boolean;
}

export function Header({ Logged = false, Admin = false }: HeaderOptions) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
          <Link to="/cart">Cart</Link>
        </li>
        <li>
          <Link to="/blog">Blog</Link>
        </li>

        {Admin && (
          <li>
            <Link to="/admin">Admin</Link>
          </li>
        )}

        {Logged ? (
          <>
            <li>
              <Link to="/purchases">Purchases</Link>
            </li>
            <li>
              <Link to="/profile">My Profile</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
