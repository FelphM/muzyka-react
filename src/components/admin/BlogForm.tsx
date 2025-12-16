import React, { useState, useEffect } from 'react';
import type { Post } from '../../types/BlogPost';

interface BlogFormProps {
  initialPost?: Post; // Optional: for editing an existing post
  onSubmit: (post: Omit<Post, 'id'>, postId?: string) => void;
  onCancel: () => void;
}

const BlogForm: React.FC<BlogFormProps> = ({ initialPost, onSubmit, onCancel }) => {
  // State for the new flat structure
  const [bannerSrc, setBannerSrc] = useState('');
  const [bannerAlt, setBannerAlt] = useState('');
  const [cardTitle, setCardTitle] = useState('');
  const [cardAuthor, setCardAuthor] = useState('');
  const [cardBrief, setCardBrief] = useState('');
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');

  useEffect(() => {
    if (initialPost) {
      setBannerSrc(initialPost.bannerSrc || '');
      setBannerAlt(initialPost.bannerAlt || '');
      setCardTitle(initialPost.cardTitle || '');
      setCardAuthor(initialPost.cardAuthor || '');
      setCardBrief(initialPost.cardBrief || '');
      setPostTitle(initialPost.postTitle || '');
      setPostContent(initialPost.postContent || '');
    }
  }, [initialPost]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Create the flat post object for submission
    const newPost: Omit<Post, 'id'> = {
      bannerSrc,
      bannerAlt,
      cardTitle,
      cardAuthor,
      cardBrief,
      postTitle,
      postContent,
      cardDate: new Date().toISOString().split('T')[0], // Add current date in YYYY-MM-DD format
    };
    onSubmit(newPost, initialPost?.id);
  };

  return (
    <form onSubmit={handleSubmit} className="blog-form">
      <h3>{initialPost ? 'Edit Blog Post' : 'Create New Blog Post'}</h3>
      <div className="form-group">
        <label htmlFor="bannerSrc">Banner Image URL:</label>
        <input
          type="text"
          id="bannerSrc"
          value={bannerSrc}
          onChange={(e) => setBannerSrc(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="bannerAlt">Banner Alt Text:</label>
        <input
          type="text"
          id="bannerAlt"
          value={bannerAlt}
          onChange={(e) => setBannerAlt(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="cardTitle">Card Title:</label>
        <input
          type="text"
          id="cardTitle"
          value={cardTitle}
          onChange={(e) => setCardTitle(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="cardAuthor">Author:</label>
        <input
          type="text"
          id="cardAuthor"
          value={cardAuthor}
          onChange={(e) => setCardAuthor(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="cardBrief">Brief Description:</label>
        <textarea
          id="cardBrief"
          value={cardBrief}
          onChange={(e) => setCardBrief(e.target.value)}
          rows={3}
          required
        ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="postContent">Post Content:</label>
        <textarea
          id="postContent"
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          rows={10}
          required
        ></textarea>
      </div>
      <div className="form-actions">
        <button type="submit">{initialPost ? 'Update Post' : 'Create Post'}</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default BlogForm;
