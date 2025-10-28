import { Link } from "react-router-dom";
import "../styles/product.css";
import type { Product } from "../types/Product";

export function ProductCard({ product }: { product: Product }) {
  return (
    <>
      <article className="ProductCard">
        <figure>
          <div className="ProductCardImageWrapper">
            <img src={product.image.src} alt={product.image.alt} />
          </div>
          <figcaption>
            <a href={product.link} target="_blank" rel="noopener noreferrer">
              Learn more about this release
            </a>
          </figcaption>
        </figure>
        <div className="ProductCardActions">
          <Link to={`/product/${product.slug}`}>
            <button>Details</button>
          </Link>
          <button>Add To Cart</button>
        </div>
        <h2>{product.artist} - {product.name}</h2>
        <h3>
          ${product.price} | {product.format}
        </h3>
        <p>{product.description}</p>
      </article>
    </>
  );
}
