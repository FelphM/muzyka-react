import React from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../types/Product';
import { useCart } from '../context/CartContext';
import '../styles/product.css';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="ProductCard">
      <div className="ProductCardImageWrapper">
        <img src={product.imageUrl} alt={product.imageAlt} />
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.artist} - {product.name}</h3>
        <p className="product-price">${product.price.toFixed(2)} | {product.format}</p>
        <p className="product-description">{product.description}</p>
      </div>
      <div className="ProductCardActions">
        <Link to={`/product/${product.slug}`} className="details-btn">
          Details
        </Link>
        {product.stock > 0 ? (
          <button className="primaryButton" onClick={() => addToCart(product)}>
            Add To Cart
          </button>
        ) : (
          <button className="primaryButton out-of-stock-btn" disabled>
            Out of Stock
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
