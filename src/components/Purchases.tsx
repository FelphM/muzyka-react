import { useState } from "react";
import type { Product } from "../types/Product";
import "../styles/purchases.css";
import { Header } from "./Header";
import { Footer } from "./Footer";

interface PurchaseItem extends Product {
  purchaseDate: string;
  status: "Delivered" | "In Transit" | "Processing";
}

export function PurchasesPage() {
  const [purchases] = useState<PurchaseItem[]>([
    {
      id: "1",
      artist: "Various Artists",
      name: "Best Guitar Collection",
      image: {
        src: "https://m.media-amazon.com/images/I/81MTidc4APL._UF894,1000_QL80_.jpg",
        alt: "Best Guitar Collection Album",
      },
      price: 15.99,
      format: "Compact Disc",
      description: "A collection of the best guitar performances",
      link: "/products/best-guitar-collection",
      slug: "best-guitar-collection",
      purchaseDate: "2025-10-25",
      status: "Delivered",
    },
    {
      id: "2",
      artist: "Jazz Masters",
      name: "Bass Classics",
      image: {
        src: "https://i.scdn.co/image/ab67616d0000b2732de387a6e4905651da9d93ac",
        alt: "Bass Classics Album",
      },
      price: 599.99,
      format: "Long Play",
      description: "Classic bass performances from jazz legends",
      link: "/products/bass-classics",
      slug: "bass-classics",
      purchaseDate: "2025-10-20",
      status: "In Transit",
    },
  ]);

  return (
    <>
      <Header></Header>
      <div className="fullContent">
        <div className="purchases-list">
        <h2>My Purchases</h2>

          {purchases.map((product) => (
            <div key={product.id} className="purchase-item">
              <div className="purchase-details">
                <img
                  src={product.image.src}
                  alt={product.image.alt}
                  className="purchase-image"
                />
                <div className="purchase-info">
                  <h3>{product.name}</h3>
                  <p>Artist: {product.artist}</p>
                  <p>Format: {product.format}</p>
                  <p>Price: ${product.price}</p>
                  <p>Purchase Date: {product.purchaseDate}</p>
                  <p>Status: {product.status}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}
