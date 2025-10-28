import { useState } from 'react';
import { SideBar } from "../../components/SideBar";
import type { Product } from "../../types/Product";
import "../../styles/admin.css";

export function ProductsPage() {
  const [products] = useState<Product[]>([
    {
      id: "1",
      name: "Jazz Collection Vol. 1",
      artist: "Various Artists",
      image: {
        src: "/images/jazz-collection.jpg",
        alt: "Jazz Collection Volume 1"
      },
      price: 29.99,
      format: "Compact Disc",
      description: "A compilation of the best jazz tracks",
      link: "/products/jazz-collection",
      slug: "jazz-collection"
    }
  ]);

  return (
    <div className="admin-container">
      <SideBar />
      <main className="admin-content">
        <div className="admin-header">
          <h1>Products Management</h1>
          <div className="admin-actions">
            <button className="primary-button">
              <i className="fas fa-plus"></i> Add New Product
            </button>
          </div>
        </div>

        <div className="table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Artist</th>
                <th>Format</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td>
                    <img 
                      src={product.image.src} 
                      alt={product.image.alt} 
                      className="product-thumbnail"
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>{product.artist}</td>
                  <td>{product.format}</td>
                  <td>${product.price.toFixed(2)}</td>
                  <td>
                    <div className="table-actions">
                      <button className="action-button view">
                        <i className="fas fa-eye"></i>
                      </button>
                      <button className="action-button edit">
                        <i className="fas fa-edit"></i>
                      </button>
                      <button className="action-button delete">
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}