import { useParams } from "react-router-dom";
import { FloatingUp } from "../components/FloatingUp";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Breadcrumb } from "../components/Breadcrumb";
import "../styles/details.css";
import type { Product } from "../types/Product";
import { getProducts } from "../services/db";

export function ProductDetails() {
  const { slug } = useParams();
  const products = getProducts();
  const product = products.find((p: Product) => p.slug === slug);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <FloatingUp />
      <Header />
      <Breadcrumb 
        items={[
          { label: "Productos", path: "/" },
          { label: `${product.artist} - ${product.name}`, path: `/product/${product.slug}` }
        ]}
      />
      <article className="productDetails">
        <div className="productImageWrapper">
          <img src={product.image.src} alt={product.image.alt} />
        </div>
        <div className="productInfo">
          <h1>{product.artist} - {product.name}</h1>
          <div className="productMeta">
            <p className="price">${product.price}</p>
            <p className="format">{product.format}</p>
          </div>
          <p className="description">{product.description}</p>
          <a href={product.link} target="_blank" rel="noopener noreferrer" className="learnMore">
            Learn more about this release
          </a>
          <button className="addToCart">Add To Cart</button>
        </div>
      </article>
      <Footer />
    </>
  );
}
