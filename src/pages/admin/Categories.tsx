import { useEffect, useState } from 'react';
import { SideBar } from "../../components/SideBar";
import { CategoryForm } from '../../components/admin/AddCategoryForm'; // Renamed from AddCategoryForm
import type { Category } from '../../types/Category.ts';
import { getCategories, addCategory, updateCategory, deleteCategory } from '../../services/db';
import "../../styles/admin.css";

export function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [showCategoryForm, setShowCategoryForm] = useState(false); // Changed from showAddCategoryForm
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  useEffect(() => {
    setCategories(getCategories());
  }, []);

  const handleSubmitCategory = (categoryData: Omit<Category, 'slug' | 'productsCount'>) => {
    if (editingCategory) {
      // Update existing category
      const updated = updateCategory(categoryData as Category); // Cast to Category as it now has an ID
      if (updated) {
        setCategories((prevCategories) =>
          prevCategories.map((c) => (c.id === updated.id ? updated : c))
        );
      }
    } else {
      // Add new category
      const newlyAddedCategory = addCategory(categoryData);
      setCategories((prevCategories) => [...prevCategories, newlyAddedCategory]);
    }
    setShowCategoryForm(false);
    setEditingCategory(null);
  };

  const handleCancelForm = () => {
    setShowCategoryForm(false);
    setEditingCategory(null);
  };

  const handleEditClick = (category: Category) => {
    setEditingCategory(category);
    setShowCategoryForm(true);
  };

  const handleDeleteCategory = (categoryId: string) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      deleteCategory(categoryId);
      setCategories((prevCategories) => prevCategories.filter((c) => c.id !== categoryId));
    }
  };

  return (
    <div className="admin-container">
      <SideBar />
      <main className="admin-content">
        <div className="admin-header">
          <h1>Categories Management</h1>
          <div className="admin-actions">
            <button
              className="primary-button"
              onClick={() => {
                setShowCategoryForm(true);
                setEditingCategory(null); // Ensure no category is being edited when adding new
              }}
            >
              <i className="fas fa-plus"></i> Add New Category
            </button>
          </div>
        </div>

        {showCategoryForm && (
          <CategoryForm
            initialData={editingCategory || undefined}
            onSubmit={handleSubmitCategory}
            onCancel={handleCancelForm}
            isEditing={!!editingCategory}
          />
        )}

        <div className="categories-grid">
          {categories.map((category) => (
            <div key={category.id} className="category-card admin-card">
              <div className="category-header">
                <h2>{category.name}</h2>
                <div className="category-actions">
                  <button className="action-button edit" onClick={() => handleEditClick(category)}>
                    <i className="fas fa-edit"></i>
                  </button>
                  <button
                    className="action-button delete"
                    onClick={() => handleDeleteCategory(category.id)}
                  >
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
              <button className="view-products-button">View Products</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}