import { useState, useEffect } from "react";
import type { Product } from '../types/Product';
import { useParams } from "react-router-dom";
import { FloatingUp } from "../components/FloatingUp";
import { Breadcrumb } from "../components/Breadcrumb";
import "../styles/details.css";
import { getProductBySlug } from "../services/api";
import { useCart } from "../context/CartContext";

export function ProductDetails() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    if (slug) {
      getProductBySlug(slug)
        .then(setProduct)
        .catch(error => {
          console.error("Failed to fetch product", error);
          setProduct(null);
        });
    }
  }, [slug]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <FloatingUp />
      <Breadcrumb 
        items={[
          { label: "Productos", path: "/" },
          { label: `${product.artist} - ${product.name}`, path: `/product/${product.slug}` }
        ]}
      />
      <article className="productDetails">
        <div className="productImageWrapper">
          <img src={product.imageUrl} alt={product.imageAlt} />
        </div>
        <div className="productInfo">
          <h1>{product.artist} - {product.name}</h1>
          <div className="productMeta">
            <p className="price">${product.price}</p>
            <p className="format">{product.format}</p>
            <p className="stock">Stock: {product.stock > 0 ? product.stock : 'Out of Stock'}</p>
          </div>
          <p className="description">{product.description}</p>

          <button 
            className="primaryButton" 
            onClick={() => addToCart(product)}
            disabled={product.stock === 0}
          >
            {product.stock > 0 ? 'Add To Cart' : 'Out of Stock'}
          </button>
        </div>
      </article>
    </>
  );
}
