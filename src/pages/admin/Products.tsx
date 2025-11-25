import { useEffect, useState } from 'react';
import { ProductForm } from "../../components/admin/AddProductForm";
import type { Product } from "../../types/Product";
import { getProducts, addProduct, updateProduct, deleteProduct } from '../../services/db';
import "../../styles/admin.css";

export function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  const handleSubmitProduct = (productData: Omit<Product, 'slug'>) => {
    if (editingProduct) {
      // Update existing product
      const updated = updateProduct(productData as Product);
      if (updated) {
        setProducts((prevProducts) =>
          prevProducts.map((p) => (p.id === updated.id ? updated : p))
        );
      }
    } else {
      // Add new product
      const newlyAddedProduct = addProduct(productData);
      setProducts((prevProducts) => [...prevProducts, newlyAddedProduct]);
    }
    setShowProductForm(false);
    setEditingProduct(null);
  };

  const handleCancelForm = () => {
    setShowProductForm(false);
    setEditingProduct(null);
  };

  const handleEditClick = (product: Product) => {
    setEditingProduct(product);
    setShowProductForm(true);
  };

  const handleDeleteProduct = (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(productId);
      setProducts((prevProducts) => prevProducts.filter((p) => p.id !== productId));
    }
  };

  return (
    <>
          <div className="admin-header">
            <h1>Products Management</h1>
            <div className="admin-actions">
              <button
                className="primary-button"
                onClick={() => {
                  setShowProductForm(true);
                  setEditingProduct(null);
                }}
              >
                <i className="fas fa-plus"></i> Add New Product
              </button>
            </div>
          </div>

          {showProductForm && (
            <ProductForm
              initialData={editingProduct || undefined}
              onSubmit={handleSubmitProduct}
              onCancel={handleCancelForm}
              isEditing={!!editingProduct}
            />
          )}

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
                {products.map((product) => (
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
                        <button className="action-button edit" onClick={() => handleEditClick(product)}>
                          <i className="fas fa-edit"></i>
                        </button>
                        <button
                          className="action-button delete"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
  );
}