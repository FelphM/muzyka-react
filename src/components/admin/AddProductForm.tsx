import React, { useEffect, useState } from 'react';
import type { Product } from '../../types/Product';
import type { Category } from '../../types/Category';
import { getAllCategories } from '../../services/api';

interface ProductFormProps {
  initialData?: Product;
  onSubmit: (product: Omit<Product, 'slug' | 'id'> & { id?: number }) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

export const ProductForm: React.FC<ProductFormProps> = ({ initialData, onSubmit, onCancel, isEditing = false }) => {
  const [name, setName] = useState(initialData?.name || '');
  const [artist, setArtist] = useState(initialData?.artist || '');
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || '');
  const [imageAlt, setImageAlt] = useState(initialData?.imageAlt || '');
  const [price, setPrice] = useState<number>(initialData?.price || 0);
  const [format, setFormat] = useState(initialData?.format || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [categoryId, setCategoryId] = useState<number | ''>(initialData?.category.id || '');
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await getAllCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setArtist(initialData.artist);
      setImageUrl(initialData.imageUrl);
      setImageAlt(initialData.imageAlt);
      setPrice(initialData.price);
      setFormat(initialData.format);
      setDescription(initialData.description);
      setCategoryId(initialData.category.id);
    } else {
      setName('');
      setArtist('');
      setImageUrl('');
      setImageAlt('');
      setPrice(0);
      setFormat('');
      setDescription('');
      setCategoryId('');
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedCategory = categories.find(c => c.id === categoryId);
    if (!selectedCategory) {
      alert("Please select a valid category.");
      return;
    }
    const productData: Omit<Product, 'slug' | 'id'> & { id?: number } = {
      name,
      artist,
      imageUrl,
      imageAlt,
      price,
      format,
      description,
      category: selectedCategory,
    };
    if (isEditing) {
      productData.id = initialData!.id;
    }
    onSubmit(productData);

    if (!isEditing) {
      // Clear form fields only when adding a new product
      setName('');
      setArtist('');
      setImageUrl('');
      setImageAlt('');
      setPrice(0);
      setFormat('');
      setDescription('');
      setCategoryId('');
    }
  };

  return (
    <div className="add-form-container">
      <h2>{isEditing ? 'Edit Product' : 'Add New Product'}</h2>
      <form onSubmit={handleSubmit} className="add-form">
        <div className="form-group">
          <label htmlFor="name">Product Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="artist">Artist:</label>
          <input
            type="text"
            id="artist"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            value={categoryId}
            onChange={(e) => setCategoryId(Number(e.target.value))}
            required
          >
            <option value="" disabled>Select a category</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="imageSrc">Image URL:</label>
          <input
            type="text"
            id="imageSrc"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="imageAlt">Image Alt Text:</label>
          <input
            type="text"
            id="imageAlt"
            value={imageAlt}
            onChange={(e) => setImageAlt(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            required
            step="0.01"
          />
        </div>
        <div className="form-group">
          <label htmlFor="format">Format:</label>
          <input
            type="text"
            id="format"
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-actions">
          <button type="submit" className="primary-button">
            {isEditing ? 'Update Product' : 'Add Product'}
          </button>
          <button type="button" onClick={onCancel} className="secondary-button">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};