import React, { useState, useEffect } from 'react';
import type { Post } from '../../types/BlogPost'; // Assuming BlogPost is exported as Post type

interface BlogFormProps {
  initialPost?: Post; // Optional: for editing an existing post
  onSubmit: (post: Omit<Post, 'id' | 'cardDate'>, postId?: string) => void;
  onCancel: () => void;
}

const BlogForm: React.FC<BlogFormProps> = ({ initialPost, onSubmit, onCancel }) => {
  const [bannerSrc, setBannerSrc] = useState(initialPost?.banner.src || '');
  const [bannerAlt, setBannerAlt] = useState(initialPost?.banner.alt || '');
  const [cardTitle, setCardTitle] = useState(initialPost?.card.title || '');
  const [cardAuthor, setCardAuthor] = useState(initialPost?.card.author || '');
  const [cardBrief, setCardBrief] = useState(initialPost?.card.brief || '');
  const [postTitle, setPostTitle] = useState(initialPost?.post.title || '');
  const [postContent, setPostContent] = useState(
    initialPost?.post.content ? (initialPost.post.content as string[]).join('\n\n') : ''
  ); // Assuming content is string[] and we join for textarea

  useEffect(() => {
    if (initialPost) {
      setBannerSrc(initialPost.banner.src);
      setBannerAlt(initialPost.banner.alt);
      setCardTitle(initialPost.card.title);
      setCardAuthor(initialPost.card.author);
      setCardBrief(initialPost.card.brief);
      setPostTitle(initialPost.post.title);
      setPostContent((initialPost.post.content as string[]).join('\n\n'));
    }
  }, [initialPost]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPost: Omit<Post, 'id' | 'cardDate'> = {
      banner: { src: bannerSrc, alt: bannerAlt },
      card: {
        title: cardTitle,
        author: cardAuthor,
        // date will be set by backend or logic outside this form
        brief: cardBrief,
      },
      post: {
        title: postTitle,
        content: postContent.split('\n\n') as React.ReactNode[], // Convert back to string[] for now
      },
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
