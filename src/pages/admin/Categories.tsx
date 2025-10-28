import { useState } from 'react';
import { SideBar } from "../../components/SideBar";
import "../../styles/admin.css";

interface Category {
  id: string;
  name: string;
  description: string;
  productsCount: number;
  slug: string;
}

export function CategoriesPage() {
  const [categories] = useState<Category[]>([
    {
      id: "1",
      name: "Jazz",
      description: "Jazz music collections and albums",
      productsCount: 45,
      slug: "jazz"
    },
    {
      id: "2",
      name: "Classical",
      description: "Classical music and orchestral pieces",
      productsCount: 32,
      slug: "classical"
    }
  ]);

  return (
    <div className="admin-container">
      <SideBar />
      <main className="admin-content">
        <div className="admin-header">
          <h1>Categories Management</h1>
          <div className="admin-actions">
            <button className="primary-button">
              <i className="fas fa-plus"></i> Add New Category
            </button>
          </div>
        </div>

        <div className="categories-grid">
          {categories.map(category => (
            <div key={category.id} className="category-card admin-card">
              <div className="category-header">
                <h2>{category.name}</h2>
                <div className="category-actions">
                  <button className="action-button edit">
                    <i className="fas fa-edit"></i>
                  </button>
                  <button className="action-button delete">
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
              <p className="category-description">{category.description}</p>
              <div className="category-stats">
                <span className="products-count">
                  <i className="fas fa-compact-disc"></i>
                  {category.productsCount} Products
                </span>
              </div>
              <button className="view-products-button">
                View Products
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}