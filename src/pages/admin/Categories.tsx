import { useEffect, useState } from 'react';
import { CategoryForm } from '../../components/admin/AddCategoryForm';
import type { Category } from '../../types/Category';
import { getAllCategories, createCategory, updateCategory, deleteCategory } from '../../services/api';
import "../../styles/admin.css";

export function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data: Category[] = await getAllCategories();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleSubmitCategory = async (categoryData: Category) => {
    try {
      if (editingCategory) {
        // Update existing category
        const updated = await updateCategory(editingCategory.id as number, categoryData);
        setCategories((prevCategories) =>
          prevCategories.map((c) => (c.id === updated.id ? updated : c))
        );
      } else {
        // Add new category
        const newlyAddedCategory = await createCategory(categoryData);
        setCategories((prevCategories) => [...prevCategories, newlyAddedCategory]);
      }
      setShowCategoryForm(false);
      setEditingCategory(null);
    } catch (error) {
      console.error("Error submitting category:", error);
    }
  };

  const handleCancelForm = () => {
    setShowCategoryForm(false);
    setEditingCategory(null);
  };

  const handleEditClick = (category: Category) => {
    setEditingCategory(category);
    setShowCategoryForm(true);
  };

  const handleDeleteCategory = async (categoryId: number) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await deleteCategory(categoryId);
        setCategories((prevCategories) => prevCategories.filter((c) => c.id !== categoryId));
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    }
  };

  return (
    <>
          <div className="admin-header">
            <h1>Categories Management</h1>
            <div className="admin-actions">
              <button
                className="primary-button"
                onClick={() => {
                  setShowCategoryForm(true);
                  setEditingCategory(null);
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
                      onClick={() => handleDeleteCategory(category.id as number)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
                <p className="category-description">{category.description}</p>
                {/* Removed productsCount display as it's not in the backend entity */}
                {/* <div className="category-stats">
                  <span className="products-count">
                    <i className="fas fa-compact-disc"></i>
                    {category.productsCount} Products
                  </span>
                </div> */}
                {/* <button className="view-products-button">View Products</button> */}
              </div>
            ))}
          </div>
        </>
  );
}