import React, { useEffect, useState } from 'react';
import type { Category } from "../../types/Category.ts";

interface CategoryFormProps {
  initialData?: Category;
  onSubmit: (category: Category) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

export const CategoryForm: React.FC<CategoryFormProps> = ({ initialData, onSubmit, onCancel, isEditing = false }) => {
  const [name, setName] = useState(initialData?.name || '');
  const [description, setDescription] = useState(initialData?.description || '');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setDescription(initialData.description);
    } else {
      setName('');
      setDescription('');
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const categoryData: Category = {
      id: initialData?.id, // id is included if editing, will be undefined for new categories
      name,
      description,
    };
    onSubmit(categoryData);

    if (!isEditing) {
      // Clear form fields only when adding a new category
      setName('');
      setDescription('');
    }
  };

  return (
    <div className="add-form-container">
      <h2>{isEditing ? 'Edit Category' : 'Add New Category'}</h2>
      <form onSubmit={handleSubmit} className="add-form">
        <div className="form-group">
          <label htmlFor="categoryName">Category Name:</label>
          <input
            type="text"
            id="categoryName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="categoryDescription">Description:</label>
          <textarea
            id="categoryDescription"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-actions">
          <button type="submit" className="primary-button">
            {isEditing ? 'Update Category' : 'Add Category'}
          </button>
          <button type="button" onClick={onCancel} className="secondary-button">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
