import { useState, useEffect, useCallback } from "react";
import { FloatingUp } from "../components/FloatingUp";
import { SearchBar } from "../components/SearchBar";
import { PostList } from "../components/sets/PostList";
import BlogForm from "../components/admin/BlogForm"; // Import BlogForm
import { useAuth } from '../context/AuthContext'; // Import useAuth
import { getAllBlogPosts, createBlogPost, updateBlogPost, deleteBlogPost } from '../services/blogApi'; // Import blog API
import type { Post } from '../types/BlogPost';
import "../styles/blog.css";

export function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedPosts = await getAllBlogPosts();
      // Ensure date objects are correctly parsed if coming as strings from API
      const parsedPosts = fetchedPosts.map(post => ({
        ...post,
        card: {
          ...post.card,
          date: new Date(post.card.date)
        }
      }));
      setPosts(parsedPosts);
    } catch (err) {
      console.error("Failed to fetch posts:", err);
      setError("Failed to load blog posts.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleAddClick = () => {
    setEditingPost(null);
    setShowForm(true);
  };

  const handleEdit = (post: Post) => {
    setEditingPost(post);
    setShowForm(true);
  };

  const handleDelete = async (postId: string) => {
    if (!window.confirm("Are you sure you want to delete this post?")) {
      return;
    }
    try {
      await deleteBlogPost(postId);
      fetchPosts(); // Refresh list
    } catch (err) {
      console.error("Failed to delete post:", err);
      setError("Failed to delete post.");
    }
  };

  const handleSubmitForm = async (postData: Omit<Post, 'id' | 'cardDate'>, postId?: string) => {
    try {
      if (postId) {
        await updateBlogPost(postId, postData);
      } else {
        await createBlogPost(postData);
      }
      setShowForm(false);
      setEditingPost(null);
      fetchPosts(); // Refresh list
    } catch (err) {
      console.error("Failed to save post:", err);
      setError("Failed to save post.");
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingPost(null);
  };

  if (loading) {
    return <div className="centerContent">Loading posts...</div>;
  }

  if (error) {
    return <div className="centerContent error-message">{error}</div>;
  }

  return (
    <>
      <FloatingUp />
      <SearchBar onSearch={setSearchTerm} placeholder="Search by title, author, or brief..." />
      <div className="centerContent blog-page-container">
        {isAdmin && !showForm && (
          <button onClick={handleAddClick} className="add-post-button">
            Add New Blog Post
          </button>
        )}

        {showForm && (
          <BlogForm
            initialPost={editingPost || undefined}
            onSubmit={handleSubmitForm}
            onCancel={handleCancelForm}
          />
        )}

        {!showForm && (
          <PostList
              searchTerm={searchTerm}
              posts={posts}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
        )}
      </div>
    </>
  );
}

