import React, { useEffect, useState } from 'react';
import type { Product } from '../../types/Product';

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

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setArtist(initialData.artist);
      setImageUrl(initialData.imageUrl);
      setImageAlt(initialData.imageAlt);
      setPrice(initialData.price);
      setFormat(initialData.format);
      setDescription(initialData.description);
    } else {
      setName('');
      setArtist('');
      setImageUrl('');
      setImageAlt('');
      setPrice(0);
      setFormat('');
      setDescription('');
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const productData: Omit<Product, 'slug' | 'id'> & { id?: number } = {
      name,
      artist,
      imageUrl,
      imageAlt,
      price,
      format,
      description,
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