import type { Post } from '../types/BlogPost';

const API_BASE_URL = "https://muzyka-backend.onrender.com/api/v1";

// Helper to get authorization header
function getAuthHeader(): HeadersInit {
  const token = localStorage.getItem('token');
  if (token) {
    return { 
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  }
  return {
    'Content-Type': 'application/json'
  };
}

export const getAllBlogPosts = async (): Promise<Post[]> => {
  const response = await fetch(`${API_BASE_URL}/blogposts`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
};

export const getBlogPostById = async (id: string): Promise<Post | null> => {
  const response = await fetch(`${API_BASE_URL}/blogposts/${id}`);
  if (!response.ok) {
    if (response.status === 404) {
      return null;
    }
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
};

export const createBlogPost = async (newPost: Omit<Post, 'id' | 'card'>): Promise<Post> => {
  const response = await fetch(`${API_BASE_URL}/blogposts`, {
    method: "POST",
    headers: getAuthHeader(),
    body: JSON.stringify(newPost),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
};

export const updateBlogPost = async (id: string, updatedFields: Partial<Post>): Promise<Post | null> => {
  const response = await fetch(`${API_BASE_URL}/blogposts/${id}`, {
    method: "PUT",
    headers: getAuthHeader(),
    body: JSON.stringify(updatedFields),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
};

export const deleteBlogPost = async (id: string): Promise<boolean> => {
  const response = await fetch(`${API_BASE_URL}/blogposts/${id}`, {
    method: "DELETE",
    headers: getAuthHeader(),
  });
  return response.ok;
};

